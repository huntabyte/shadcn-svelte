import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { RegistrySourceFileError } from "./errors.js";
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
		const refError = createGitHubRefResolutionError(address, ref, repoUrl, cause);
		if (!options.authAnchor) throw refError;
		return resolveGitHubRefWithAuth(address, ref, options.authAnchor, refError);
	}

	const refs = parseGitLsRemote(stdout);
	for (const candidate of getPreferredGitHubRefNames(ref)) {
		const sha = refs.get(candidate);
		if (sha) return sha;
	}
	throw new RegistrySourceFileError("registry.json", undefined, {
		message: `Could not resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}.`,
		context: {
			reason: "github-ref-resolution",
			source: formatGitHubSource(address),
			ref,
			repoUrl,
		},
		suggestion:
			'Use an existing branch, tag, or full commit SHA. For example: "owner/repo/item#main" or "owner/repo/item#v1.0.0".',
	});
}

async function resolveGitHubRefWithAuth(
	address: GitHubSource,
	ref: string,
	authAnchor: object,
	refError: RegistrySourceFileError
) {
	const state = getGitHubAuthState(authAnchor, address);
	let mode;
	try {
		mode = await selectGitHubAuthMode(state, address, refError);
	} catch {
		throw refError;
	}
	try {
		return await resolveGitHubRefViaAuth(address, ref, mode);
	} catch (err) {
		if (!(err instanceof GitHubTransportError)) throw refError;
		if (err.kind === "http" && err.statusCode === 404) throw refError;
		const guidance = getGitHubTransportFailureGuidance(err, mode);
		if (err.kind === "enoent" || err.kind === "unauthenticated") {
			throw new RegistrySourceFileError("registry.json", undefined, {
				message: refError.message,
				context: {
					reason: "github-ref-resolution",
					source: formatGitHubSource(address),
					ref,
				},
				suggestion: guidance.suggestion,
			});
		}
		throw new RegistrySourceFileError("registry.json", undefined, {
			message: `Failed to resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}. ${guidance.detail}`,
			context: {
				reason: "github-ref-resolution",
				source: formatGitHubSource(address),
				ref,
			},
			suggestion: guidance.suggestion,
		});
	}
}

function createGitHubRefResolutionError(
	address: GitHubSource,
	ref: string,
	repoUrl: string,
	cause: unknown
) {
	return new RegistrySourceFileError("registry.json", cause, {
		message: `Failed to resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}.`,
		context: {
			reason: "github-ref-resolution",
			source: formatGitHubSource(address),
			ref,
			repoUrl,
		},
		suggestion: getGitHubRefResolutionSuggestion(cause),
	});
}

function getGitHubRefResolutionSuggestion(cause: unknown) {
	if (isGitNotFoundError(cause)) {
		return "Install Git and try again. Git is required to resolve GitHub registry refs.";
	}
	if (isTimeoutError(cause)) {
		return "GitHub ref resolution timed out. Check your network connection and try again.";
	}
	return "Check that the public GitHub repository exists and the ref is accessible.";
}

function isGitNotFoundError(cause: unknown) {
	return typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT";
}

function isTimeoutError(cause: unknown) {
	return (
		typeof cause === "object" &&
		cause !== null &&
		(("timedOut" in cause && cause.timedOut === true) ||
			("killed" in cause && cause.killed === true))
	);
}

function formatGitHubSource(address: GitHubSource) {
	return `${address.owner}/${address.repo}#${address.ref ?? "HEAD"}`;
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
