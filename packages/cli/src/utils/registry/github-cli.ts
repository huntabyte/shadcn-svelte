import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import { getEnvProxy } from "../get-env-proxy.js";
import type { GitHubItemAddress, GitHubRegistrySource } from "./address.js";

const execFileAsync = promisify(execFile);
const GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_VERSION = "2022-11-28";
const GITHUB_ACCEPT_RAW = "application/vnd.github.raw+json";
const GITHUB_ACCEPT_JSON = "application/vnd.github+json";
const GITHUB_SHA_PATTERN = /^[a-fA-F0-9]{40}$/;
const GITHUB_TOKEN_ENV_VARS = ["GH_TOKEN", "GITHUB_TOKEN"] as const;
const HEADER_SAFE_TOKEN_PATTERN = /^[\x21-\x7E]+$/;
const GH_TIMEOUT = 15_000;
const GH_CONCURRENCY = 8;
const GH_STDERR_STATUS_PATTERN = /\(HTTP (\d{3})\)/;
const TAG_DEREFERENCE_DEPTH = 5;

export const MAX_GITHUB_SOURCE_FILE_SIZE = 5 * 1024 * 1024;

export type GitHubSource = GitHubItemAddress | GitHubRegistrySource;
export type GitHubAuthMode = "token" | "gh";
export type GitHubFailureKind =
	| "http"
	| "network"
	| "timeout"
	| "enoent"
	| "unauthenticated"
	| "oversize"
	| "invalid-response";

export class GitHubTransportError extends Error {
	readonly kind: GitHubFailureKind;
	readonly statusCode?: number;

	constructor(kind: GitHubFailureKind, options: { statusCode?: number } = {}) {
		super(`GitHub request failed (${kind}).`);
		this.name = "GitHubTransportError";
		this.kind = kind;
		this.statusCode = options.statusCode;
	}
}

export function getEnvGitHubToken() {
	for (const name of GITHUB_TOKEN_ENV_VARS) {
		const value = process.env[name]?.trim();
		if (value && HEADER_SAFE_TOKEN_PATTERN.test(value)) return value;
	}
	return null;
}

export function encodeGitHubPath(path: string) {
	return path
		.split("/")
		.map((part) => encodeURIComponent(part))
		.join("/");
}

export function isValidGitHubSha(sha: unknown): sha is string {
	return typeof sha === "string" && GITHUB_SHA_PATTERN.test(sha);
}

export async function readGitHubResponseTextWithLimit(
	response: Response,
	limit = MAX_GITHUB_SOURCE_FILE_SIZE
) {
	const contentLength = Number(response.headers?.get?.("content-length"));
	if (Number.isFinite(contentLength) && contentLength > limit) {
		throw new GitHubTransportError("oversize");
	}

	if (!response.body || typeof response.body.getReader !== "function") {
		const text = await response.text();
		if (Buffer.byteLength(text, "utf8") > limit) throw new GitHubTransportError("oversize");
		return text;
	}

	const reader = response.body.getReader();
	const chunks: Uint8Array[] = [];
	let total = 0;
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		total += value.byteLength;
		if (total > limit) {
			await reader.cancel();
			throw new GitHubTransportError("oversize");
		}
		chunks.push(value);
	}
	return Buffer.concat(chunks).toString("utf8");
}

async function fetchGitHubApi(endpoint: string, token: string, accept: string) {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};
	let response: Response;
	try {
		response = (await fetch(`${GITHUB_API_URL}/${endpoint}`, {
			...proxy,
			headers: {
				Accept: accept,
				Authorization: `Bearer ${token}`,
				"User-Agent": "shadcn-svelte",
				"X-GitHub-Api-Version": GITHUB_API_VERSION,
			},
		})) as Response;
	} catch {
		throw new GitHubTransportError("network");
	}
	if (!response.ok) throw new GitHubTransportError("http", { statusCode: response.status });
	return response;
}

export async function fetchGitHubFileViaRest(
	address: GitHubSource,
	sha: string,
	filePath: string,
	token: string
) {
	const response = await fetchGitHubApi(
		buildContentsEndpoint(address, sha, filePath),
		token,
		GITHUB_ACCEPT_RAW
	);
	return readGitHubResponseTextWithLimit(response);
}

let ghSlots = GH_CONCURRENCY;
const ghQueue: Array<() => void> = [];

async function withGhSlot<T>(run: () => Promise<T>) {
	if (ghSlots > 0) ghSlots -= 1;
	else await new Promise<void>((resolve) => ghQueue.push(resolve));
	try {
		return await run();
	} finally {
		const next = ghQueue.shift();
		if (next) next();
		else ghSlots += 1;
	}
}

export function buildGhEnv() {
	const env: NodeJS.ProcessEnv = { ...process.env };
	for (const name of [
		"GH_TOKEN",
		"GITHUB_TOKEN",
		"GH_ENTERPRISE_TOKEN",
		"GITHUB_ENTERPRISE_TOKEN",
		"GH_DEBUG",
		"DEBUG",
		"GH_FORCE_TTY",
		"GH_TELEMETRY",
	]) {
		delete env[name];
	}
	env.GH_HOST = "github.com";
	env.GH_PROMPT_DISABLED = "1";
	env.GH_NO_UPDATE_NOTIFIER = "1";
	env.GH_PAGER = "cat";
	env.NO_COLOR = "1";
	return env;
}

function classifyGhFailure(value: unknown) {
	if (typeof value !== "object" || value === null) return new GitHubTransportError("network");
	const failed = value as {
		code?: unknown;
		killed?: unknown;
		signal?: unknown;
		stderr?: unknown;
	};
	if (failed.code === "ENOENT") return new GitHubTransportError("enoent");
	if (failed.killed === true || failed.signal === "SIGTERM") {
		return new GitHubTransportError("timeout");
	}
	const stderr = typeof failed.stderr === "string" ? failed.stderr : "";
	if (/gh auth login|not logged in/i.test(stderr)) {
		return new GitHubTransportError("unauthenticated");
	}
	const statusMatch = stderr.match(GH_STDERR_STATUS_PATTERN);
	if (statusMatch) {
		const statusCode = Number(statusMatch[1]);
		if (statusCode >= 100 && statusCode <= 599) {
			return new GitHubTransportError("http", { statusCode });
		}
	}
	return new GitHubTransportError("network");
}

async function runGhApi(endpoint: string, accept: string) {
	return withGhSlot(async () => {
		try {
			const result = await execFileAsync(
				"gh",
				[
					"api",
					"--hostname",
					"github.com",
					endpoint,
					"-H",
					`Accept: ${accept}`,
					"-H",
					`X-GitHub-Api-Version: ${GITHUB_API_VERSION}`,
				],
				{
					env: buildGhEnv(),
					timeout: GH_TIMEOUT,
					maxBuffer: MAX_GITHUB_SOURCE_FILE_SIZE,
					encoding: "utf8",
				}
			);
			return result.stdout;
		} catch (err) {
			throw classifyGhFailure(err);
		}
	});
}

export async function fetchGitHubFileViaGh(address: GitHubSource, sha: string, filePath: string) {
	const stdout = await runGhApi(buildContentsEndpoint(address, sha, filePath), GITHUB_ACCEPT_RAW);
	if (Buffer.byteLength(stdout, "utf8") > MAX_GITHUB_SOURCE_FILE_SIZE) {
		throw new GitHubTransportError("oversize");
	}
	return stdout;
}

function buildContentsEndpoint(address: GitHubSource, sha: string, filePath: string) {
	if (!isValidGitHubSha(sha)) throw new GitHubTransportError("invalid-response");
	return `repos/${address.owner}/${address.repo}/contents/${encodeGitHubPath(filePath)}?ref=${sha.toLowerCase()}`;
}

export function getGitHubTransportFailureGuidance(err: GitHubTransportError, mode: GitHubAuthMode) {
	if (err.kind === "enoent")
		return 'Install the GitHub CLI and run "gh auth login", or set GH_TOKEN to a token with read access.';
	if (err.kind === "unauthenticated" || err.statusCode === 401)
		return mode === "token"
			? "Check that GH_TOKEN or GITHUB_TOKEN is valid and has read access to the repository."
			: 'Run "gh auth login --hostname github.com" and try again.';
	if (err.kind === "oversize") return "Registry source files must be smaller than 5 MiB.";
	if (err.statusCode === 403)
		return "Check that your credentials have read access to the repository.";
	if (err.statusCode === 429) return "GitHub rate limited the request. Wait and try again.";
	if (err.kind === "timeout")
		return "The GitHub request timed out. Check your network and try again.";
	return "Check the repository, your credentials, and your network, then try again.";
}

type GitHubJsonRequester = (endpoint: string) => Promise<unknown>;

function createRestJsonRequester(token: string): GitHubJsonRequester {
	return async (endpoint) => {
		const response = await fetchGitHubApi(endpoint, token, GITHUB_ACCEPT_JSON);
		try {
			return await response.json();
		} catch {
			throw new GitHubTransportError("invalid-response");
		}
	};
}

function createGhJsonRequester(): GitHubJsonRequester {
	return async (endpoint) => {
		const stdout = await runGhApi(endpoint, GITHUB_ACCEPT_JSON);
		try {
			return JSON.parse(stdout);
		} catch {
			throw new GitHubTransportError("invalid-response");
		}
	};
}

export async function resolveGitHubRefViaAuth(
	address: GitHubSource,
	ref: string,
	mode: GitHubAuthMode
) {
	const token = mode === "token" ? getEnvGitHubToken() : null;
	if (mode === "token" && !token) throw new GitHubTransportError("unauthenticated");
	const request = mode === "token" ? createRestJsonRequester(token!) : createGhJsonRequester();

	if (ref === "HEAD") return resolveCommitishSha(address, request, "HEAD");
	if (ref.startsWith("refs/heads/"))
		return resolveCommitishSha(
			address,
			request,
			`heads/${encodeGitHubPath(ref.slice("refs/heads/".length))}`
		);
	if (ref.startsWith("refs/tags/"))
		return resolveCommitishSha(
			address,
			request,
			`tags/${encodeGitHubPath(ref.slice("refs/tags/".length))}`
		);
	if (ref.startsWith("refs/")) return resolveQualifiedGitRefSha(address, request, ref);

	try {
		return await resolveCommitishSha(address, request, `heads/${encodeGitHubPath(ref)}`);
	} catch (err) {
		if (err instanceof GitHubTransportError && err.kind === "http" && err.statusCode === 404) {
			return resolveCommitishSha(address, request, `tags/${encodeGitHubPath(ref)}`);
		}
		throw err;
	}
}

async function resolveCommitishSha(
	address: GitHubSource,
	request: GitHubJsonRequester,
	commitish: string
) {
	const result = await request(`repos/${address.owner}/${address.repo}/commits/${commitish}`);
	const sha =
		typeof result === "object" && result !== null ? (result as { sha?: unknown }).sha : undefined;
	if (!isValidGitHubSha(sha)) throw new GitHubTransportError("invalid-response");
	return sha.toLowerCase();
}

async function resolveQualifiedGitRefSha(
	address: GitHubSource,
	request: GitHubJsonRequester,
	ref: string
) {
	const refName = encodeGitHubPath(ref.slice("refs/".length));
	const result = await request(`repos/${address.owner}/${address.repo}/git/ref/${refName}`);
	let object =
		typeof result === "object" && result !== null
			? (result as { object?: { type?: unknown; sha?: unknown } }).object
			: undefined;
	for (let depth = 0; depth < TAG_DEREFERENCE_DEPTH; depth++) {
		if (!object || !isValidGitHubSha(object.sha)) {
			throw new GitHubTransportError("invalid-response");
		}
		if (object.type !== "tag") return object.sha.toLowerCase();
		const tag = await request(
			`repos/${address.owner}/${address.repo}/git/tags/${object.sha.toLowerCase()}`
		);
		object =
			typeof tag === "object" && tag !== null
				? (tag as { object?: { type?: unknown; sha?: unknown } }).object
				: undefined;
	}
	throw new GitHubTransportError("invalid-response");
}
