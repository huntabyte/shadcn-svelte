import { inspect } from "node:util";
import { fetch } from "node-fetch-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_CONFIG, type ResolvedConfig } from "../../src/utils/config/index.js";
import { resolveRegistryItems, fetchRegistryItems } from "../../src/utils/registry/index.js";
import type { RegistryIndex, RegistryItem } from "../../src/utils/registry/schema.js";

vi.mock("node-fetch-native", () => ({ fetch: vi.fn() }));

describe("namespaced registry dependencies", () => {
	const registryUrl = "https://shadcn-svelte.com/registry/styles/nova";
	const config: ResolvedConfig = {
		...DEFAULT_CONFIG,
		sveltekit: false,
		resolvedPaths: {
			cwd: "/nonexistent-project",
			ui: "/nonexistent-project/src/lib/components/ui",
			components: "/nonexistent-project/src/lib/components",
			lib: "/nonexistent-project/src/lib",
			utils: "/nonexistent-project/src/lib/utils",
			hooks: "/nonexistent-project/src/lib/hooks",
			tailwindCss: "/nonexistent-project/src/app.css",
		},
		registries: {
			"@acme": {
				url: "https://acme.com/r/{name}.json",
				headers: { Authorization: "Bearer acme-token" },
			},
			"@other": { url: "https://other.com/r/{name}.json", headers: { "X-Api-Key": "other-token" } },
		},
	};
	const registryIndex: RegistryIndex = [
		{ name: "button", type: "registry:ui", relativeUrl: "button.json" },
	];
	const item = (name: string, registryDependencies: string[] = []): RegistryItem => ({
		name,
		type: "registry:ui",
		files: [],
		registryDependencies,
	});

	beforeEach(() => vi.resetAllMocks());

	it("fetches namespaced items without requesting the default index", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(Response.json(item("button")));
		const result = await resolveRegistryItems({ registryUrl, config, items: ["@acme/button"] });
		expect(result).toEqual([item("button")]);
		expect(fetch).toHaveBeenCalledExactlyOnceWith(new URL("https://acme.com/r/button.json"), {
			headers: { Authorization: "Bearer acme-token" },
			redirect: "manual",
		});
	});

	it("uses the correct credentials for mixed dependencies and preserves duplicate names from different sources", async () => {
		const responses: Record<string, unknown> = {
			"https://acme.com/r/dashboard.json": item("dashboard", [
				"@acme/button",
				"@other/button",
				"button",
				"https://public.com/button.json",
			]),
			"https://acme.com/r/button.json": item("button"),
			"https://other.com/r/button.json": item("button"),
			[`${registryUrl}/index.json`]: registryIndex,
			[`${registryUrl}/button.json`]: item("button"),
			"https://public.com/button.json": item("button"),
		};
		vi.mocked(fetch).mockImplementation(async (url) => {
			expect(responses).toHaveProperty(String(url));
			return Response.json(responses[String(url)]);
		});
		const resolved = await resolveRegistryItems({
			registryUrl,
			config,
			items: ["@acme/dashboard"],
		});
		const result = await fetchRegistryItems({ baseUrl: registryUrl, items: resolved });
		expect(result).toHaveLength(5);
		expect(result.filter((entry) => entry.name === "button")).toHaveLength(4);
		for (const [url, options] of vi.mocked(fetch).mock.calls) {
			const host = new URL(String(url)).host;
			expect(options?.headers).toEqual(
				host === "acme.com"
					? { Authorization: "Bearer acme-token" }
					: host === "other.com"
						? { "X-Api-Key": "other-token" }
						: undefined
			);
		}
	});

	it("keeps relative dependencies in their parent's registry without authenticating absolute URLs", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(
				Response.json(item("dashboard", ["./button.json", "https://acme.com/public.json"]))
			)
			.mockResolvedValueOnce(Response.json(item("button", ["../shared.json"])))
			.mockResolvedValueOnce(Response.json(item("shared")))
			.mockResolvedValueOnce(Response.json(item("public")));
		const result = await resolveRegistryItems({ registryUrl, config, items: ["@acme/dashboard"] });
		expect(result.map((entry) => entry.name)).toEqual(["dashboard", "button", "shared", "public"]);
		expect(fetch).toHaveBeenNthCalledWith(2, new URL("https://acme.com/r/button.json"), {
			headers: { Authorization: "Bearer acme-token" },
			redirect: "manual",
		});
		expect(fetch).toHaveBeenNthCalledWith(3, new URL("https://acme.com/shared.json"), {
			headers: { Authorization: "Bearer acme-token" },
			redirect: "manual",
		});
		expect(fetch).toHaveBeenLastCalledWith(new URL("https://acme.com/public.json"), {});
	});

	it("deduplicates shared dependencies and terminates cycles by source", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(Response.json(item("first", ["@acme/second", "@acme/shared"])))
			.mockResolvedValueOnce(Response.json(item("second", ["@acme/first", "@acme/shared"])))
			.mockResolvedValueOnce(Response.json(item("shared")));
		const result = await resolveRegistryItems({
			registryUrl,
			config,
			items: ["@acme/first", "@acme/second"],
		});
		expect(result.map((entry) => entry.name)).toEqual(["first", "second", "shared"]);
		expect(fetch).toHaveBeenCalledTimes(3);
	});

	it("does not share responses between namespaces with different credentials at the same URL", async () => {
		const sameUrl = "https://acme.com/r/{name}.json";
		const scopedConfig = {
			...config,
			registries: {
				"@one": { url: sameUrl, headers: { Authorization: "one" } },
				"@two": { url: sameUrl, headers: { Authorization: "two" } },
			},
		};
		vi.mocked(fetch)
			.mockResolvedValueOnce(Response.json(item("one")))
			.mockResolvedValueOnce(Response.json(item("two")));
		const result = await resolveRegistryItems({
			registryUrl,
			config: scopedConfig,
			items: ["@one/button", "@two/button"],
		});
		expect(result.map((entry) => entry.name)).toEqual(["one", "two"]);
		expect(fetch).toHaveBeenCalledTimes(2);
	});

	it("rejects missing credentials before making a request", async () => {
		const privateConfig = {
			...config,
			registries: {
				"@acme": {
					url: "https://acme.com/{name}.json",
					headers: { Authorization: "Bearer ${SHADCN_MISSING_TEST_TOKEN}" },
				},
			},
		};
		await expect(
			resolveRegistryItems({ registryUrl, config: privateConfig, items: ["@acme/button"] })
		).rejects.toThrow("SHADCN_MISSING_TEST_TOKEN");
		expect(fetch).not.toHaveBeenCalled();
	});

	it("does not expose response contents in schema errors", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(
			Response.json({ name: "button", type: "private-token" })
		);
		const failure = await resolveRegistryItems({
			registryUrl,
			config,
			items: ["@acme/button"],
		}).catch((e: Error) => e);
		expect(inspect(failure)).toContain("Invalid registry item received for @acme/button.");
		expect(inspect(failure)).not.toContain("private-token");
	});

	it("keeps unauthenticated URL dependencies and cycles in the default registry working", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(Response.json(item("remote", ["./child.json"])))
			.mockResolvedValueOnce(Response.json(item("child")));
		expect(
			await resolveRegistryItems({ registryUrl, items: ["https://example.com/remote.json"] })
		).toHaveLength(2);
		const cyclicIndex: RegistryIndex = [{ ...registryIndex[0]!, registryDependencies: ["button"] }];
		expect(
			await resolveRegistryItems({ registryUrl, registryIndex: cyclicIndex, items: ["button"] })
		).toEqual(cyclicIndex);
		expect(fetch).toHaveBeenCalledTimes(2);
	});
});
