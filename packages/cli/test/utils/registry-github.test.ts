import { describe, expect, it, vi } from "vitest";
import { fetch } from "node-fetch-native";
import {
	resolveGitHubItemAddress,
	resolveGitHubRegistrySource,
} from "../../src/utils/registry/address.js";
import { parseGitLsRemote } from "../../src/utils/registry/github-ref.js";
import { fetchGitHubRegistryItem } from "../../src/utils/registry/github.js";
import { resolveRegistryItems } from "../../src/utils/registry/index.js";

vi.mock("node-fetch-native", () => ({
	fetch: vi.fn(),
}));

describe("GitHub registry addresses", () => {
	it("parses GitHub item addresses with slash item names and refs", () => {
		expect(resolveGitHubItemAddress("acme/toolkit/rules/agent#feature/rules")).toEqual({
			scheme: "github",
			owner: "acme",
			repo: "toolkit",
			item: "rules/agent",
			ref: "feature/rules",
		});
	});

	it("does not treat URLs as GitHub item addresses", () => {
		expect(resolveGitHubItemAddress("https://example.com/acme/toolkit/button.json")).toBeNull();
	});

	it("parses GitHub registry sources", () => {
		expect(resolveGitHubRegistrySource("acme/toolkit#v1.0.0")).toEqual({
			owner: "acme",
			repo: "toolkit",
			ref: "v1.0.0",
		});
	});

	it("parses git ls-remote output", () => {
		expect(
			parseGitLsRemote(
				"ref: refs/heads/main\tHEAD\n0123456789abcdef0123456789abcdef01234567\trefs/heads/main"
			)
		).toEqual(new Map([["refs/heads/main", "0123456789abcdef0123456789abcdef01234567"]]));
	});
});

describe("GitHub registry source loading", () => {
	it("loads a registry item and resolves include-relative file paths", async () => {
		const responses = new Map<string, unknown>([
			[
				"registry.json",
				{
					name: "toolkit",
					homepage: "https://github.com/acme/toolkit",
					include: ["rules/registry.json"],
				},
			],
			[
				"rules/registry.json",
				{
					items: [
						{
							name: "agent-rules",
							type: "registry:file",
							files: [
								{ path: "agent.md", type: "registry:file", target: "~/AGENTS.md" },
							],
							registryDependencies: [],
						},
					],
				},
			],
			["rules/agent.md", "Use small, focused changes."],
		]);

		vi.mocked(fetch).mockImplementation(async (url) => {
			const pathname = new URL(String(url)).pathname;
			const filePath = pathname.split("/").slice(4).join("/");
			const body = responses.get(filePath);
			if (body === undefined) {
				return { ok: false, status: 404, statusText: "Not Found" } as Response;
			}
			return {
				ok: true,
				status: 200,
				statusText: "OK",
				text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
			} as Response;
		});

		const item = await fetchGitHubRegistryItem({
			scheme: "github",
			owner: "acme",
			repo: "toolkit",
			item: "agent-rules",
			ref: "0123456789abcdef0123456789abcdef01234567",
		});

		expect(item.files?.[0]).toMatchObject({
			target: "~/AGENTS.md",
			content: "Use small, focused changes.",
		});
	});

	it("resolves GitHub items through the existing dependency resolver", async () => {
		vi.mocked(fetch).mockImplementation(async (url) => {
			const pathname = new URL(String(url)).pathname;
			const filePath = pathname.split("/").slice(4).join("/");
			const body =
				filePath === "registry.json"
					? {
							name: "toolkit",
							homepage: "https://github.com/acme/toolkit",
							items: [
								{
									name: "project-conventions",
									type: "registry:file",
									files: [
										{
											path: "AGENTS.md",
											type: "registry:file",
											target: "~/AGENTS.md",
										},
									],
									registryDependencies: [],
								},
							],
						}
					: "Use Svelte.";

			return {
				ok: true,
				status: 200,
				statusText: "OK",
				text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
			} as Response;
		});

		const items = await resolveRegistryItems({
			registryUrl: "https://shadcn-svelte.com/registry",
			registryIndex: [],
			items: ["acme/toolkit/project-conventions#0123456789abcdef0123456789abcdef01234567"],
		});

		expect(items).toHaveLength(1);
		expect(items[0]).toMatchObject({ name: "project-conventions", type: "registry:file" });
	});
});
