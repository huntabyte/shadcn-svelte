import fs from "node:fs";
import path from "node:path";
import * as p from "@clack/prompts";
import { exec } from "tinyexec";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as items from "../../src/utils/add-registry-items.js";
import * as cliConfig from "../../src/utils/config/index.js";
import * as project from "../../src/utils/project.js";
import * as registry from "../../src/utils/registry/index.js";
import { runInit } from "../../src/commands/init/index.js";
import { getConfig } from "../../src/utils/config/index.js";

vi.mock("fs/promises", () => ({ writeFile: vi.fn(), mkdir: vi.fn(), readFile: vi.fn() }));

vi.mock("tinyexec", () => ({ exec: vi.fn(() => ({})) }));

vi.mock("@clack/prompts", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@clack/prompts")>();
	return {
		...actual,
		taskLog: vi.fn(() => ({ message: vi.fn(), error: vi.fn(), success: vi.fn() })),
	};
});

it("init (config-full)", async () => {
	vi.spyOn(registry, "getRegistryTheme").mockResolvedValue({
		cssVars: {
			light: {},
			dark: {},
		},
	});

	vi.spyOn(registry, "resolveRegistryItems").mockResolvedValue([
		{
			name: "init",
			type: "registry:style",
			devDependencies: ["tailwind-variants", "@lucide/svelte", "tw-animate-css"],
			relativeUrl: "init.json",
		},
		{
			name: "utils",
			type: "registry:lib",
			devDependencies: ["cn@latest"],
			files: [
				{
					content: 'export { cn } from "cn";',
					type: "registry:lib",
					target: "utils.ts",
				},
			],
		},
	]);

	vi.spyOn(registry, "getRegistryIndex").mockResolvedValue([
		{
			name: "init",
			type: "registry:style",
			registryDependencies: ["utils"],
			relativeUrl: "init.json",
		},
		{
			name: "utils",
			type: "registry:lib",
			relativeUrl: "utils.json",
		},
	]);

	vi.spyOn(registry, "fetchRegistryItems").mockResolvedValue([
		{
			name: "init",
			type: "registry:style",
			devDependencies: ["tailwind-variants", "@lucide/svelte", "tw-animate-css"],
			registryDependencies: ["utils"],
			files: [],
			css: { "@import 'tailwindcss'": {} },
			$schema: "...",
		},
		{
			name: "utils",
			type: "registry:lib",
			devDependencies: ["cn"],
			files: [{ content: "<UTILS CONTENT>", type: "registry:lib", target: "utils.ts" }],
			$schema: "...",
		},
	]);

	const mockMkdir = vi.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined);
	const mockWriteFile = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();
	const mockWriteFileSync = vi.spyOn(fs, "writeFileSync").mockResolvedValue();

	const targetDir = path.resolve(__dirname, "../fixtures/config-full");
	const config = await getConfig(targetDir);
	if (!config) throw new Error("config is undefined");

	await runInit({
		cwd: targetDir,
		config,
		decidedPresets: {
			style: "vega",
			theme: "neutral",
			font: "inter",
			radius: "default",
			baseColor: "zinc",
			iconLibrary: "lucide",
			menuColor: "default",
			menuAccent: "subtle",
			fontHeading: "inter",
		},
		options: {
			cwd: targetDir,
			deps: true,
			install: true,
			depsInstall: true,
			overwrite: true,
			skipPreflight: false,
		},
		styleChanged: false,
	});

	// mkDir mocks

	expect(mockWriteFile).toHaveBeenNthCalledWith(
		1,
		expect.stringContaining("utils"),
		expect.stringContaining("<UTILS CONTENT>"),
		"utf8"
	);
	expect(mockWriteFile).toHaveBeenNthCalledWith(
		2,
		expect.stringContaining("app.css"),
		expect.stringContaining(`@import 'tailwindcss'`),
		"utf8"
	);

	// Verify key directories were created (order may vary)
	const mkdirCalls = mockMkdir.mock.calls.map((call) => call[0]);
	expect(mkdirCalls.some((p) => String(p).includes(path.join("src", "lib")))).toBe(true);
	expect(mkdirCalls.some((p) => String(p).includes(path.join("src", "lib", "hooks")))).toBe(true);
	expect(mkdirCalls.some((p) => String(p).includes(path.join("src", "lib", "components")))).toBe(
		true
	);

	expect(mockWriteFileSync).toHaveBeenNthCalledWith(
		1,
		expect.stringContaining("components.json"),
		expect.stringContaining('"aliases"'),
		"utf8"
	);

	expect(exec).toHaveBeenCalledWith(
		"pnpm",
		[
			"add",
			"-D",
			"tailwind-variants@latest",
			"@lucide/svelte@latest",
			"tw-animate-css@latest",
			"cn@latest",
		],
		{ throwOnError: true, nodeOptions: { cwd: targetDir } }
	);

	mockMkdir.mockRestore();
	mockWriteFile.mockRestore();
});

describe("overwriting the existing components", () => {
	const decidedPresets = {
		style: "vega",
		theme: "neutral",
		font: "inter",
		radius: "default",
		baseColor: "zinc",
		iconLibrary: "lucide",
		menuColor: "default",
		menuAccent: "subtle",
		fontHeading: "inter",
	} as const;

	it.each([
		{ name: "--overwrite", overwrite: true, styleChanged: false, answer: undefined },
		{ name: "the defaults", overwrite: false, styleChanged: false, answer: undefined },
		{ name: "a new style, answering yes", overwrite: false, styleChanged: true, answer: true },
		{ name: "a new style, answering no", overwrite: false, styleChanged: true, answer: false },
	])("passes on the choice with $name", async ({ overwrite, styleChanged, answer }) => {
		vi.spyOn(p, "tasks").mockResolvedValue(undefined);
		vi.spyOn(p.log, "warn").mockImplementation(() => {});
		vi.spyOn(cliConfig, "writeConfig").mockImplementation(() => {});
		vi.spyOn(registry, "getRegistryIndex").mockResolvedValue([]);
		vi.spyOn(project, "getComponents").mockResolvedValue([
			{ name: "button", type: "registry:ui", relativeUrl: "button.json" },
		]);
		const confirm = vi.spyOn(p, "confirm").mockResolvedValue(answer ?? true);
		const addRegistryItems = vi.spyOn(items, "addRegistryItems").mockResolvedValue({
			dependencies: new Set(),
			devDependencies: new Set(),
			skippedDeps: new Set(),
			skippedItems: [],
			skippedStylesheet: false,
		});

		const targetDir = path.resolve(__dirname, "../fixtures/config-full");
		const config = await getConfig(targetDir);
		if (!config) throw new Error("config is undefined");

		await runInit({
			cwd: targetDir,
			config,
			decidedPresets,
			options: {
				cwd: targetDir,
				deps: false,
				install: true,
				depsInstall: true,
				overwrite,
				skipPreflight: false,
			},
			styleChanged,
		});

		expect(confirm).toHaveBeenCalledTimes(answer === undefined ? 0 : 1);
		const [args] = addRegistryItems.mock.calls[0]!;
		// `undefined` asks about each item, and keeping them still asks about the stylesheet
		expect(args.overwrite).toBe(answer ?? (overwrite || undefined));
		expect(args.stylesheet).toBe(answer === false ? "ask" : undefined);
	});
});

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetAllMocks();
});
