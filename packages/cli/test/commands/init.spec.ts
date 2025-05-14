import fs from "node:fs";
import path from "node:path";
import { exec } from "tinyexec";
import { afterEach, expect, it, vi } from "vitest";
import { runInit } from "../../src/commands/init";
import { getConfig } from "../../src/utils/get-config";
import * as registry from "../../src/utils/registry";

vi.mock("tinyexec");
vi.mock("fs/promises", () => ({
	writeFile: vi.fn(),
	mkdir: vi.fn(),
	readFile: vi.fn(),
}));

it("init (config-full)", async () => {
	vi.spyOn(registry, "getRegistryBaseColor").mockResolvedValue({
		inlineColors: {
			light: {},
			dark: {},
		},
		cssVars: {
			light: {},
			dark: {},
		},
		inlineColorsTemplate: "@import 'tailwindcss';\n",
		cssVarsTemplate: "@import 'tailwindcss';\n",
	});

	vi.spyOn(registry, "resolveRegistryItems").mockResolvedValue([
		{
			name: "init",
			type: "registry:style",
			relativeUrl: "init.json",
		},
	]);

	vi.spyOn(registry, "getRegistryIndex").mockResolvedValue([
		{
			name: "init",
			type: "registry:style",
			devDependencies: ["tailwind-variants", "@lucide/svelte", "tw-animate-css"],
			registryDependencies: ["utils"],
			relativeUrl: "init.json",
		},
	]);

	vi.spyOn(registry, "fetchRegistryItems").mockResolvedValue([
		{
			name: "init",
			type: "registry:style",
			devDependencies: ["tailwind-variants", "@lucide/svelte", "tw-animate-css"],
			registryDependencies: ["utils"],
			files: [],
			$schema: "https://next.shadcn-svelte.com/schema/registry-item.json",
		},
	]);

	const mockMkdir = vi.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined);
	const mockWriteFile = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();
	const mockWriteFileSync = vi.spyOn(fs, "writeFileSync").mockResolvedValue();

	const targetDir = path.resolve(__dirname, "../fixtures/config-full");
	const config = await getConfig(targetDir);
	if (config === null) throw new Error("config is null");

	await runInit(targetDir, config, { deps: true, cwd: targetDir, overwrite: true });

	// mkDir mocks
	expect(mockMkdir).toHaveBeenNthCalledWith(1, expect.stringContaining("src"), expect.anything());
	expect(mockWriteFile).toHaveBeenNthCalledWith(
		1,
		expect.stringContaining("app.css"),
		expect.stringContaining(`@import 'tailwindcss'`),
		"utf8"
	);
	expect(mockMkdir).toHaveBeenNthCalledWith(
		2,
		expect.stringContaining(path.join("src", "lib", "components")),
		expect.anything()
	);

	expect(mockMkdir).toHaveBeenNthCalledWith(
		3,
		expect.stringContaining(path.join("src", "lib", "hooks")),
		expect.anything()
	);

	// expect(mockWriteFile).toHaveBeenNthCalledWith(
	// 	4,
	// 	expect.stringContaining("utils.ts"),
	// 	expect.stringContaining('import { type ClassValue, clsx } from "clsx"'),
	// 	"utf8"
	// );

	expect(mockWriteFileSync).toHaveBeenNthCalledWith(
		1,
		expect.stringContaining("components.json"),
		expect.stringContaining('"aliases"'),
		"utf8"
	);

	// todo: this should be passing no?
	// expect(mockWriteFile).toHaveBeenNthCalledWith(
	// 	2,
	// 	expect.stringContaining("utils"),
	// 	expect.stringContaining("import { clsx")
	// );

	expect(exec).toHaveBeenCalledWith(
		"pnpm",
		["add", "-D", "tailwind-variants", "clsx", "tailwind-merge", "tw-animate-css"],
		{ throwOnError: true, nodeOptions: { cwd: targetDir } }
	);

	mockMkdir.mockRestore();
	mockWriteFile.mockRestore();
});

afterEach(() => {
	vi.resetAllMocks();
});
