import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	encodeGitHubPath,
	fetchGitHubFileViaGh,
	GitHubTransportError,
	resolveGitHubRefViaAuth,
} from "../../src/utils/registry/github-cli.js";

const { execFileMock, execFileAsyncMock } = vi.hoisted(() => {
	const execFileAsyncMock = vi.fn();
	const execFileMock = Object.assign(vi.fn(), {
		[Symbol.for("nodejs.util.promisify.custom")]: execFileAsyncMock,
	});
	return { execFileMock, execFileAsyncMock };
});

vi.mock("node:child_process", () => ({ execFile: execFileMock }));

const SHA = "0123456789abcdef0123456789abcdef01234567";

beforeEach(() => {
	vi.clearAllMocks();
	vi.stubEnv("GH_TOKEN", "must-not-reach-gh");
	vi.stubEnv("GITHUB_TOKEN", "must-not-reach-gh-either");
});

afterEach(() => {
	vi.unstubAllEnvs();
});

describe("GitHub CLI transport", () => {
	it("locks gh to github.com and strips parent credentials", async () => {
		execFileAsyncMock.mockResolvedValue({ stdout: "private source" });

		await expect(
			fetchGitHubFileViaGh(
				{ owner: "acme", repo: "private-toolkit", ref: "main" },
				SHA,
				"rules/internal.md"
			)
		).resolves.toBe("private source");

		expect(execFileAsyncMock).toHaveBeenCalledWith(
			"gh",
			[
				"api",
				"--hostname",
				"github.com",
				`repos/acme/private-toolkit/contents/rules/internal.md?ref=${SHA}`,
				"-H",
				"Accept: application/vnd.github.raw+json",
				"-H",
				"X-GitHub-Api-Version: 2022-11-28",
			],
			expect.objectContaining({
				env: expect.objectContaining({
					GH_HOST: "github.com",
					GH_PROMPT_DISABLED: "1",
					GH_NO_UPDATE_NOTIFIER: "1",
					GH_PAGER: "cat",
					NO_COLOR: "1",
				}),
				timeout: 15_000,
				maxBuffer: 5 * 1024 * 1024,
			})
		);

		const options = execFileAsyncMock.mock.calls[0]?.[2] as { env: NodeJS.ProcessEnv };
		expect(options.env).not.toHaveProperty("GH_TOKEN");
		expect(options.env).not.toHaveProperty("GITHUB_TOKEN");
	});

	it("encodes path segments without encoding separators", async () => {
		execFileAsyncMock.mockResolvedValue({ stdout: "ok" });
		await fetchGitHubFileViaGh(
			{ owner: "acme", repo: "private-toolkit", ref: "main" },
			SHA,
			"dir with space/a?b.ts"
		);
		expect(execFileAsyncMock.mock.calls[0]?.[1]).toContain(
			`repos/acme/private-toolkit/contents/dir%20with%20space/a%3Fb.ts?ref=${SHA}`
		);
	});

	it.each([
		[Object.assign(new Error("spawn gh ENOENT"), { code: "ENOENT" }), "enoent", undefined],
		[Object.assign(new Error("timed out"), { killed: true }), "timeout", undefined],
		[
			Object.assign(new Error("exit 4"), { stderr: "Please run: gh auth login" }),
			"unauthenticated",
			undefined,
		],
		[Object.assign(new Error("exit 1"), { stderr: "gh: Not Found (HTTP 404)" }), "http", 404],
		[Object.assign(new Error("exit 1"), { stderr: "something odd" }), "network", undefined],
	] as const)("sanitizes and classifies gh failures", async (failure, kind, statusCode) => {
		execFileAsyncMock.mockRejectedValueOnce(failure);
		const caught = await fetchGitHubFileViaGh(
			{ owner: "acme", repo: "private-toolkit", ref: "main" },
			SHA,
			"button.ts"
		).catch((error) => error);
		expect(caught).toBeInstanceOf(GitHubTransportError);
		expect(caught).toMatchObject({ kind, ...(statusCode ? { statusCode } : {}) });
	});

	it("never leaks subprocess output into the sanitized failure", async () => {
		const secret = "ghp_secret_value_1234567890";
		execFileAsyncMock.mockRejectedValueOnce(
			Object.assign(new Error(`private source ${secret}`), {
				stderr: `gh: boom ${secret} (HTTP 500)`,
				stdout: `partial private content ${secret}`,
			})
		);
		const caught = await fetchGitHubFileViaGh(
			{ owner: "acme", repo: "private-toolkit", ref: "main" },
			SHA,
			"button.ts"
		).catch((error) => error);
		const rendered = JSON.stringify({ message: caught.message, stack: caught.stack, ...caught });
		expect(rendered).not.toContain(secret);
		expect(rendered).not.toContain("private source");
	});

	it("bounds concurrent gh processes to eight", async () => {
		let active = 0;
		let maxActive = 0;
		execFileAsyncMock.mockImplementation(async () => {
			active += 1;
			maxActive = Math.max(maxActive, active);
			await new Promise((resolve) => setTimeout(resolve, 5));
			active -= 1;
			return { stdout: "ok" };
		});

		await Promise.all(
			Array.from({ length: 20 }, (_, index) =>
				fetchGitHubFileViaGh(
					{ owner: "acme", repo: "private-toolkit", ref: "main" },
					SHA,
					`file-${index}.ts`
				)
			)
		);

		expect(maxActive).toBeLessThanOrEqual(8);
		expect(maxActive).toBeGreaterThan(1);
	});

	it("encodes GitHub path segments", () => {
		expect(encodeGitHubPath("a b/c?d/e%f")).toBe("a%20b/c%3Fd/e%25f");
	});

	it("resolves refs through gh and validates JSON output", async () => {
		execFileAsyncMock.mockResolvedValueOnce({ stdout: JSON.stringify({ sha: SHA }) });
		await expect(
			resolveGitHubRefViaAuth({ owner: "acme", repo: "private-toolkit" }, "refs/heads/main", "gh")
		).resolves.toBe(SHA);
		expect(execFileAsyncMock.mock.calls[0]?.[1]).toContain(
			"repos/acme/private-toolkit/commits/heads/main"
		);

		execFileAsyncMock.mockResolvedValueOnce({ stdout: "not json" });
		await expect(
			resolveGitHubRefViaAuth({ owner: "acme", repo: "private-toolkit" }, "refs/heads/main", "gh")
		).rejects.toMatchObject({ kind: "invalid-response" });
	});
});
