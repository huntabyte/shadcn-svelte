import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetch } from "node-fetch-native";
import {
	getRegistryUrl,
	getRegistryIndex,
	getBaseColors,
	getRegistryBaseColor,
	resolveRegistryItems,
	getItemAliasDir,
	resolveItemFilePath,
} from "../../src/utils/registry/index.js";
import type { Config } from "../../src/utils/get-config.js";
import type { RegistryItem, RegistryIndex, RegistryItemFile } from "@shadcn-svelte/registry";
import path from "node:path";
import { toPosixPath } from "./test-helpers.js";

vi.mock("node-fetch-native", () => ({
	fetch: vi.fn(),
}));

describe("Registry Utilities", () => {
	const mockConfig: Config = {
		registry: "https://example.com/registry",
		resolvedPaths: {
			ui: path.posix.normalize("/path/to/ui"),
			hooks: path.posix.normalize("/path/to/hooks"),
			components: path.posix.normalize("/path/to/components"),
			cwd: path.posix.normalize("/path/to/cwd"),
		},
	} as Config;

	const mockRegistryIndex: RegistryIndex = [
		{
			name: "button",
			title: "Button",
			type: "registry:ui",
			relativeUrl: "button.json",
			registryDependencies: ["theme"],
			dependencies: [],
			devDependencies: [],
		},
		{
			name: "theme",
			title: "Theme",
			type: "registry:theme",
			relativeUrl: "theme.json",
			registryDependencies: [],
			dependencies: [],
			devDependencies: [],
		},
	];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getRegistryUrl", () => {
		it("should return environment variable if set", () => {
			process.env.COMPONENTS_REGISTRY_URL = "https://custom.registry.com";
			expect(getRegistryUrl(mockConfig)).toBe("https://custom.registry.com");
			delete process.env.COMPONENTS_REGISTRY_URL;
		});

		it("should return config registry URL if no env var", () => {
			expect(getRegistryUrl(mockConfig)).toBe("https://example.com/registry");
		});

		it("should handle special case for next.shadcn-svelte.com", () => {
			const config = { ...mockConfig, registry: "https://next.shadcn-svelte.com/registry" };
			expect(getRegistryUrl(config)).toBe(
				"https://huntabyte-next.shadcn-svelte.pages.dev/registry"
			);
		});
	});

	describe("getRegistryIndex", () => {
		it("should fetch and parse registry index", async () => {
			const mockResponse = {
				json: () => Promise.resolve(mockRegistryIndex),
				ok: true,
				status: 200,
				statusText: "OK",
			};
			vi.mocked(fetch).mockResolvedValueOnce(mockResponse as Response);

			const result = await getRegistryIndex("https://example.com/registry");
			expect(result).toEqual(mockRegistryIndex);
			expect(fetch).toHaveBeenCalledWith(expect.any(URL), {});
		});

		it("should throw error on fetch failure", async () => {
			vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));
			await expect(getRegistryIndex("https://example.com/registry")).rejects.toThrow(
				"Failed to fetch registry. Error: Network error"
			);
		});
	});

	describe("getBaseColors", () => {
		it("should return array of base colors", () => {
			const colors = getBaseColors();
			expect(colors).toEqual([
				{ name: "slate", label: "Slate" },
				{ name: "gray", label: "Gray" },
				{ name: "zinc", label: "Zinc" },
				{ name: "neutral", label: "Neutral" },
				{ name: "stone", label: "Stone" },
			]);
		});
	});

	describe("getRegistryBaseColor", () => {
		it("should fetch and parse base color", async () => {
			const mockColorData = {
				inlineColors: { light: {}, dark: {} },
				cssVars: { light: {}, dark: {} },
				inlineColorsTemplate: "",
				cssVarsTemplate: "",
			};
			const mockResponse = {
				json: () => Promise.resolve(mockColorData),
				ok: true,
				status: 200,
				statusText: "OK",
			};
			vi.mocked(fetch).mockResolvedValueOnce(mockResponse as Response);

			const result = await getRegistryBaseColor("https://example.com/registry", "slate");
			expect(result).toEqual(mockColorData);
			expect(fetch).toHaveBeenCalledWith(expect.any(URL), {});
		});

		it("should throw error on base color fetch failure", async () => {
			vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));
			await expect(
				getRegistryBaseColor("https://example.com/registry", "slate")
			).rejects.toThrow(
				"Failed to fetch base color from registry. Failed to fetch registry. Error: Network error"
			);
		});
	});

	describe("resolveRegistryItems", () => {
		it("should resolve items from registry index", async () => {
			const result = await resolveRegistryItems({
				baseUrl: "https://example.com/registry",
				registryIndex: mockRegistryIndex,
				items: ["button"],
			});

			expect(result).toHaveLength(2); // button + theme dependency
			expect(result[0]?.name).toBe("button");
			expect(result[1]?.name).toBe("theme");
		});

		it("should handle remote items", async () => {
			const mockRemoteItem: RegistryItem = {
				name: "remote-button",
				title: "Remote Button",
				type: "registry:ui",
				files: [],
				dependencies: [],
				devDependencies: [],
				registryDependencies: [],
			};
			const mockResponse = {
				json: () => Promise.resolve(mockRemoteItem),
				ok: true,
				status: 200,
				statusText: "OK",
			};
			vi.mocked(fetch).mockResolvedValueOnce(mockResponse as Response);

			const result = await resolveRegistryItems({
				baseUrl: "https://example.com/registry",
				registryIndex: mockRegistryIndex,
				items: ["https://remote.com/button.json"],
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.name).toBe("remote-button");
		});

		it("should throw error on remote item fetch failure", async () => {
			vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));
			await expect(
				resolveRegistryItems({
					baseUrl: "https://example.com/registry",
					registryIndex: mockRegistryIndex,
					items: ["https://remote.com/button.json"],
				})
			).rejects.toThrow("Failed to fetch registry. Error: Network error");
		});
	});

	describe("getItemAliasDir", () => {
		it("should return override if provided", () => {
			expect(getItemAliasDir(mockConfig, "registry:ui", "/custom/path")).toBe("/custom/path");
		});

		it("should return correct directory for each type", () => {
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:ui"))).toBe("/path/to/ui");
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:hook"))).toBe(
				"/path/to/hooks"
			);
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:component"))).toBe(
				"/path/to/components"
			);
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:file"))).toBe("/path/to/cwd");
		});
	});

	describe("resolveItemFilePath", () => {
		it("should resolve path with target starting with ~/", () => {
			const item: RegistryItem = {
				name: "button",
				title: "Button",
				type: "registry:ui",
				dependencies: [],
				devDependencies: [],
				registryDependencies: [],
				files: [],
			};
			const file: RegistryItemFile = {
				type: "registry:ui",
				name: "button.svelte",
				content: "",
				target: "~/src/components/button.svelte",
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, file))).toBe(
				"/path/to/cwd/src/components/button.svelte"
			);
		});

		it("should resolve path for UI components", () => {
			const item: RegistryItem = {
				name: "button",
				title: "Button",
				type: "registry:ui",
				dependencies: [],
				devDependencies: [],
				registryDependencies: [],
				files: [],
			};
			const file: RegistryItemFile = {
				type: "registry:ui",
				name: "button.svelte",
				content: "",
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, file))).toBe(
				"/path/to/ui/button/button.svelte"
			);
		});

		it("should resolve path for hooks", () => {
			const item: RegistryItem = {
				name: "use-hook",
				title: "Use Hook",
				type: "registry:hook",
				dependencies: [],
				devDependencies: [],
				registryDependencies: [],
				files: [],
			};
			const file: RegistryItemFile = {
				type: "registry:hook",
				name: "use-hook.svelte.ts",
				content: "",
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, file))).toBe(
				"/path/to/hooks/use-hook.svelte.ts"
			);
		});
	});
});
