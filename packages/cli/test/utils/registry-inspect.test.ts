import path from "node:path";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fetch } from "node-fetch-native";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { searchRegistryCatalogs, viewRegistryItems } from "../../src/utils/registry/inspect.js";

vi.mock("node-fetch-native", () => ({ fetch: vi.fn() }));

let cwd: string;
beforeEach(async () => {
	cwd = await mkdtemp(path.join(tmpdir(), "shadcn-registry-inspect-"));
	vi.resetAllMocks();
});
afterEach(async () => {
	await rm(cwd, { recursive: true, force: true });
});

it("merges the manifest and project namespaces, filters catalogs, and keeps partial results", async () => {
	await writeFile(
		path.join(cwd, "package.json"),
		JSON.stringify({
			registries: {
				"@acme": "https://old.example/{name}.json",
				"@other": "https://other.example/{name}.json",
			},
		})
	);
	await writeFile(
		path.join(cwd, "components.json"),
		JSON.stringify({
			registries: { "@acme": "https://acme.example/{name}.json" },
		})
	);
	vi.mocked(fetch).mockImplementation(async (url) => {
		if (String(url) === "https://acme.example/registry.json") {
			return Response.json({
				items: [
					{ name: "card", type: "registry:ui" },
					{ name: "card-utils", type: "registry:lib" },
				],
			});
		}
		expect(String(url)).toBe("https://other.example/registry.json");
		return new Response(null, { status: 404 });
	});

	const result = await searchRegistryCatalogs([], {
		cwd,
		query: "card",
		types: ["registry:ui"],
		limit: 1,
		offset: 0,
	});
	expect(result.items).toEqual([{ name: "card", type: "registry:ui", registry: "@acme" }]);
	expect(result.allFailed).toBe(false);
	expect(result.errors).toMatchObject([{ registry: "@other" }]);
	expect(fetch).toHaveBeenCalledTimes(2);
});

it("views a local JSON item without reading its dependencies", async () => {
	const item = {
		name: "local-item",
		type: "registry:ui",
		registryDependencies: ["@unconfigured/dependency"],
	};
	await writeFile(path.join(cwd, "item.json"), JSON.stringify(item));
	expect(await viewRegistryItems(["./item.json"], cwd)).toEqual([item]);
	expect(fetch).not.toHaveBeenCalled();
});
