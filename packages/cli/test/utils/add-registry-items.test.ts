import { existsSync, promises as fs } from "node:fs";
import * as p from "@clack/prompts";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as registry from "../../src/utils/registry/index.js";
import { addRegistryItems } from "../../src/utils/add-registry-items.js";
import { transformCss } from "../../src/utils/transform-css.js";
import type { ResolvedConfig } from "../../src/utils/config/index";

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

vi.mock("../../src/utils/transform-css.js", () => ({
	transformCss: vi.fn((source: string) => source),
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
		style: "vega",
		iconLibrary: "lucide",
		menuColor: "default",
		menuAccent: "subtle",
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
			]),
			expect.anything()
		);
	});

	describe("--only filtering", () => {
		// mirrors the `/init?preset=` response: a base item carrying the theme
		// colors, with the chosen font as a resolved `registry:font` dependency
		const themeItem = {
			name: "vega",
			type: "registry:base",
			files: [],
			registryDependencies: ["utils", "font-inter"],
			cssVars: {
				light: { background: "oklch(1 0 0)", primary: "oklch(0.2 0 0)" },
				dark: { background: "oklch(0.1 0 0)" },
			},
			css: {},
		} satisfies ResolvedRegistryItem;

		const fontItem = {
			name: "font-inter",
			type: "registry:font",
			files: [],
			font: {
				family: "'Inter Variable', sans-serif",
				provider: "google",
				import: "Inter",
				variable: "--font-sans",
				subsets: ["latin"],
				dependency: "@fontsource-variable/inter",
			},
		} satisfies ResolvedRegistryItem;

		// run the queued tasks so each item's `cssVars`/`css` actually get merged
		const runTasks = async (tasks: p.Task[]) => {
			for (const task of tasks) {
				if (task.enabled === false) continue;
				await task.task();
			}
			return undefined;
		};

		beforeEach(() => {
			vi.mocked(existsSync).mockReturnValue(false);
			vi.mocked(registry.resolveRegistryItems).mockResolvedValue([themeItem, fontItem]);
			vi.mocked(registry.fetchRegistryItems).mockResolvedValue([themeItem, fontItem]);
			vi.mocked(registry.resolveItemFilePath).mockImplementation((_, item, file) => {
				return `/path/to/${item.name}/${file.target}`;
			});
			vi.mocked(registry.getItemAliasDir).mockReturnValue("/test/components");
			// @ts-expect-error the mock returns undefined which is fine for our assertions
			vi.mocked(p.tasks).mockImplementation(runTasks);
		});

		it("should apply both theme and fonts when `only` is omitted", async () => {
			const result = await addRegistryItems({
				selectedItems: ["https://example.com/init?preset=abc"],
				config: mockConfig,
				overwrite: true,
				deps: true,
			});

			const [, changes] = vi.mocked(transformCss).mock.calls.at(-1)!;
			// theme colors are present
			expect(changes.cssVars).toMatchObject({ light: { background: "oklch(1 0 0)" } });
			// font var is present
			expect(changes.cssVars).toMatchObject({ theme: { "--font-sans": expect.any(String) } });
			// font import + dependency are present
			expect(changes.css).toHaveProperty('@import "@fontsource-variable/inter"');
			expect(result.devDependencies.has("@fontsource-variable/inter")).toBe(true);
		});

		it("should apply only the theme and skip fonts when `only: ['theme']`", async () => {
			const result = await addRegistryItems({
				selectedItems: ["https://example.com/init?preset=abc"],
				config: mockConfig,
				overwrite: true,
				deps: true,
				only: ["theme"],
			});

			const [, changes] = vi.mocked(transformCss).mock.calls.at(-1)!;
			// theme colors are present
			expect(changes.cssVars).toMatchObject({ light: { background: "oklch(1 0 0)" } });
			// no font var, no font import, no fontsource dependency
			expect(changes.cssVars).not.toHaveProperty("theme");
			expect(changes.css).not.toHaveProperty('@import "@fontsource-variable/inter"');
			expect(result.devDependencies.has("@fontsource-variable/inter")).toBe(false);
			// the font item is never turned into a task
			const [tasks] = vi.mocked(p.tasks).mock.calls[0];
			expect(tasks.some((t) => t.title.includes("font-inter"))).toBe(false);
		});

		it("should apply only the fonts and skip the theme when `only: ['font']`", async () => {
			const result = await addRegistryItems({
				selectedItems: ["https://example.com/init?preset=abc"],
				config: mockConfig,
				overwrite: true,
				deps: true,
				only: ["font"],
			});

			const [, changes] = vi.mocked(transformCss).mock.calls.at(-1)!;
			// font var, font import, and fontsource dependency are present
			expect(changes.cssVars).toMatchObject({ theme: { "--font-sans": expect.any(String) } });
			expect(changes.css).toHaveProperty('@import "@fontsource-variable/inter"');
			expect(result.devDependencies.has("@fontsource-variable/inter")).toBe(true);
			// theme colors are NOT written
			expect(changes.cssVars).not.toHaveProperty("light");
			expect(changes.cssVars).not.toHaveProperty("dark");
		});
	});

	describe("skipExisting / forceStylesheet", () => {
		// the file-less base item carries the theme; `utils` is a file-bearing
		// dependency pulled in by the preset that a project already has
		const themeItem = {
			name: "vega",
			type: "registry:base",
			files: [],
			registryDependencies: ["utils"],
			cssVars: { light: { background: "oklch(1 0 0)" }, dark: {} },
			css: {},
		} satisfies ResolvedRegistryItem;

		const utilsItem = {
			name: "utils",
			type: "registry:lib",
			files: [{ target: "utils.ts", type: "registry:lib", content: "<UTILS>" }],
			registryDependencies: [],
		} satisfies ResolvedRegistryItem;

		const runTasks = async (tasks: p.Task[]) => {
			for (const task of tasks) {
				if (task.enabled === false) continue;
				await task.task();
			}
			return undefined;
		};

		beforeEach(() => {
			vi.mocked(registry.getItemAliasDir).mockReturnValue("/test/lib");
			vi.mocked(registry.resolveItemFilePath).mockImplementation(
				(_, item, file) => `/test/lib/${item.name}/${file.target}`
			);
			// @ts-expect-error the mock returns undefined which is fine for our assertions
			vi.mocked(p.tasks).mockImplementation(runTasks);
			vi.mocked(transformCss).mockImplementation((source: string) => source);
		});

		it("skips existing files (e.g. utils) without prompting, but still applies the theme", async () => {
			// utils.ts already exists on disk; the base item does not
			vi.mocked(existsSync).mockImplementation((path) => path.toString().includes("utils"));
			vi.mocked(registry.resolveRegistryItems).mockResolvedValue([themeItem, utilsItem]);
			vi.mocked(registry.fetchRegistryItems).mockResolvedValue([themeItem, utilsItem]);

			await addRegistryItems({
				selectedItems: ["https://example.com/init?preset=abc"],
				config: mockConfig,
				overwrite: false,
				deps: true,
				skipExisting: true,
				forceStylesheet: true,
			});

			// no overwrite prompt for the pre-existing utils file
			expect(p.confirm).not.toHaveBeenCalled();
			// utils never becomes a task, so its file is left untouched
			const [tasks] = vi.mocked(p.tasks).mock.calls[0];
			expect(tasks.some((t) => t.title.includes("utils"))).toBe(false);
			// the theme is still applied
			const [, changes] = vi.mocked(transformCss).mock.calls.at(-1)!;
			expect(changes.cssVars).toMatchObject({ light: { background: "oklch(1 0 0)" } });
		});

		it("writes the stylesheet without prompting when forceStylesheet is set", async () => {
			vi.mocked(existsSync).mockReturnValue(false);
			vi.mocked(registry.resolveRegistryItems).mockResolvedValue([themeItem]);
			vi.mocked(registry.fetchRegistryItems).mockResolvedValue([themeItem]);
			// make the stylesheet appear modified so the write path is exercised
			vi.mocked(transformCss).mockReturnValue("/* updated */");

			await addRegistryItems({
				selectedItems: ["https://example.com/init?preset=abc"],
				config: mockConfig,
				overwrite: false,
				deps: true,
				forceStylesheet: true,
			});

			// no confirmation prompt for the stylesheet update
			expect(p.confirm).not.toHaveBeenCalled();
			expect(fs.writeFile).toHaveBeenCalledWith("/test/app.css", "/* updated */", "utf8");
		});

		it("prompts before writing the stylesheet when forceStylesheet is not set", async () => {
			vi.mocked(existsSync).mockReturnValue(false);
			vi.mocked(registry.resolveRegistryItems).mockResolvedValue([themeItem]);
			vi.mocked(registry.fetchRegistryItems).mockResolvedValue([themeItem]);
			vi.mocked(transformCss).mockReturnValue("/* updated */");
			vi.mocked(p.confirm).mockResolvedValue(true);

			await addRegistryItems({
				selectedItems: ["https://example.com/init?preset=abc"],
				config: mockConfig,
				overwrite: false,
				deps: true,
			});

			expect(p.confirm).toHaveBeenCalledTimes(1);
		});
	});
});
