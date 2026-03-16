import fs from "node:fs";
import path from "node:path";
import { exec } from "tinyexec";
import { afterEach, expect, it, vi } from "vitest";
import { runInit } from "../../src/commands/init";
import * as registry from "../../src/utils/registry";
import { getConfig } from "../../src/utils/config/index";

vi.mock("fs/promises", () => ({ writeFile: vi.fn(), mkdir: vi.fn(), readFile: vi.fn() }));

vi.mock("tinyexec", () => ({ exec: vi.fn(() => ({})) }));

vi.mock(import("@clack/prompts"), async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		taskLog: vi.fn(() => ({ message: vi.fn(), error: vi.fn(), success: vi.fn() })),
	};
});

it("init (config-full)", async () => {
	vi.spyOn(registry, "getRegistryTheme").mockResolvedValue({
		inlineColors: {
			light: {},
			dark: {},
		},
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
			devDependencies: ["clsx@latest", "tailwind-merge@latest"],
			files: [
				{
					content: 'import { clsx, type ClassValue } from "clsx";',
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
			devDependencies: ["clsx", "tailwind-merge"],
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
		},
		options: {
			cwd: targetDir,
			deps: true,
			overwrite: true,
			skipPreflight: false,
		},
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
			"clsx@latest",
			"tailwind-merge@latest",
		],
		{ throwOnError: true, nodeOptions: { cwd: targetDir } }
	);

	mockMkdir.mockRestore();
	mockWriteFile.mockRestore();
});

afterEach(() => {
	vi.resetAllMocks();
});
