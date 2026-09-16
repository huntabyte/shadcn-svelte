import { fetch } from "node-fetch-native";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withRegistryContext } from "../../src/utils/registry/context.js";
import { RegistrySourceFileError } from "../../src/utils/registry/errors.js";
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
		(_command: string, _args: string[], _options: unknown, callback: (error: Error) => void) => {
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
			resolveGitHubRef({ owner: "acme", repo: "private-toolkit", ref: "main" }, { authAnchor: {} })
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

	it("preserves the original public ref error when authenticated resolution returns 404", async () => {
		vi.mocked(fetch).mockResolvedValue({ ok: false, status: 404 } as Response);
		const failure = await withRegistryContext(
			() =>
				resolveGitHubRef(
					{ owner: "acme", repo: "private-toolkit", ref: "missing" },
					{ authAnchor: {} }
				),
			{ onGitHubAuthNotice: vi.fn() }
		).catch((error) => error);
		expect(failure).toBeInstanceOf(RegistrySourceFileError);
		expect(failure).toMatchObject({
			message: 'Failed to resolve GitHub ref "missing" for acme/private-toolkit.',
			context: expect.objectContaining({ reason: "github-ref-resolution", ref: "missing" }),
			suggestion: "Check that the public GitHub repository exists and the ref is accessible.",
		});
	});

	it("uses sanitized status-specific guidance for authenticated ref failures", async () => {
		vi.mocked(fetch).mockResolvedValue({ ok: false, status: 503 } as Response);
		const failure = await withRegistryContext(
			() =>
				resolveGitHubRef(
					{ owner: "acme", repo: "private-toolkit", ref: "main" },
					{ authAnchor: {} }
				),
			{ onGitHubAuthNotice: vi.fn() }
		).catch((error) => error);
		expect(failure).toBeInstanceOf(RegistrySourceFileError);
		expect(failure).toMatchObject({
			message: expect.stringContaining("GitHub returned an upstream error (503)."),
			suggestion: "GitHub may be having issues. Try again later.",
		});
	});
});
