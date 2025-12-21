import path from "node:path";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetch } from "node-fetch-native";
import {
	getRegistryUrl,
	getRegistryIndex,
	getBaseColors,
	getRegistryTheme,
	resolveRegistryItems,
	getItemAliasDir,
	resolveItemFilePath,
} from "../../src/utils/registry/index.js";
import { toPosixPath } from "./test-helpers.js";
import type { ResolvedConfig } from "../../src/utils/get-config.js";
import type { RegistryItem, RegistryIndex } from "@shadcn-svelte/registry";

vi.mock("node-fetch-native", () => ({
	fetch: vi.fn(),
}));

describe("Registry Utilities", () => {
	const cwd = "/path/to/cwd";
	const mockConfig: ResolvedConfig = {
		registry: "https://example.com/registry",
		resolvedPaths: {
			ui: path.posix.normalize(`${cwd}/ui`),
			hooks: path.posix.normalize(`${cwd}/hooks`),
			components: path.posix.normalize(`${cwd}/components`),
			cwd: path.posix.normalize(cwd),
			lib: path.posix.normalize(`${cwd}/lib`),
			utils: path.posix.normalize(`${cwd}/utils`),
		},
		sveltekit: true,
	} as ResolvedConfig;

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
				"Failed to fetch registry."
			);
		});
	});

	describe("getBaseColors", () => {
		it("should return array of base colors", () => {
			const colors = getBaseColors();
			expect(colors).toEqual([
				{
					label: "Neutral",
					name: "neutral",
				},
				{
					label: "Stone",
					name: "stone",
				},
				{
					label: "Zinc",
					name: "zinc",
				},
				{
					label: "Gray",
					name: "gray",
				},
			]);
		});
	});

	describe("getRegistryBaseColor", () => {
		it("should fetch and parse base color", async () => {
			const mockColorData = {
				inlineColors: { light: {}, dark: {} },
				cssVars: { light: {}, dark: {} },
			};
			const mockResponse = {
				json: () => Promise.resolve(mockColorData),
				ok: true,
				status: 200,
				statusText: "OK",
			};
			vi.mocked(fetch).mockResolvedValueOnce(mockResponse as Response);

			const result = await getRegistryTheme("https://example.com/registry", "slate");
			expect(result).toEqual(mockColorData);
			expect(fetch).toHaveBeenCalledWith(expect.any(URL), {});
		});

		it("should throw error on base color fetch failure", async () => {
			vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));
			await expect(getRegistryTheme("https://example.com/registry", "slate")).rejects.toThrow(
				"Failed to fetch theme: slate from registry."
			);
		});
	});

	describe("resolveRegistryItems", () => {
		const registryUrl = "https://shadcn-svelte.com/registry";

		it("should resolve items from registry index", async () => {
			const result = await resolveRegistryItems({
				registryUrl,
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
			};
			const mockResponse = {
				json: () => Promise.resolve(mockRemoteItem),
				ok: true,
				status: 200,
				statusText: "OK",
			};
			vi.mocked(fetch).mockResolvedValueOnce(mockResponse as Response);

			const result = await resolveRegistryItems({
				registryUrl,
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
					registryUrl,
					registryIndex: mockRegistryIndex,
					items: ["https://remote.com/button.json"],
				})
			).rejects.toThrow("Failed to fetch registry.");
		});

		it("should show registry URL in error message when item not found", async () => {
			await expect(
				resolveRegistryItems({
					registryUrl: "https://custom-registry.com/registry",
					registryIndex: mockRegistryIndex,
					items: ["nonexistent-item"],
				})
			).rejects.toThrow(
				/Registry item 'nonexistent-item' does not exist in the registry at 'https:\/\/custom-registry\.com\/registry'/
			);
		});

		it("should suggest official registry URL when using custom registry", async () => {
			await expect(
				resolveRegistryItems({
					registryUrl: "https://custom-registry.com/registry",
					registryIndex: mockRegistryIndex,
					items: ["nonexistent-item"],
				})
			).rejects.toThrow(/https:\/\/shadcn-svelte\.com\/registry/);
		});
	});

	describe("getItemAliasDir", () => {
		it("should return correct directory for each type", () => {
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:ui"))).toBe("/path/to/cwd/ui");
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:hook"))).toBe(
				"/path/to/cwd/hooks"
			);
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:component"))).toBe(
				"/path/to/cwd/components"
			);
			expect(toPosixPath(getItemAliasDir(mockConfig, "registry:file"))).toBe("/path/to/cwd");
		});
	});

	describe("resolveItemFilePath", () => {
		it("should resolve path with target starting with ~/", () => {
			const item: RegistryItem = {
				name: "button",
				type: "registry:ui",
				files: [
					{
						type: "registry:component",
						content: "",
						target: "~/src/components/button.svelte",
					},
				],
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, item.files![0]))).toBe(
				"/path/to/cwd/src/components/button.svelte"
			);
		});

		it("should resolve path for UI components", () => {
			const item: RegistryItem = {
				name: "button",
				type: "registry:ui",
				files: [
					{
						type: "registry:file",
						content: "",
						target: "button/button.svelte",
					},
				],
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, item.files![0]))).toBe(
				"/path/to/cwd/ui/button/button.svelte"
			);
		});

		it("should resolve path for components", () => {
			const item: RegistryItem = {
				name: "button",
				type: "registry:component",
				files: [{ type: "registry:component", content: "", target: "button.svelte" }],
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, item.files![0]))).toBe(
				"/path/to/cwd/components/button.svelte"
			);
		});

		it("should resolve path for blocks", () => {
			const item: RegistryItem = {
				name: "login",
				type: "registry:block",
				files: [
					{ type: "registry:component", content: "", target: "complex-button.svelte" },
					{ type: "registry:ui", content: "", target: "button/button.svelte" },
					{ type: "registry:page", content: "", target: "login/+page.svelte" },
				],
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, item.files![0]))).toBe(
				"/path/to/cwd/components/complex-button.svelte"
			);
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, item.files![1]))).toBe(
				"/path/to/cwd/ui/button/button.svelte"
			);
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, item.files![2]))).toBe(
				"/path/to/cwd/src/routes/login/+page.svelte"
			);
		});

		it("should resolve path for hooks", () => {
			const item: RegistryItem = {
				name: "use-hook",
				title: "Use Hook",
				type: "registry:hook",
				files: [
					{
						type: "registry:hook",
						target: "use-hook.svelte.ts",
						content: "",
					},
				],
			};
			expect(toPosixPath(resolveItemFilePath(mockConfig, item, item.files![0]))).toBe(
				"/path/to/cwd/hooks/use-hook.svelte.ts"
			);
		});

		it("should resolve path for utils", () => {
			const config = { ...mockConfig };
			const item: RegistryItem = {
				name: "utils",
				type: "registry:lib",
				files: [
					{
						type: "registry:lib",
						target: "utils.ts",
						content: "",
					},
				],
			};
			expect(toPosixPath(resolveItemFilePath(config, item, item.files![0]))).toBe(
				"/path/to/cwd/utils.ts"
			);

			// points to some other path
			config.resolvedPaths = {
				...mockConfig.resolvedPaths,
				utils: `${cwd}/some-other-path/shadcn-utils`,
			};

			expect(toPosixPath(resolveItemFilePath(config, item, item.files![0]))).toBe(
				"/path/to/cwd/some-other-path/shadcn-utils.ts"
			);

			// includes a file extension
			config.resolvedPaths.utils += ".ts";
			expect(toPosixPath(resolveItemFilePath(config, item, item.files![0]))).toBe(
				"/path/to/cwd/some-other-path/shadcn-utils.ts"
			);
		});
	});
});
