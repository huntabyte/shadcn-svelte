import { fetch } from "node-fetch-native";
import { describe, expect, it, vi } from "vitest";
import {
	resolveGitHubItemAddress,
	resolveGitHubRegistrySource,
} from "../../src/utils/registry/address.js";
import { parseGitLsRemote } from "../../src/utils/registry/github-ref.js";
import {
	fetchGitHubRegistryItem,
	validateGitHubRegistrySource,
} from "../../src/utils/registry/github.js";
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
							files: [{ path: "agent.md", type: "registry:file", target: "~/AGENTS.md" }],
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

	it("resolves explicit GitHub dependencies while keeping bare dependencies in the registry", async () => {
		const sha = "0123456789abcdef0123456789abcdef01234567";
		vi.mocked(fetch).mockImplementation(async (url) => {
			const value = String(url);
			const pathname = new URL(value).pathname;
			const [owner, repo] = pathname.split("/").slice(1, 3);
			const filePath = pathname.split("/").slice(4).join("/");
			let body: unknown;
			if (filePath === "registry.json" && owner === "acme" && repo === "app") {
				body = {
					name: "app",
					homepage: "https://github.com/acme/app",
					items: [
						{
							name: "page",
							type: "registry:block",
							files: [{ path: "page.svelte", type: "registry:block" }],
							registryDependencies: [`acme/ui/button#${sha}`, "input"],
						},
					],
				};
			} else if (filePath === "registry.json") {
				body = {
					name: "ui",
					homepage: "https://github.com/acme/ui",
					items: [
						{
							name: "button",
							type: "registry:ui",
							files: [{ path: "button.svelte", type: "registry:ui" }],
						},
					],
				};
			} else body = "source";
			return {
				ok: true,
				status: 200,
				headers: new Headers(),
				text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
			} as Response;
		});

		const items = await resolveRegistryItems({
			registryUrl: "https://shadcn-svelte.com/registry",
			registryIndex: [{ name: "input", type: "registry:ui", relativeUrl: "input.json" }],
			items: [`acme/app/page#${sha}`],
		});
		expect(items.map((item) => item.name)).toEqual(["page", "button", "input"]);
	});

	it("keeps same-name GitHub dependencies from different repositories distinct", async () => {
		const sha = "0123456789abcdef0123456789abcdef01234567";
		vi.mocked(fetch).mockImplementation(async (url) => {
			const pathname = new URL(String(url)).pathname;
			const [owner, repo] = pathname.split("/").slice(1, 3);
			const filePath = pathname.split("/").slice(4).join("/");
			const source = `${owner}/${repo}`;
			const body =
				filePath === "registry.json"
					? source === "acme/app"
						? {
								name: "app",
								homepage: "https://github.com/acme/app",
								items: [
									{
										name: "page",
										type: "registry:block",
										registryDependencies: [`acme/ui/button#${sha}`, `craft/ui/button#${sha}`],
									},
								],
							}
						: {
								name: `${owner}-ui`,
								homepage: `https://github.com/${source}`,
								items: [
									{
										name: "button",
										type: "registry:ui",
										files: [
											{
												path: `${owner}-button.svelte`,
												type: "registry:ui",
											},
										],
									},
								],
							}
					: "source";
			return {
				ok: true,
				status: 200,
				headers: new Headers(),
				text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
			} as Response;
		});

		const items = await resolveRegistryItems({
			registryUrl: "https://shadcn-svelte.com/registry",
			registryIndex: [],
			items: [`acme/app/page#${sha}`],
		});
		expect(items.map((item) => item.name)).toEqual(["page", "button", "button"]);
		expect(
			items.slice(1).map((item) => ("files" in item ? item.files?.[0]?.target : undefined))
		).toEqual(["acme-button.svelte", "craft-button.svelte"]);
	});

	it("validates included registries and checks every item file", async () => {
		const sha = "0123456789abcdef0123456789abcdef01234567";
		vi.mocked(fetch).mockImplementation(async (url) => {
			const filePath = new URL(String(url)).pathname.split("/").slice(4).join("/");
			const body =
				filePath === "registry.json"
					? {
							name: "ui",
							homepage: "https://github.com/acme/ui",
							include: ["components/registry.json"],
						}
					: filePath === "components/registry.json"
						? {
								items: [
									{
										name: "button",
										type: "registry:ui",
										files: [{ path: "button.svelte", type: "registry:ui" }],
									},
								],
							}
						: "source";
			return {
				ok: true,
				status: 200,
				headers: new Headers(),
				text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
			} as Response;
		});

		await expect(
			validateGitHubRegistrySource({ owner: "acme", repo: "ui", ref: sha })
		).resolves.toMatchObject({ valid: true, registryFiles: 2, items: 1, diagnostics: [] });
	});

	it("bounds GitHub registry item validation concurrency to eight", async () => {
		const sha = "0123456789abcdef0123456789abcdef01234567";
		let active = 0;
		let maxActive = 0;
		const items = Array.from({ length: 20 }, (_, index) => ({
			name: `item-${index}`,
			type: "registry:file",
			files: [{ path: `file-${index}.ts`, type: "registry:file" }],
		}));
		vi.mocked(fetch).mockImplementation(async (url) => {
			const filePath = new URL(String(url)).pathname.split("/").slice(4).join("/");
			if (filePath === "registry.json") {
				return {
					ok: true,
					status: 200,
					headers: new Headers(),
					text: async () => JSON.stringify({ name: "ui", homepage: "https://x", items }),
				} as Response;
			}
			active += 1;
			maxActive = Math.max(maxActive, active);
			await new Promise((resolve) => setTimeout(resolve, 5));
			active -= 1;
			return {
				ok: true,
				status: 200,
				headers: new Headers(),
				text: async () => "source",
			} as Response;
		});

		const result = await validateGitHubRegistrySource({ owner: "acme", repo: "ui", ref: sha });
		expect(result.valid).toBe(true);
		expect(maxActive).toBeLessThanOrEqual(8);
		expect(maxActive).toBeGreaterThan(1);
	});
});
