import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetch } from "node-fetch-native";
import { resetGitHubAuthNotices } from "../../src/utils/registry/github-auth.js";
import {
	buildGhEnv,
	getEnvGitHubToken,
	GitHubTransportError,
	MAX_GITHUB_SOURCE_FILE_SIZE,
	readGitHubResponseTextWithLimit,
} from "../../src/utils/registry/github-cli.js";
import { fetchGitHubRegistryItem } from "../../src/utils/registry/github.js";

vi.mock("node-fetch-native", () => ({ fetch: vi.fn() }));

const SHA = "0123456789abcdef0123456789abcdef01234567";
const address = {
	scheme: "github" as const,
	owner: "acme",
	repo: "private-toolkit",
	item: "auth-kit",
	ref: SHA,
};

function response(body: string, status = 200) {
	return {
		ok: status >= 200 && status < 300,
		status,
		headers: new Headers(),
		text: async () => body,
		json: async () => JSON.parse(body),
	} as Response;
}

const registry = JSON.stringify({
	name: "private-toolkit",
	homepage: "https://github.com/acme/private-toolkit",
	items: [
		{
			name: "auth-kit",
			type: "registry:file",
			files: [{ path: "lib/auth.ts", type: "registry:file" }],
			registryDependencies: [],
		},
	],
});

beforeEach(() => {
	vi.clearAllMocks();
	resetGitHubAuthNotices();
});

afterEach(() => {
	vi.unstubAllEnvs();
	vi.restoreAllMocks();
});

describe("GitHub private registry credentials", () => {
	it("prefers a valid GH_TOKEN over GITHUB_TOKEN", () => {
		vi.stubEnv("GH_TOKEN", "gh-token");
		vi.stubEnv("GITHUB_TOKEN", "github-token");
		expect(getEnvGitHubToken()).toBe("gh-token");
	});

	it("ignores header-unsafe tokens", () => {
		vi.stubEnv("GH_TOKEN", "unsafe token");
		vi.stubEnv("GITHUB_TOKEN", "fallback-token");
		expect(getEnvGitHubToken()).toBe("fallback-token");
	});

	it("removes token and debug variables from the gh subprocess", () => {
		vi.stubEnv("GH_TOKEN", "secret");
		vi.stubEnv("GITHUB_TOKEN", "secret-2");
		vi.stubEnv("GH_DEBUG", "api");
		const env = buildGhEnv();
		expect(env).not.toHaveProperty("GH_TOKEN");
		expect(env).not.toHaveProperty("GITHUB_TOKEN");
		expect(env).not.toHaveProperty("GH_DEBUG");
		expect(env).toMatchObject({
			GH_HOST: "github.com",
			GH_PROMPT_DISABLED: "1",
			GH_PAGER: "cat",
		});
	});
});

describe("GitHub private registry loading", () => {
	it("keeps public repositories anonymous even when a token is set", async () => {
		vi.stubEnv("GH_TOKEN", "secret-token");
		vi.mocked(fetch).mockImplementation(async (url, init) => {
			expect(String(url)).toMatch(/^https:\/\/raw\.githubusercontent\.com\//);
			expect(init?.headers).not.toHaveProperty("Authorization");
			return response(
				String(url).endsWith("registry.json") ? registry : "export const auth = true;"
			);
		});

		await expect(fetchGitHubRegistryItem(address)).resolves.toMatchObject({ name: "auth-kit" });
		expect(fetch).toHaveBeenCalledTimes(2);
	});

	it("upgrades a private root 404 to the SHA-pinned Contents API", async () => {
		vi.stubEnv("GH_TOKEN", "secret-token");
		const notice = vi.spyOn(console, "log").mockImplementation(() => undefined);
		vi.mocked(fetch).mockImplementation(async (url, init) => {
			const value = String(url);
			if (value.startsWith("https://raw.githubusercontent.com/")) {
				expect(init?.headers).not.toHaveProperty("Authorization");
				return response("not found", 404);
			}
			expect(value).toMatch(
				/^https:\/\/api\.github\.com\/repos\/acme\/private-toolkit\/contents\//
			);
			expect(value).toContain(`ref=${SHA}`);
			expect(init?.headers).toMatchObject({ Authorization: "Bearer secret-token" });
			return response(
				value.includes("registry.json") ? registry : "export const auth = true;"
			);
		});

		const item = await fetchGitHubRegistryItem(address);
		expect(item.files?.[0]?.content).toBe("export const auth = true;");
		expect(notice).toHaveBeenCalledOnce();
		expect(notice).toHaveBeenCalledWith("Using GH_TOKEN credentials.");
	});

	it("does not authenticate for a missing child of a public registry", async () => {
		vi.stubEnv("GH_TOKEN", "secret-token");
		vi.mocked(fetch).mockImplementation(async (url) =>
			response(
				String(url).endsWith("registry.json") ? registry : "not found",
				String(url).endsWith("registry.json") ? 200 : 404
			)
		);

		const failure = await fetchGitHubRegistryItem(address).catch((error: Error) => error);
		expect(failure).toHaveProperty(
			"cause.message",
			expect.stringContaining(
				"Check that the file path exists in the public GitHub repository."
			)
		);
		expect(
			vi
				.mocked(fetch)
				.mock.calls.every(([url]) =>
					String(url).startsWith("https://raw.githubusercontent.com/")
				)
		).toBe(true);
	});

	it("preserves the anonymous error when authenticated access also returns 404", async () => {
		vi.stubEnv("GH_TOKEN", "secret-token");
		vi.spyOn(console, "log").mockImplementation(() => undefined);
		vi.mocked(fetch).mockResolvedValue(response("not found", 404));

		const failure = await fetchGitHubRegistryItem(address).catch((error: Error) => error);
		expect(failure).toHaveProperty(
			"cause.message",
			expect.stringContaining(
				"Check that the public repository has registry.json at its root."
			)
		);
	});
});

it("rejects GitHub source files larger than 5 MiB", async () => {
	const oversized = {
		headers: new Headers({ "content-length": String(MAX_GITHUB_SOURCE_FILE_SIZE + 1) }),
	} as Response;
	await expect(
		readGitHubResponseTextWithLimit(oversized)
	).rejects.toMatchObject<GitHubTransportError>({
		kind: "oversize",
	});
});
