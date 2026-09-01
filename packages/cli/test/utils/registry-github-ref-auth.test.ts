import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetch } from "node-fetch-native";
import { resetGitHubAuthNotices } from "../../src/utils/registry/github-auth.js";
import { resolveGitHubRef } from "../../src/utils/registry/github-ref.js";

const { execFileMock } = vi.hoisted(() => ({ execFileMock: vi.fn() }));

vi.mock("node:child_process", () => ({ execFile: execFileMock }));
vi.mock("node-fetch-native", () => ({ fetch: vi.fn() }));

const SHA = "0123456789abcdef0123456789abcdef01234567";

beforeEach(() => {
	vi.clearAllMocks();
	resetGitHubAuthNotices();
	vi.stubEnv("GH_TOKEN", "secret-token");
	execFileMock.mockImplementation(
		(
			_command: string,
			_args: string[],
			_options: unknown,
			callback: (error: Error) => void
		) => {
			callback(Object.assign(new Error("repository not found"), { code: 128 }));
		}
	);
});

afterEach(() => {
	vi.unstubAllEnvs();
	vi.restoreAllMocks();
});

describe("authenticated GitHub ref resolution", () => {
	it("falls back from git ls-remote to the token-authenticated API", async () => {
		vi.spyOn(console, "log").mockImplementation(() => undefined);
		vi.mocked(fetch).mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ sha: SHA }),
		} as Response);

		await expect(
			resolveGitHubRef(
				{ owner: "acme", repo: "private-toolkit", ref: "main" },
				{ authAnchor: {} }
			)
		).resolves.toBe(SHA);

		expect(execFileMock).toHaveBeenCalledWith(
			"git",
			expect.arrayContaining(["ls-remote", "https://github.com/acme/private-toolkit.git"]),
			expect.any(Object),
			expect.any(Function)
		);
		expect(fetch).toHaveBeenCalledWith(
			"https://api.github.com/repos/acme/private-toolkit/commits/heads/main",
			expect.objectContaining({
				headers: expect.objectContaining({ Authorization: "Bearer secret-token" }),
			})
		);
	});

	it("only falls back from a missing shorthand branch to the matching tag", async () => {
		vi.spyOn(console, "log").mockImplementation(() => undefined);
		vi.mocked(fetch).mockImplementation(async (url) =>
			String(url).endsWith("commits/heads/v1.0.0")
				? ({ ok: false, status: 404 } as Response)
				: ({ ok: true, status: 200, json: async () => ({ sha: SHA }) } as Response)
		);

		await expect(
			resolveGitHubRef(
				{ owner: "acme", repo: "private-toolkit", ref: "v1.0.0" },
				{ authAnchor: {} }
			)
		).resolves.toBe(SHA);

		expect(vi.mocked(fetch).mock.calls.map(([url]) => String(url))).toEqual([
			"https://api.github.com/repos/acme/private-toolkit/commits/heads/v1.0.0",
			"https://api.github.com/repos/acme/private-toolkit/commits/tags/v1.0.0",
		]);
	});
});
