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

	vi.spyOn(registry, "getRegistryIndex").mockResolvedValue([
		{ name: "utils", relativeUrl: "utils.json", type: "registry:lib" },
	]);

	vi.spyOn(registry, "fetchRegistryItems").mockResolvedValue([
		{
			name: "utils",
			type: "registry:lib",
			files: [
				{
					name: "utils.ts",
					type: "registry:lib",
					target: "utils.ts",
					content: `import { type ClassValue, clsx } from "clsx"`,
				},
			],
		},
	]);

	const mockMkdir = vi.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined);
	const mockWriteFile = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();

	const targetDir = path.resolve(__dirname, "../fixtures/config-full");
	const config = await getConfig(targetDir);
	if (config === null) throw new Error("config is null");

	await runInit(targetDir, config, { deps: true, cwd: targetDir });

	// mkDir mocks
	expect(mockMkdir).toHaveBeenNthCalledWith(1, expect.stringContaining("src"), expect.anything());
	expect(mockWriteFile).toHaveBeenNthCalledWith(
		1,
		expect.stringContaining("app.css"),
		expect.stringContaining(`@import 'tailwindcss'`),
		"utf8"
	);
	expect(mockWriteFile).toHaveBeenNthCalledWith(
		2,
		expect.stringContaining("utils.ts"),
		expect.stringContaining('import { type ClassValue, clsx } from "clsx"'),
		"utf8"
	);
	expect(mockMkdir).toHaveBeenNthCalledWith(
		3,
		expect.stringContaining(path.join("src", "lib", "hooks")),
		expect.anything()
	);
	expect(mockMkdir).toHaveBeenNthCalledWith(
		4,
		expect.stringContaining(path.join("src", "lib", "components")),
		expect.anything()
	);

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
