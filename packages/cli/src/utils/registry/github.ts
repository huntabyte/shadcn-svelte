import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import { error } from "../errors.js";
import { getEnvProxy } from "../get-env-proxy.js";
import type { GitHubItemAddress, GitHubRegistrySource } from "./address.js";
import {
	getGitHubAuthState,
	selectGitHubAuthMode,
	type GitHubSourceAuthState,
} from "./github-auth.js";
import {
	fetchGitHubFileViaGh,
	fetchGitHubFileViaRest,
	getEnvGitHubToken,
	getGitHubTransportFailureGuidance,
	GitHubTransportError,
	readGitHubResponseTextWithLimit,
	type GitHubAuthMode,
	type GitHubSource,
} from "./github-cli.js";
import { resolveGitHubRef } from "./github-ref.js";
import { loadRegistryCatalogFromSource, loadRegistryItemFromSource } from "./source.js";
import type { RegistrySourceReader } from "./source.js";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com";

class AnonymousGitHubError extends Error {
	readonly statusCode?: number;

	constructor(message: string, statusCode?: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export type GitHubSourceOptions = {
	useCache?: boolean;
	sourceCache?: Map<string, Promise<string>>;
};

export async function fetchGitHubRegistryItem(
	address: GitHubItemAddress,
	options: GitHubSourceOptions = {}
) {
	options = { ...options, sourceCache: options.sourceCache ?? new Map() };
	return loadRegistryItemFromSource(
		address.item,
		createGitHubRegistrySourceReader(address, options)
	);
}

export async function fetchGitHubRegistryCatalog(
	source: GitHubRegistrySource,
	options: GitHubSourceOptions = {}
) {
	options = { ...options, sourceCache: options.sourceCache ?? new Map() };
	return loadRegistryCatalogFromSource(createGitHubRegistrySourceReader(source, options));
}

function createGitHubRegistrySourceReader(
	address: GitHubSource,
	options: GitHubSourceOptions
): RegistrySourceReader {
	const sourceCache = options.sourceCache ?? new Map<string, Promise<string>>();
	const authState = getGitHubAuthState(sourceCache, address);
	const shaPromise = resolveGitHubRef(address, { cache: sourceCache, authAnchor: sourceCache });

	const readWithCache = (key: string, read: () => Promise<string>) => {
		if (options.useCache !== false && sourceCache.has(key)) return sourceCache.get(key)!;
		const promise = read();
		if (options.useCache !== false) {
			sourceCache.set(key, promise);
			promise.catch(() => {
				if (sourceCache.get(key) === promise) sourceCache.delete(key);
			});
		}
		return promise;
	};

	const readAuthenticated = (sha: string, filePath: string, mode: GitHubAuthMode) => {
		const key = `${mode}:${address.owner}/${address.repo}/${sha}/${filePath}`;
		if (mode === "token") {
			return readWithCache(key, async () => {
				const token = getEnvGitHubToken();
				if (!token) throw new GitHubTransportError("unauthenticated");
				return fetchGitHubFileViaRest(address, sha, filePath, token);
			});
		}
		return readWithCache(key, () => fetchGitHubFileViaGh(address, sha, filePath));
	};

	return {
		async readText(filePath) {
			const sha = await shaPromise;
			const isRoot = filePath === "registry.json";
			if (!authState.anonymousLock && authState.decision) {
				const mode = await authState.decision;
				try {
					return await readAuthenticated(sha, filePath, mode);
				} catch (err) {
					throw toGitHubSourceError(err, address, filePath, mode, authState);
				}
			}

			const url = buildGitHubRawUrl(address, sha, filePath);
			try {
				const content = await readWithCache(`anonymous:${url}`, () =>
					fetchGitHubSourceFile(url, filePath, address)
				);
				if (isRoot) authState.anonymousLock = true;
				return content;
			} catch (err) {
				if (
					!isRoot ||
					!(err instanceof AnonymousGitHubError) ||
					err.statusCode !== 404 ||
					authState.anonymousLock
				) {
					throw err;
				}
				const mode = await selectGitHubAuthMode(authState, err);
				try {
					return await readAuthenticated(sha, filePath, mode);
				} catch (authError) {
					throw toGitHubSourceError(authError, address, filePath, mode, authState);
				}
			}
		},
	};
}

function toGitHubSourceError(
	value: unknown,
	address: GitHubSource,
	filePath: string,
	mode: GitHubAuthMode,
	state: GitHubSourceAuthState
) {
	if (!(value instanceof GitHubTransportError)) {
		return value instanceof Error
			? value
			: error(
					`Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}.`
				);
	}
	if (value.kind === "http" && value.statusCode === 404) {
		if (filePath === "registry.json" && state.originalError instanceof Error) {
			return state.originalError;
		}
		return error(
			`Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. Check that the file path exists in the GitHub repository.`
		);
	}
	return error(
		`Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. ${getGitHubTransportFailureGuidance(value, mode)}`
	);
}

async function fetchGitHubSourceFile(url: string, filePath: string, address: GitHubSource) {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};
	let response: Response;
	try {
		response = (await fetch(url, {
			...proxy,
			headers: { "Accept-Encoding": "identity", "User-Agent": "shadcn-svelte" },
		})) as Response;
	} catch {
		throw new AnonymousGitHubError(
			`Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. Check that raw.githubusercontent.com is accessible from this network.`
		);
	}
	if (!response.ok) {
		throw new AnonymousGitHubError(
			filePath === "registry.json"
				? `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. Check that the public repository has registry.json at its root. If this is a private repository, run "gh auth login" or set GH_TOKEN to a token with read access.`
				: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. Check that the file path exists in the public GitHub repository.`,
			response.status
		);
	}
	try {
		return await readGitHubResponseTextWithLimit(response);
	} catch (value) {
		if (value instanceof GitHubTransportError) {
			throw error(
				`Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. ${getGitHubTransportFailureGuidance(value, "token")}`
			);
		}
		throw value;
	}
}

function buildGitHubRawUrl(address: GitHubSource, sha: string, filePath: string) {
	const file = filePath
		.split("/")
		.map((part) => encodeURIComponent(part))
		.join("/");
	return `${GITHUB_RAW_URL}/${address.owner}/${address.repo}/${sha}/${file}`;
}

function formatGitHubSource(address: GitHubSource) {
	return `${address.owner}/${address.repo}#${address.ref ?? "HEAD"}`;
}
