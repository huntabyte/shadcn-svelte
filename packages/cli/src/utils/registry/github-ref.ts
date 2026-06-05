import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { error } from "../errors.js";
import type { GitHubItemAddress, GitHubRegistrySource } from "./address.js";

const execFileAsync = promisify(execFile);
const GITHUB_URL = "https://github.com";
const GITHUB_SHA_PATTERN = /^[a-fA-F0-9]{40}$/;
const GITHUB_REF_RESOLUTION_TIMEOUT = 15_000;

type GitHubSource = GitHubItemAddress | GitHubRegistrySource;

export async function resolveGitHubRef(
	address: GitHubSource,
	options: { cache?: Map<string, Promise<string>> } = {}
) {
	const ref = address.ref ?? "HEAD";

	if (GITHUB_SHA_PATTERN.test(ref)) return ref.toLowerCase();

	const cacheKey = `${address.owner}/${address.repo}#${ref}`;
	if (options.cache?.has(cacheKey)) return options.cache.get(cacheKey)!;

	const promise = resolveGitHubRefUncached(address, ref).catch((err) => {
		options.cache?.delete(cacheKey);
		throw err;
	});
	options.cache?.set(cacheKey, promise);
	return promise;
}

async function resolveGitHubRefUncached(address: GitHubSource, ref: string) {
	const repoUrl = `${GITHUB_URL}/${address.owner}/${address.repo}.git`;
	const candidates = getGitHubRefCandidates(ref);

	let stdout: string;
	try {
		const result = await execFileAsync(
			"git",
			["ls-remote", "--symref", "--", repoUrl, ...candidates],
			{
				env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
				timeout: GITHUB_REF_RESOLUTION_TIMEOUT,
			}
		);
		stdout = result.stdout;
	} catch (e) {
		throw error(
			`Failed to resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}. Check that the public GitHub repository exists and the ref is accessible.`,
			e
		);
	}

	const refs = parseGitLsRemote(stdout);
	for (const candidate of getPreferredGitHubRefNames(ref)) {
		const sha = refs.get(candidate);
		if (sha) return sha;
	}

	throw error(
		`Could not resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}. Use an existing branch, tag, or full commit SHA.`
	);
}

export function getGitHubRefCandidates(ref: string) {
	return Array.from(new Set(getPreferredGitHubRefNames(ref)));
}

export function getPreferredGitHubRefNames(ref: string) {
	if (ref === "HEAD") return ["HEAD"];
	if (ref.startsWith("refs/tags/")) return [`${ref}^{}`, ref];
	if (ref.startsWith("refs/")) return [ref];
	return [`refs/heads/${ref}`, `refs/tags/${ref}^{}`, `refs/tags/${ref}`, ref];
}

export function parseGitLsRemote(stdout: string) {
	const refs = new Map<string, string>();

	for (const line of stdout.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("ref:")) continue;

		const [sha, ref] = trimmed.split(/\s+/);
		if (sha && ref && GITHUB_SHA_PATTERN.test(sha)) {
			refs.set(ref, sha.toLowerCase());
		}
	}

	return refs;
}
