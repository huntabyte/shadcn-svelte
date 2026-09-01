import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchGitHubFileViaGh } from "../../src/utils/registry/github-cli.js";

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
});
