import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { error } from "../errors.js";
import { getGitHubAuthState, selectGitHubAuthMode } from "./github-auth.js";
import {
	getGitHubTransportFailureGuidance,
	GitHubTransportError,
	resolveGitHubRefViaAuth,
	type GitHubSource,
} from "./github-cli.js";

const execFileAsync = promisify(execFile);
const GITHUB_URL = "https://github.com";
const GITHUB_SHA_PATTERN = /^[a-fA-F0-9]{40}$/;
const GITHUB_REF_RESOLUTION_TIMEOUT = 15_000;

export type GitHubRefResolverOptions = {
	cache?: Map<string, Promise<string>>;
	authAnchor?: object;
};

export async function resolveGitHubRef(
	address: GitHubSource,
	options: GitHubRefResolverOptions = {}
) {
	const ref = address.ref ?? "HEAD";
	if (GITHUB_SHA_PATTERN.test(ref)) return ref.toLowerCase();
	const cacheKey = `${address.owner}/${address.repo}#${ref}`;
	if (options.cache?.has(cacheKey)) return options.cache.get(cacheKey)!;
	const promise = resolveGitHubRefUncached(address, ref, options).catch((err) => {
		options.cache?.delete(cacheKey);
		throw err;
	});
	options.cache?.set(cacheKey, promise);
	return promise;
}

async function resolveGitHubRefUncached(
	address: GitHubSource,
	ref: string,
	options: GitHubRefResolverOptions
) {
	const repoUrl = `${GITHUB_URL}/${address.owner}/${address.repo}.git`;
	let stdout: string;
	try {
		const result = await execFileAsync(
			"git",
			["ls-remote", "--symref", "--", repoUrl, ...getGitHubRefCandidates(ref)],
			{
				env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
				timeout: GITHUB_REF_RESOLUTION_TIMEOUT,
			}
		);
		stdout = result.stdout;
	} catch (cause) {
		const refError = error(
			`Failed to resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}. Check that the public GitHub repository exists and the ref is accessible.`,
			cause
		);
		if (!options.authAnchor) throw refError;
		return resolveGitHubRefWithAuth(address, ref, options.authAnchor, refError);
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

async function resolveGitHubRefWithAuth(
	address: GitHubSource,
	ref: string,
	authAnchor: object,
	refError: Error
) {
	const state = getGitHubAuthState(authAnchor, address);
	const mode = await selectGitHubAuthMode(state, refError);
	try {
		return await resolveGitHubRefViaAuth(address, ref, mode);
	} catch (err) {
		if (!(err instanceof GitHubTransportError)) throw refError;
		if (err.kind === "http" && err.statusCode === 404) throw refError;
		throw error(`${refError.message} ${getGitHubTransportFailureGuidance(err, mode)}`);
	}
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
		if (sha && ref && GITHUB_SHA_PATTERN.test(sha)) refs.set(ref, sha.toLowerCase());
	}
	return refs;
}
