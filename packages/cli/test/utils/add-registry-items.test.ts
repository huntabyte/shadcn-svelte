import { describe, it, expect, vi, beforeEach } from "vitest";
import { existsSync } from "node:fs";
import { addRegistryItems } from "../../src/utils/add-registry-items.js";
import * as registry from "../../src/utils/registry/index.js";
import * as p from "@clack/prompts";

// Mock the dependencies
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

describe("addRegistryItems", () => {
	const mockConfig = {
		resolvedPaths: {
			cwd: "/test",
			ui: "/test/ui",
			components: "/test/components",
			tailwindCss: "/test/app.css",
		},
	} as any;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should prompt for selective overwrite of registry dependencies from custom URL", async () => {
		// Mock registry items - a custom component with a button dependency
		const customComponent = {
			name: "data-grid",
			type: "registry:component",
			files: [{ target: "data-grid.svelte", type: "registry:component", content: "" }],
			registryDependencies: ["button"],
		};

		const buttonComponent = {
			name: "button",
			type: "registry:ui",
			files: [{ target: "button.svelte", type: "registry:ui", content: "" }],
			registryDependencies: [],
		};

		// Mock that button already exists but data-grid doesn't
		vi.mocked(existsSync).mockImplementation((path) => {
			return path.toString().includes("button");
		});

		vi.mocked(registry.resolveRegistryItems).mockResolvedValue([
			customComponent,
			buttonComponent,
		]);
		vi.mocked(registry.fetchRegistryItems).mockResolvedValue([customComponent, buttonComponent]);
		vi.mocked(registry.resolveItemFilePath).mockImplementation((config, item, file) => {
			return `/path/to/${item.name}/${file.target}`;
		});
		vi.mocked(registry.getItemAliasDir).mockReturnValue("/test/components");

		// Mock user choosing to decide individually
		vi.mocked(p.confirm).mockResolvedValue(false); // Don't overwrite all, decide individually
		vi.mocked(p.tasks).mockResolvedValue(undefined);

		await addRegistryItems({
			selectedItems: ["https://example.com/data-grid.json"], // Custom registry URL
			config: mockConfig,
			overwrite: false,
			deps: true,
		});

		// Verify that confirm was called twice - once for global, once for individual
		expect(p.confirm).toHaveBeenCalledTimes(2);
		
		// Verify that the warning was shown for existing items (which means dependencies were detected)
		expect(p.log.warn).toHaveBeenCalledWith(
			expect.stringContaining("already exist")
		);

		// Verify that the warning was shown for existing items
		expect(p.log.warn).toHaveBeenCalledWith(
			expect.stringContaining("already exist")
		);
	});

	it("should include all resolved dependencies in selectedItems for custom registry", async () => {
		const customComponent = {
			name: "data-grid",
			type: "registry:component",
			files: [{ target: "data-grid.svelte", type: "registry:component", content: "" }],
			registryDependencies: ["button", "card"],
		};

		const buttonComponent = {
			name: "button",
			type: "registry:ui",
			files: [{ target: "button.svelte", type: "registry:ui", content: "" }],
			registryDependencies: [],
		};

		const cardComponent = {
			name: "card",
			type: "registry:ui", 
			files: [{ target: "card.svelte", type: "registry:ui", content: "" }],
			registryDependencies: [],
		};

		// Mock that no items exist initially
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
		vi.mocked(registry.resolveItemFilePath).mockImplementation((config, item, file) => {
			return `/path/to/${item.name}/${file.target}`;
		});
		vi.mocked(registry.getItemAliasDir).mockReturnValue("/test/components");

		vi.mocked(p.tasks).mockResolvedValue(undefined);

		await addRegistryItems({
			selectedItems: ["https://example.com/data-grid.json"], // Custom registry URL
			config: mockConfig,
			overwrite: false,
			deps: true,
		});

		// Verify that tasks was called for all items (main component + dependencies)
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
});