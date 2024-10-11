import fs from "node:fs";
import path from "node:path";
import { execa } from "execa";
import { afterEach, expect, it, vi } from "vitest";
import { runInit } from "../../src/commands/init";
import { getConfig } from "../../src/utils/get-config";
import * as registry from "../../src/utils/registry";

vi.mock("execa");
vi.mock("fs/promises", () => ({
	writeFile: vi.fn(),
	mkdir: vi.fn(),
	readFile: vi.fn(),
}));
vi.mock("ora");

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
		inlineColorsTemplate: "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n",
		cssVarsTemplate: "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n",
	});

	const mockMkdir = vi.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined);
	const mockWriteFile = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();

	const targetDir = path.resolve(__dirname, "../fixtures/config-full");
	const config = await getConfig(targetDir);
	if (config === null) throw new Error("config is null");

	await runInit(targetDir, config, { deps: true, cwd: targetDir });

	// mkDir mocks
	expect(mockMkdir).toHaveBeenNthCalledWith(1, expect.stringContaining("src"), expect.anything());
	expect(mockMkdir).toHaveBeenNthCalledWith(
		2,
		expect.stringContaining("src/lib/components"),
		expect.anything()
	);

	// writeFile mocks
	expect(mockWriteFile).toHaveBeenNthCalledWith(
		2,
		expect.stringContaining("tailwind.config"),
		expect.stringContaining(`import { fontFamily } from "tailwindcss/defaultTheme"`),
		"utf8"
	);

	expect(mockWriteFile).toHaveBeenNthCalledWith(
		3,
		expect.stringContaining("app.pcss"),
		expect.stringContaining(`@tailwind base`),
		"utf8"
	);

	expect(mockWriteFile).toHaveBeenNthCalledWith(
		4,
		expect.stringContaining("utils.ts"),
		expect.stringContaining('import { type ClassValue, clsx } from "clsx"'),
		"utf8"
	);

	expect(execa).toHaveBeenCalledWith(
		"pnpm",
		["add", "-D", "tailwind-variants", "clsx", "tailwind-merge"],
		{ cwd: targetDir }
	);

	mockMkdir.mockRestore();
	mockWriteFile.mockRestore();
});

afterEach(() => {
	vi.resetAllMocks();
});
