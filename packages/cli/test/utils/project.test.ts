import path from "node:path";
import { vol } from "memfs";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as project from "../../src/utils/project.js";
import type { ResolvedConfig } from "../../src/utils/config/index.js";

vi.mock("node:path");
vi.mock("node:url");
vi.mock("node:fs");
vi.mock("node:fs/promises");

beforeEach(() => {
	vol.reset();
	vi.resetAllMocks();
});

const mockRegistryIndex = [
	{ name: "button", type: "registry:ui" as const, relativeUrl: "button.json" },
	{ name: "card", type: "registry:ui" as const, relativeUrl: "card.json" },
	{ name: "utils", type: "registry:lib" as const, relativeUrl: "utils.json" },
	{ name: "use-mobile", type: "registry:hook" as const, relativeUrl: "use-mobile.json" },
];

function createConfig(resolvedPaths: {
	ui: string;
	components: string;
	hooks: string;
}): ResolvedConfig {
	return {
		resolvedPaths: {
			...resolvedPaths,
			cwd: "/test",
			lib: "/test/lib",
			tailwindCss: "/test/app.css",
			utils: "/test/utils",
		},
		aliases: {
			components: "$lib/components",
			utils: "$lib/utils",
			ui: "$lib/components/ui",
			hooks: "$lib/hooks",
			lib: "$lib",
		},
		tailwind: { css: "src/app.css", baseColor: "zinc" },
		typescript: true,
		registry: "https://shadcn-svelte.com/registry",
		style: "vega",
		iconLibrary: "lucide",
		menuColor: "default",
		menuAccent: "subtle",
		sveltekit: true,
	} satisfies ResolvedConfig;
}

describe("getPackageInfo", () => {
	it("reads and parses project package.json", () => {
		const mockPackageJson = { name: "project-package", version: "1.0.0" };

		vol.fromJSON(
			{
				"./package.json": JSON.stringify(mockPackageJson),
			},
			"/tmp"
		);
		vi.mocked(path.resolve).mockReturnValue("/tmp/package.json");

		const result = project.getPackageInfo("/tmp");
		expect(result).toEqual(mockPackageJson);
		expect(path.resolve).toHaveBeenCalledWith("/tmp", "package.json");
	});

	it("throws on invalid JSON", () => {
		vol.fromJSON(
			{
				"./package.json": "invalid json",
			},
			"/tmp"
		);
		vi.mocked(path.resolve).mockReturnValue("/tmp/package.json");

		expect(() => project.getPackageInfo("/tmp")).toThrow();
	});
});

describe("isUsingSvelteKit", () => {
	it("returns true when @sveltejs/kit is in dependencies", () => {
		vol.fromJSON(
			{
				"./package.json": JSON.stringify({
					dependencies: { "@sveltejs/kit": "^2.0.0" },
					devDependencies: {},
				}),
			},
			"/tmp"
		);
		vi.mocked(path.resolve).mockReturnValue("/tmp/package.json");

		expect(project.isUsingSvelteKit("/tmp")).toBe(true);
	});

	it("returns true when @sveltejs/kit is in devDependencies", () => {
		vol.fromJSON(
			{
				"./package.json": JSON.stringify({
					dependencies: {},
					devDependencies: { "@sveltejs/kit": "^2.0.0" },
				}),
			},
			"/tmp"
		);
		vi.mocked(path.resolve).mockReturnValue("/tmp/package.json");

		expect(project.isUsingSvelteKit("/tmp")).toBe(true);
	});

	it("returns false when @sveltejs/kit is not a dependency", () => {
		vol.fromJSON(
			{
				"./package.json": JSON.stringify({
					dependencies: { svelte: "^5.0.0" },
					devDependencies: {},
				}),
			},
			"/tmp"
		);
		vi.mocked(path.resolve).mockReturnValue("/tmp/package.json");

		expect(project.isUsingSvelteKit("/tmp")).toBe(false);
	});
});

describe("getComponents", () => {
	it("returns registry items that exist as directories in ui, components, and hooks paths", async () => {
		// Create directory structure: /test/ui/button, /test/ui/card, /test/hooks/use-mobile
		vol.fromJSON(
			{
				"./ui/button/.gitkeep": "",
				"./ui/card/.gitkeep": "",
				"./components/other/.gitkeep": "", // not in registry
				"./hooks/use-mobile/.gitkeep": "",
			},
			"/test"
		);

		const config = createConfig({
			ui: "/test/ui",
			components: "/test/components",
			hooks: "/test/hooks",
		});

		const result = await project.getComponents({
			registryIndex: mockRegistryIndex,
			config,
		});

		// button, card from ui; use-mobile from hooks; utils always included
		expect(result).toHaveLength(4);
		expect(result.map((r) => r.name)).toContain("button");
		expect(result.map((r) => r.name)).toContain("card");
		expect(result.map((r) => r.name)).toContain("use-mobile");
		expect(result.map((r) => r.name)).toContain("utils");
		expect(result.map((r) => r.name)).not.toContain("other");
	});

	it("always includes utils when it exists in registry index", async () => {
		vol.fromJSON({}, "/test");

		const config = createConfig({
			ui: "/test/ui",
			components: "/test/components",
			hooks: "/test/hooks",
		});

		const result = await project.getComponents({
			registryIndex: mockRegistryIndex,
			config,
		});

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe("utils");
	});

	it("skips directories that do not exist", async () => {
		vol.fromJSON(
			{
				"./ui/button/.gitkeep": "",
			},
			"/test"
		);

		// components and hooks dirs don't exist
		const config = createConfig({
			ui: "/test/ui",
			components: "/test/nonexistent/components",
			hooks: "/test/nonexistent/hooks",
		});

		const result = await project.getComponents({
			registryIndex: mockRegistryIndex,
			config,
		});

		expect(result.map((r) => r.name)).toContain("button");
		expect(result.map((r) => r.name)).toContain("utils");
	});

	it("returns only utils when no component directories exist", async () => {
		vol.fromJSON({}, "/test");

		const config = createConfig({
			ui: "/test/nonexistent/ui",
			components: "/test/nonexistent/components",
			hooks: "/test/nonexistent/hooks",
		});

		const result = await project.getComponents({
			registryIndex: mockRegistryIndex,
			config,
		});

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe("utils");
	});
});
