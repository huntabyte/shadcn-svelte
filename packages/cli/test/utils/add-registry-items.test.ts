import { existsSync } from "node:fs";
import * as p from "@clack/prompts";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as registry from "../../src/utils/registry/index.js";
import { addRegistryItems } from "../../src/utils/add-registry-items.js";
import type { ResolvedConfig } from "../../src/utils/get-config";
import { toPosixPath } from "./test-helpers.js";

vi.mock("node:fs", () => ({
	existsSync: vi.fn(),
	promises: {
		mkdir: vi.fn(),
		writeFile: vi.fn(),
		readFile: vi.fn().mockResolvedValue(""),
	},
}));

vi.mock("@clack/prompts", () => ({
	confirm: vi.fn(),
	tasks: vi.fn(),
	isCancel: vi.fn().mockReturnValue(false),
	log: {
		warn: vi.fn(),
	},
}));

vi.mock("../../src/utils/registry/index.js", () => ({
	getRegistryUrl: vi.fn().mockReturnValue("https://example.com/registry"),
	getRegistryIndex: vi.fn().mockResolvedValue([]),
	resolveRegistryItems: vi.fn(),
	fetchRegistryItems: vi.fn(),
	resolveItemFilePath: vi.fn(),
	getItemAliasDir: vi.fn(),
}));

vi.mock("../../src/utils/prompt-helpers.js", () => ({
	cancel: vi.fn(),
	prettifyList: vi.fn().mockImplementation((items) => items.join(", ")),
}));

vi.mock("../../src/utils/transformers.js", () => ({
	transformContent: vi.fn().mockImplementation((content) => Promise.resolve(content)),
	transformCss: vi.fn().mockImplementation((css) => css),
}));

type ResolvedRegistryItem = Awaited<ReturnType<typeof registry.resolveRegistryItems>>[number];

describe("addRegistryItems", () => {
	const mockConfig = {
		resolvedPaths: {
			cwd: "/test",
			ui: "/test/ui",
			components: "/test/components",
			tailwindCss: "/test/app.css",
			hooks: "/test/hooks",
			utils: "/test/utils",
			lib: "/test/lib",
		},
		aliases: {
			components: "/test/components",
			utils: "/test/utils",
			ui: "/test/ui",
			hooks: "/test/hooks",
			lib: "/test/lib",
		},
		tailwind: {
			css: "/test/app.css",
			baseColor: "zinc",
		},
		typescript: true,
		registry: "https://example.com/registry",
		sveltekit: true,
	} satisfies ResolvedConfig;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should prompt for selective overwrite of registry dependencies from custom URL", async () => {
		const customComponent = {
			name: "data-grid",
			type: "registry:component" as const,
			files: [{ target: "data-grid.svelte", type: "registry:component", content: "" }],
			registryDependencies: ["button"],
		} satisfies ResolvedRegistryItem;

		const buttonComponent = {
			name: "button",
			type: "registry:ui",
			files: [{ target: "button.svelte", type: "registry:ui", content: "" }],
			registryDependencies: [],
		} satisfies ResolvedRegistryItem;

		vi.mocked(existsSync).mockImplementation((path) => {
			return path.toString().includes("button");
		});

		vi.mocked(registry.resolveRegistryItems).mockResolvedValue([
			customComponent,
			buttonComponent,
		]);
		vi.mocked(registry.fetchRegistryItems).mockResolvedValue([
			customComponent,
			buttonComponent,
		]);
		vi.mocked(registry.resolveItemFilePath).mockImplementation((config, item, file) => {
			return `/path/to/${item.name}/${file.target}`;
		});
		vi.mocked(registry.getItemAliasDir).mockReturnValue("/test/components");

		vi.mocked(p.confirm).mockResolvedValue(false);
		vi.mocked(p.tasks).mockResolvedValue(undefined);

		await addRegistryItems({
			selectedItems: ["https://example.com/data-grid.json"],
			config: mockConfig,
			overwrite: false,
			deps: true,
		});

		expect(p.confirm).toHaveBeenCalledTimes(2);
		expect(p.log.warn).toHaveBeenCalledWith(expect.stringContaining("already exist"));
		expect(p.log.warn).toHaveBeenCalledWith(expect.stringContaining("already exist"));
	});

	it("should include all resolved dependencies in selectedItems for custom registry", async () => {
		const customComponent = {
			name: "data-grid",
			type: "registry:component",
			files: [{ target: "data-grid.svelte", type: "registry:component", content: "" }],
			registryDependencies: ["button", "card"],
		} satisfies ResolvedRegistryItem;

		const buttonComponent = {
			name: "button",
			type: "registry:ui",
			files: [{ target: "button.svelte", type: "registry:ui", content: "" }],
			registryDependencies: [],
		} satisfies ResolvedRegistryItem;

		const cardComponent = {
			name: "card",
			type: "registry:ui",
			files: [{ target: "card.svelte", type: "registry:ui", content: "" }],
			registryDependencies: [],
		} satisfies ResolvedRegistryItem;

		vi.mocked(existsSync).mockReturnValue(false);

		vi.mocked(registry.resolveRegistryItems).mockResolvedValue([
			customComponent,
			buttonComponent,
			cardComponent,
		]);
		vi.mocked(registry.fetchRegistryItems).mockResolvedValue([
			customComponent,
			buttonComponent,
			cardComponent,
		]);
		vi.mocked(registry.resolveItemFilePath).mockImplementation((_, item, file) => {
			return `/path/to/${item.name}/${file.target}`;
		});
		vi.mocked(registry.getItemAliasDir).mockReturnValue("/test/components");

		vi.mocked(p.tasks).mockResolvedValue(undefined);

		await addRegistryItems({
			selectedItems: ["https://example.com/data-grid.json"],
			config: mockConfig,
			overwrite: false,
			deps: true,
		});

		expect(p.tasks).toHaveBeenCalledWith(
			expect.arrayContaining([
				expect.objectContaining({
					title: expect.stringContaining("data-grid"),
				}),
				expect.objectContaining({
					title: expect.stringContaining("button"),
				}),
				expect.objectContaining({
					title: expect.stringContaining("card"),
				}),
			])
		);
	});

	it("should display correct path for utils with custom location", async () => {
		const utilsItem = {
			name: "utils",
			type: "registry:lib",
			files: [
				{ target: "utils.ts", type: "registry:lib", content: "export const cn = () => {}" },
			],
		} satisfies ResolvedRegistryItem;

		// Mock config with custom utils path
		const customConfig = {
			...mockConfig,
			resolvedPaths: {
				...mockConfig.resolvedPaths,
				utils: "/test/custom/path/shadcn-utils",
			},
		};

		vi.mocked(existsSync).mockReturnValue(false);

		vi.mocked(registry.resolveRegistryItems).mockResolvedValue([utilsItem]);
		vi.mocked(registry.fetchRegistryItems).mockResolvedValue([utilsItem]);

		// Simulate the actual behavior of resolveItemFilePath for utils
		vi.mocked(registry.resolveItemFilePath).mockImplementation((config, item, _file) => {
			if (item.name === "utils") {
				const utils = config.resolvedPaths.utils;
				if (utils.match(/.*\.(ts|js)$/)) return utils;
				else return `${utils}.ts`;
			}
			return "/default/path";
		});
		vi.mocked(registry.getItemAliasDir).mockReturnValue("/test/lib");

		// Capture the task that gets executed
		let taskResult: string | undefined;
		vi.mocked(p.tasks).mockImplementation(async (tasks) => {
			for (const task of tasks) {
				if (typeof task.task === "function") {
					taskResult = await task.task();
				}
			}
		});

		await addRegistryItems({
			selectedItems: ["utils"],
			config: customConfig,
			overwrite: false,
			deps: true,
		});

		// Verify that the displayed path matches the actual file path written
		// Normalize paths for cross-platform compatibility
		expect(toPosixPath(taskResult ?? "")).toContain("custom/path/shadcn-utils.ts");
		// Verify it doesn't use the default lib path
		expect(toPosixPath(taskResult ?? "")).not.toContain("lib/utils");
	});
});
