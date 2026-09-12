import { fetch } from "node-fetch-native";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	GitHubTransportError,
	resolveGitHubRefViaAuth,
} from "../../src/utils/registry/github-cli.js";

vi.mock("node-fetch-native", () => ({ fetch: vi.fn() }));

const ADDRESS = { owner: "acme", repo: "ui" };
const SHA = "1111111111111111111111111111111111111111";
const BRANCH_SHA = "2222222222222222222222222222222222222222";
const TAG_SHA = "3333333333333333333333333333333333333333";

function jsonResponse(value: unknown, status = 200) {
	return {
		ok: status >= 200 && status < 300,
		status,
		headers: new Headers(),
		json: async () => value,
	} as Response;
}

describe("authenticated GitHub ref transport", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.stubEnv("GH_TOKEN", "test-token");
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("prefers a branch when a branch and tag share a shorthand name", async () => {
		vi.mocked(fetch).mockResolvedValue(jsonResponse({ sha: BRANCH_SHA }));
		await expect(resolveGitHubRefViaAuth(ADDRESS, "release", "token")).resolves.toBe(BRANCH_SHA);
		expect(fetch).toHaveBeenCalledOnce();
		expect(String(vi.mocked(fetch).mock.calls[0]?.[0])).toContain("/commits/heads/release");
	});

	it("falls back to a tag only when the shorthand branch is missing", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(jsonResponse(null, 404))
			.mockResolvedValueOnce(jsonResponse({ sha: TAG_SHA }));
		await expect(resolveGitHubRefViaAuth(ADDRESS, "v1.0.0", "token")).resolves.toBe(TAG_SHA);
		expect(vi.mocked(fetch).mock.calls.map(([url]) => String(url))).toEqual([
			"https://api.github.com/repos/acme/ui/commits/heads/v1.0.0",
			"https://api.github.com/repos/acme/ui/commits/tags/v1.0.0",
		]);
	});

	it("does not fall back to a tag after a non-404 branch failure", async () => {
		vi.mocked(fetch).mockResolvedValue(jsonResponse(null, 500));
		await expect(resolveGitHubRefViaAuth(ADDRESS, "main", "token")).rejects.toMatchObject({
			kind: "http",
			statusCode: 500,
		});
		expect(fetch).toHaveBeenCalledOnce();
	});

	it("resolves HEAD and fully-qualified branch and tag refs", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(jsonResponse({ sha: SHA }))
			.mockResolvedValueOnce(jsonResponse({ sha: BRANCH_SHA }))
			.mockResolvedValueOnce(jsonResponse({ sha: TAG_SHA }));
		await expect(resolveGitHubRefViaAuth(ADDRESS, "HEAD", "token")).resolves.toBe(SHA);
		await expect(resolveGitHubRefViaAuth(ADDRESS, "refs/heads/main", "token")).resolves.toBe(
			BRANCH_SHA
		);
		await expect(resolveGitHubRefViaAuth(ADDRESS, "refs/tags/v1.0.0", "token")).resolves.toBe(
			TAG_SHA
		);
	});

	it("peels annotated objects for other qualified refs", async () => {
		const tagObjectSha = "4444444444444444444444444444444444444444";
		vi.mocked(fetch)
			.mockResolvedValueOnce(jsonResponse({ object: { type: "tag", sha: tagObjectSha } }))
			.mockResolvedValueOnce(jsonResponse({ object: { type: "commit", sha: SHA } }));
		await expect(resolveGitHubRefViaAuth(ADDRESS, "refs/pull/1/head", "token")).resolves.toBe(SHA);
		expect(String(vi.mocked(fetch).mock.calls[0]?.[0])).toContain("/git/ref/pull/1/head");
		expect(String(vi.mocked(fetch).mock.calls[1]?.[0])).toContain(`/git/tags/${tagObjectSha}`);
	});

	it("encodes unsafe ref characters", async () => {
		vi.mocked(fetch).mockResolvedValue(jsonResponse({ sha: SHA }));
		await resolveGitHubRefViaAuth(ADDRESS, "a?b&c", "token");
		expect(String(vi.mocked(fetch).mock.calls[0]?.[0])).toContain("/commits/heads/a%3Fb%26c");
	});

	it("rejects malformed SHAs and invalid JSON responses", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ sha: "not-a-sha" }));
		await expect(
			resolveGitHubRefViaAuth(ADDRESS, "refs/heads/main", "token")
		).rejects.toMatchObject({ kind: "invalid-response" });

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			status: 200,
			headers: new Headers(),
			json: async () => {
				throw new SyntaxError("private response");
			},
		} as unknown as Response);
		await expect(
			resolveGitHubRefViaAuth(ADDRESS, "refs/heads/main", "token")
		).rejects.toBeInstanceOf(GitHubTransportError);
	});
});
