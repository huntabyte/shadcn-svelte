import { beforeEach, describe, expect, it, vi } from "vitest";
import { apply, runApply } from "../../src/commands/apply";
import * as cliConfig from "../../src/utils/config/index.js";
import * as registry from "../../src/utils/registry/index.js";
import { addRegistryItems } from "../../src/utils/add-registry-items.js";
import type { PresetConfig } from "../../src/preset/index.js";
import type { ResolvedConfig } from "../../src/utils/config/index.js";

vi.mock("@clack/prompts", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@clack/prompts")>();
	return {
		...actual,
		spinner: vi.fn(() => ({ start: vi.fn(), stop: vi.fn(), message: vi.fn() })),
		log: { ...actual.log, info: vi.fn() },
	};
});

vi.mock("../../src/utils/config/index.js", async (importOriginal) => {
	const actual = await importOriginal<typeof import("../../src/utils/config/index.js")>();
	return { ...actual, writeConfig: vi.fn() };
});

vi.mock("../../src/utils/registry/index.js", () => ({
	getRegistryUrl: vi.fn().mockReturnValue("https://example.com"),
}));

vi.mock("../../src/utils/add-registry-items.js", () => ({
	addRegistryItems: vi.fn().mockResolvedValue({
		dependencies: new Set<string>(),
		devDependencies: new Set<string>(),
		skippedDeps: new Set<string>(),
	}),
}));

vi.mock("../../src/utils/install-deps.js", () => ({ installDependencies: vi.fn() }));

const decidedPresets: PresetConfig = {
	style: "vega",
	theme: "neutral",
	font: "inter",
	fontHeading: "inherit",
	radius: "default",
	baseColor: "zinc",
	iconLibrary: "lucide",
	menuColor: "default",
	menuAccent: "subtle",
};

const baseOptions = {
	cwd: "/test",
	preset: "some-preset",
	yes: true,
	silent: true,
	skipPreflight: false,
};

function makeConfig(): ResolvedConfig {
	return {
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
		tailwind: { css: "/test/app.css", baseColor: "slate" },
		typescript: true,
		registry: "https://example.com/registry",
		sveltekit: true,
		style: "default",
		iconLibrary: "lucide",
		menuColor: "default",
		menuAccent: "subtle",
	} satisfies ResolvedConfig;
}

beforeEach(() => {
	vi.clearAllMocks();
	vi.mocked(registry.getRegistryUrl).mockReturnValue("https://example.com");
	vi.mocked(addRegistryItems).mockResolvedValue({
		dependencies: new Set<string>(),
		devDependencies: new Set<string>(),
		skippedDeps: new Set<string>(),
	});
});

describe("apply command options", () => {
	// `--only` must be variadic so a single `--only theme` parses to `["theme"]`
	// and satisfies the `z.array(...)` schema, rather than the string `"theme"`.
	it("registers --only as a variadic option restricted to theme/font", () => {
		const only = apply.options.find((o) => o.long === "--only");
		expect(only).toBeDefined();
		expect(only!.variadic).toBe(true);
		expect(only!.argChoices).toEqual(["font", "theme"]);
	});
});

describe("runApply", () => {
	it("only touches the stylesheet/config: sends just the preset URL, skips existing files, forces the stylesheet", async () => {
		const config = makeConfig();

		await runApply({ cwd: "/test", config, decidedPresets, options: baseOptions });

		// config is rewritten to reflect the preset
		expect(cliConfig.writeConfig).toHaveBeenCalledTimes(1);
		expect(config.style).toBe("vega");
		expect(config.tailwind.baseColor).toBe("zinc");

		const [args] = vi.mocked(addRegistryItems).mock.calls[0];
		expect(args.only).toBeUndefined();
		// only the preset item is sent — existing project files (utils/components)
		// are never re-added
		expect(args.selectedItems).toHaveLength(1);
		expect(args.selectedItems[0]).toContain("/init?preset=");
		// don't prompt to overwrite existing files, and write the stylesheet directly
		expect(args.skipExisting).toBe(true);
		expect(args.forceStylesheet).toBe(true);
	});

	it("with `--only theme`: writes config and forwards only", async () => {
		const config = makeConfig();

		await runApply({
			cwd: "/test",
			config,
			decidedPresets,
			options: { ...baseOptions, only: ["theme"] },
		});

		expect(cliConfig.writeConfig).toHaveBeenCalledTimes(1);
		expect(config.style).toBe("vega");

		const [args] = vi.mocked(addRegistryItems).mock.calls[0];
		expect(args.only).toEqual(["theme"]);
		expect(args.selectedItems).toHaveLength(1);
		expect(args.skipExisting).toBe(true);
		expect(args.forceStylesheet).toBe(true);
	});

	it("with `--only font`: leaves config untouched", async () => {
		const config = makeConfig();
		const originalStyle = config.style;
		const originalBaseColor = config.tailwind.baseColor;

		await runApply({
			cwd: "/test",
			config,
			decidedPresets,
			options: { ...baseOptions, only: ["font"] },
		});

		// font-only doesn't touch components.json
		expect(cliConfig.writeConfig).not.toHaveBeenCalled();
		expect(config.style).toBe(originalStyle);
		expect(config.tailwind.baseColor).toBe(originalBaseColor);

		const [args] = vi.mocked(addRegistryItems).mock.calls[0];
		expect(args.only).toEqual(["font"]);
		expect(args.selectedItems).toHaveLength(1);
	});

	it("treats an empty `--only` array as a full apply", async () => {
		const config = makeConfig();

		await runApply({
			cwd: "/test",
			config,
			decidedPresets,
			options: { ...baseOptions, only: [] },
		});

		expect(cliConfig.writeConfig).toHaveBeenCalledTimes(1);
		const [args] = vi.mocked(addRegistryItems).mock.calls[0];
		expect(args.only).toBeUndefined();
	});
});
