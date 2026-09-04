import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import { RegistryError, RegistrySourceFileError } from "./errors.js";
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
import { getEnvProxy } from "../get-env-proxy.js";
import type { GitHubItemAddress, GitHubRegistrySource } from "./address.js";
import type { RegistrySourceReader } from "./source.js";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com";
const GITHUB_VALIDATION_CONCURRENCY = 8;

export type GitHubRegistryValidationDiagnostic = {
	registryFile: string;
	itemName?: string;
	itemIndex?: number;
	filePath?: string;
	includePath?: string;
	message: string;
	suggestion?: string;
};

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

export async function validateGitHubRegistrySource(
	source: GitHubRegistrySource,
	options: GitHubSourceOptions = {}
) {
	const sourceLabel = formatGitHubSource(source);
	const registryFile = `${sourceLabel}/registry.json`;
	const registryFiles = new Set<string>();
	const sourceCache = options.sourceCache ?? new Map<string, Promise<string>>();
	const sourceReader = createGitHubRegistrySourceReader(source, { ...options, sourceCache });
	const trackingReader: RegistrySourceReader = {
		async readText(filePath) {
			if (filePath.endsWith("registry.json")) {
				registryFiles.add(`${sourceLabel}/${filePath}`);
			}
			return sourceReader.readText(filePath);
		},
	};

	try {
		const registry = await loadRegistryCatalogFromSource(trackingReader);
		const itemDiagnostics = await mapWithConcurrency(
			registry.items,
			GITHUB_VALIDATION_CONCURRENCY,
			async (item, itemIndex) => {
				try {
					await loadRegistryItemFromSource(item.name, trackingReader);
					return null;
				} catch (error) {
					return createGitHubValidationDiagnostic(error, {
						defaultRegistryFile: registryFile,
						itemName: item.name,
						itemIndex,
						sourceLabel,
					});
				}
			}
		);
		const diagnostics = itemDiagnostics.filter(
			(diagnostic): diagnostic is GitHubRegistryValidationDiagnostic => diagnostic !== null
		);

		return {
			valid: diagnostics.length === 0,
			cwd: sourceLabel,
			registryFiles: registryFiles.size,
			registryFilePaths: Array.from(registryFiles),
			items: registry.items.length,
			diagnostics,
		};
	} catch (error) {
		return {
			valid: false,
			cwd: sourceLabel,
			registryFiles: registryFiles.size || 1,
			registryFilePaths: registryFiles.size ? Array.from(registryFiles) : [registryFile],
			items: 0,
			diagnostics: [
				createGitHubValidationDiagnostic(error, {
					defaultRegistryFile: registryFile,
					sourceLabel,
				}),
			],
		};
	}
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
					!(err instanceof RegistrySourceFileError) ||
					err.context?.statusCode !== 404 ||
					authState.anonymousLock
				) {
					throw err;
				}
				let mode: GitHubAuthMode;
				try {
					mode = await selectGitHubAuthMode(authState, address, err);
				} catch {
					throw err;
				}
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
			: new RegistrySourceFileError(filePath, undefined, {
					message: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}.`,
					context: {
						reason: "github-source-file",
						source: formatGitHubSource(address),
						filePath,
					},
				});
	}
	const guidance = getGitHubTransportFailureGuidance(value, mode);
	if (value.kind === "http" && value.statusCode === 404) {
		if (filePath === "registry.json" && state.originalError instanceof Error) {
			return state.originalError;
		}
		return new RegistrySourceFileError(filePath, undefined, {
			message: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}.`,
			context: {
				reason: "github-source-file",
				statusCode: 404,
				source: formatGitHubSource(address),
				filePath,
			},
			suggestion: "Check that the file path exists in the GitHub repository.",
		});
	}
	if (
		(value.kind === "enoent" || value.kind === "unauthenticated") &&
		filePath === "registry.json" &&
		state.originalError instanceof Error
	) {
		return new RegistrySourceFileError(filePath, undefined, {
			message: state.originalError.message,
			context: {
				reason: "github-source-file",
				source: formatGitHubSource(address),
				filePath,
			},
			suggestion: guidance.suggestion,
		});
	}
	return new RegistrySourceFileError(filePath, undefined, {
		message: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. ${guidance.detail}`,
		context: {
			reason: "github-source-file",
			...(value.statusCode ? { statusCode: value.statusCode } : {}),
			source: formatGitHubSource(address),
			filePath,
		},
		suggestion: guidance.suggestion,
	});
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
	} catch (cause) {
		throw new RegistrySourceFileError(filePath, cause, {
			message: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}.`,
			context: {
				reason: "github-source-file",
				url,
				source: formatGitHubSource(address),
				filePath,
			},
			suggestion:
				"GitHub ref resolution succeeded, but the CLI could not fetch from raw.githubusercontent.com. Check that raw.githubusercontent.com is accessible from this network.",
		});
	}
	if (!response.ok) {
		throw new RegistrySourceFileError(filePath, undefined, {
			message: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}.`,
			context: {
				reason: "github-source-file",
				url,
				statusCode: response.status,
				source: formatGitHubSource(address),
				filePath,
			},
			suggestion:
				filePath === "registry.json"
					? 'The GitHub repository and ref were resolved, but raw.githubusercontent.com did not return a root registry.json file. Check that the public repository has registry.json at its root and that raw.githubusercontent.com is accessible from this network. If this is a private repository, run "gh auth login" or set GH_TOKEN to a token with read access.'
					: "Check that the file path exists in the public GitHub repository.",
		});
	}
	try {
		return await readGitHubResponseTextWithLimit(response);
	} catch (value) {
		if (value instanceof GitHubTransportError) {
			const guidance = getGitHubTransportFailureGuidance(value, "token");
			throw new RegistrySourceFileError(filePath, undefined, {
				message: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. ${guidance.detail}`,
				context: {
					reason: "github-source-file",
					source: formatGitHubSource(address),
					filePath,
				},
				suggestion: guidance.suggestion,
			});
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

async function mapWithConcurrency<T, TResult>(
	items: T[],
	concurrency: number,
	mapper: (item: T, index: number) => Promise<TResult>
) {
	const results = new Array<TResult>(items.length);
	let nextIndex = 0;
	const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
		while (nextIndex < items.length) {
			const itemIndex = nextIndex++;
			results[itemIndex] = await mapper(items[itemIndex]!, itemIndex);
		}
	});
	await Promise.all(workers);
	return results;
}

function createGitHubValidationDiagnostic(
	error: unknown,
	options: {
		defaultRegistryFile: string;
		itemName?: string;
		itemIndex?: number;
		sourceLabel: string;
	}
): GitHubRegistryValidationDiagnostic {
	if (error instanceof RegistryError) {
		return {
			registryFile:
				typeof error.context?.registryFile === "string"
					? `${options.sourceLabel}/${error.context.registryFile}`
					: options.defaultRegistryFile,
			itemName: options.itemName,
			itemIndex:
				typeof error.context?.itemIndex === "number" ? error.context.itemIndex : options.itemIndex,
			filePath:
				typeof error.context?.itemFilePath === "string"
					? error.context.itemFilePath
					: typeof error.context?.filePath === "string"
						? error.context.filePath
						: undefined,
			includePath:
				typeof error.context?.includePath === "string" ? error.context.includePath : undefined,
			message: error.message,
			suggestion: error.suggestion,
		};
	}
	return {
		registryFile: options.defaultRegistryFile,
		itemName: options.itemName,
		itemIndex: options.itemIndex,
		message: error instanceof Error ? error.message : "Unknown error.",
	};
}
