import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import { error } from "../errors.js";
import { getEnvProxy } from "../get-env-proxy.js";
import type { GitHubItemAddress, GitHubRegistrySource } from "./address.js";
import { resolveGitHubRef } from "./github-ref.js";
import { loadRegistryCatalogFromSource, loadRegistryItemFromSource } from "./source.js";
import type { RegistrySourceReader } from "./source.js";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com";

export type GitHubSourceOptions = {
	useCache?: boolean;
	sourceCache?: Map<string, Promise<string>>;
};

export async function fetchGitHubRegistryItem(
	address: GitHubItemAddress,
	options: GitHubSourceOptions = {}
) {
	options = { ...options, sourceCache: options.sourceCache ?? new Map() };
	const reader = createGitHubRegistrySourceReader(address, options);
	return loadRegistryItemFromSource(address.item, reader);
}

export async function fetchGitHubRegistryCatalog(
	source: GitHubRegistrySource,
	options: GitHubSourceOptions = {}
) {
	options = { ...options, sourceCache: options.sourceCache ?? new Map() };
	const reader = createGitHubRegistrySourceReader(source, options);
	return loadRegistryCatalogFromSource(reader);
}

function createGitHubRegistrySourceReader(
	address: GitHubItemAddress | GitHubRegistrySource,
	options: GitHubSourceOptions
): RegistrySourceReader {
	const shaPromise = resolveGitHubRef(address, { cache: options.sourceCache });

	return {
		async readText(filePath) {
			const sha = await shaPromise;
			const url = buildGitHubRawUrl(address, sha, filePath);

			if (options.useCache !== false && options.sourceCache?.has(url)) {
				return options.sourceCache.get(url)!;
			}

			const promise = fetchGitHubSourceFile(url, filePath, address);
			if (options.useCache !== false) options.sourceCache?.set(url, promise);
			return promise;
		},
	};
}

async function fetchGitHubSourceFile(
	url: string,
	filePath: string,
	address: GitHubItemAddress | GitHubRegistrySource
) {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};
	const response = await fetch(url, {
		...proxy,
		headers: {
			"Accept-Encoding": "identity",
			"User-Agent": "shadcn-svelte",
		},
	});

	if (!response.ok) {
		throw error(
			filePath === "registry.json"
				? `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. Check that the public repository has registry.json at its root.`
				: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(address)}. Check that the file path exists in the public GitHub repository.`
		);
	}

	return response.text();
}

function buildGitHubRawUrl(
	address: GitHubItemAddress | GitHubRegistrySource,
	resolvedSha: string,
	filePath: string
) {
	const file = filePath
		.split("/")
		.map((part) => encodeURIComponent(part))
		.join("/");

	return `${GITHUB_RAW_URL}/${address.owner}/${address.repo}/${resolvedSha}/${file}`;
}

function formatGitHubSource(address: GitHubItemAddress | GitHubRegistrySource) {
	return `${address.owner}/${address.repo}#${address.ref ?? "HEAD"}`;
}
