import { describe, expect, it } from "vitest";
import {
	getGitHubTransportFailureGuidance,
	GitHubTransportError,
	MAX_GITHUB_SOURCE_FILE_SIZE,
	readGitHubResponseTextWithLimit,
} from "../../src/utils/registry/github-cli.js";

describe("GitHub transport limits and guidance", () => {
	it("reads a body within the configured limit", async () => {
		await expect(readGitHubResponseTextWithLimit(new Response("hello"), 10)).resolves.toBe("hello");
	});

	it("rejects content-length and streamed bodies over the limit", async () => {
		await expect(
			readGitHubResponseTextWithLimit(
				new Response("tiny", {
					headers: { "Content-Length": String(MAX_GITHUB_SOURCE_FILE_SIZE + 1) },
				})
			)
		).rejects.toMatchObject({ kind: "oversize" });
		await expect(
			readGitHubResponseTextWithLimit(new Response("this is longer than the limit"), 10)
		).rejects.toMatchObject({ kind: "oversize" });
	});

	it.each([
		["enoent", undefined, "The GitHub CLI (gh) is not installed."],
		["unauthenticated", undefined, "The configured GitHub token was rejected."],
		["timeout", undefined, "The GitHub request timed out."],
		["oversize", undefined, `The file exceeds the ${MAX_GITHUB_SOURCE_FILE_SIZE} byte`],
		["http", 401, "GitHub rejected the configured token (401)."],
		["http", 403, "GitHub denied access to the repository (403)."],
		["http", 429, "GitHub rate limited the request (429)."],
		["http", 503, "GitHub returned an upstream error (503)."],
		["invalid-response", undefined, "GitHub returned an unexpected response."],
		["network", undefined, "The GitHub request failed."],
	] as const)("returns fixed sanitized guidance for %s", (kind, statusCode, detail) => {
		const guidance = getGitHubTransportFailureGuidance(
			new GitHubTransportError(kind, { statusCode }),
			"token"
		);
		expect(guidance.detail).toContain(detail);
		expect(guidance.suggestion).toBeTruthy();
	});
});
