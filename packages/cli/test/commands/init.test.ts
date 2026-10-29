import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { tmpdir } from "node:os";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { exec } from "tinyexec";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as items from "../../src/utils/add-registry-items.js";
import * as cliConfig from "../../src/utils/config/index.js";
import * as project from "../../src/utils/project.js";
import * as promptHelpers from "../../src/utils/prompt-helpers.js";
import * as registry from "../../src/utils/registry/index.js";
import { init, runInit } from "../../src/commands/init/index.js";
import { encodePreset } from "../../src/preset/index.js";
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

// it only checks the project's Svelte and Tailwind CSS versions
vi.mock("../../src/commands/init/preflight.js", () => ({ preflightInit: vi.fn() }));

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

type InitOptions = Parameters<typeof runInit>[0]["options"];

const defaultOptions = {
	deps: false,
	install: true,
	depsInstall: true,
	skipPreflight: false,
} satisfies Partial<InitOptions>;

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
		decidedPresets,
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
	const targetDir = path.resolve(__dirname, "../fixtures/config-full");

	beforeEach(() => {
		vi.spyOn(p, "tasks").mockResolvedValue(undefined);
		vi.spyOn(p.log, "warn").mockImplementation(() => {});
		vi.spyOn(cliConfig, "writeConfig").mockImplementation(() => {});
		vi.spyOn(registry, "getRegistryIndex").mockResolvedValue([]);
		vi.spyOn(project, "getComponents").mockResolvedValue([
			{ name: "button", type: "registry:ui", relativeUrl: "button.json" },
		]);
		vi.spyOn(items, "addRegistryItems").mockResolvedValue({
			dependencies: new Set(),
			devDependencies: new Set(),
			skippedDeps: new Set(),
			skippedItems: [],
			skippedStylesheet: false,
		});
	});

	async function run(options: Partial<InitOptions>, styleChanged: boolean) {
		const config = await getConfig(targetDir);
		if (!config) throw new Error("config is undefined");

		await runInit({
			cwd: targetDir,
			config,
			decidedPresets,
			options: { cwd: targetDir, ...defaultOptions, ...options },
			styleChanged,
		});

		return vi.mocked(items.addRegistryItems).mock.calls[0]![0];
	}

	// `undefined` asks about each item, and keeping them still asks about the stylesheet
	it.each([
		{ name: "the defaults", options: {}, styleChanged: false, overwrite: undefined },
		{ name: "--overwrite", options: { overwrite: true }, styleChanged: false, overwrite: true },
		{
			name: "--no-overwrite",
			options: { overwrite: false },
			styleChanged: false,
			overwrite: false,
		},
		{
			name: "a new style and --overwrite",
			options: { overwrite: true },
			styleChanged: true,
			overwrite: true,
			reinstalled: true,
		},
		{
			name: "a new style and --no-overwrite",
			options: { overwrite: false },
			styleChanged: true,
			overwrite: false,
		},
		{
			name: "a new style and --reinstall",
			options: { reinstall: true },
			styleChanged: true,
			overwrite: true,
			reinstalled: true,
		},
		{
			name: "a new style and --no-reinstall",
			options: { reinstall: false },
			styleChanged: true,
			overwrite: undefined,
		},
		{
			name: "--overwrite stylesheet",
			options: { overwrite: ["stylesheet"] } satisfies Partial<InitOptions>,
			styleChanged: false,
			overwrite: [],
			stylesheet: "write",
		},
		{
			name: "a new style and --overwrite utils stylesheet",
			options: { overwrite: ["utils", "stylesheet"] } satisfies Partial<InitOptions>,
			styleChanged: true,
			overwrite: ["utils"],
			stylesheet: "write",
		},
		{
			name: "a new style and --overwrite components",
			options: { overwrite: ["components"] } satisfies Partial<InitOptions>,
			styleChanged: true,
			overwrite: ["button"],
			stylesheet: "keep",
			reinstalled: true,
		},
		{
			name: "a new style, answering yes",
			options: {},
			styleChanged: true,
			answer: true,
			overwrite: true,
			reinstalled: true,
		},
		{
			name: "a new style, answering no",
			options: {},
			styleChanged: true,
			answer: false,
			overwrite: false,
			stylesheet: "ask",
			reinstalled: true,
		},
	])(
		"passes on the choice with $name",
		async ({ options, styleChanged, answer, overwrite, stylesheet, reinstalled }) => {
			const confirm = vi.spyOn(p, "confirm").mockResolvedValue(answer ?? true);

			const args = await run(options, styleChanged);

			expect(confirm).toHaveBeenCalledTimes(answer === undefined ? 0 : 1);
			expect(args.overwrite).toEqual(overwrite);
			expect(args.stylesheet).toBe(stylesheet);
			// answering no still passes the components, which `overwrite: false` keeps
			expect(args.selectedItems.includes("button")).toBe(reinstalled ?? false);
		}
	);
});

describe("the init command", () => {
	const aliases = [
		["--lib-alias", "$lib"],
		["--components-alias", "$lib/components"],
		["--ui-alias", "$lib/components/ui"],
		["--utils-alias", "$lib/utils"],
		["--hooks-alias", "$lib/hooks"],
	];
	const flags = [
		["--preset", encodePreset(decidedPresets)],
		["--css", "src/app.css"],
		...aliases,
	].flat();
	const tsconfig = JSON.stringify({
		compilerOptions: { paths: { $lib: ["./src/lib"], "$lib/*": ["./src/lib/*"] } },
	});

	let cwd: string;

	beforeEach(() => {
		cwd = fs.mkdtempSync(path.join(tmpdir(), "shadcn-svelte-init-"));
		fs.mkdirSync(path.join(cwd, "src"));
		fs.writeFileSync(path.join(cwd, "src", "app.css"), "");
		fs.writeFileSync(path.join(cwd, "package.json"), "{}");
		vi.spyOn(promptHelpers, "intro").mockImplementation(() => {});
		vi.spyOn(project, "syncSvelteKit").mockResolvedValue();
		vi.spyOn(p, "cancel").mockImplementation(() => {});
		vi.spyOn(p, "outro").mockImplementation(() => {});
		vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
		vi.spyOn(items, "addRegistryItems").mockResolvedValue({
			dependencies: new Set(),
			devDependencies: new Set(),
			skippedDeps: new Set(),
			skippedItems: [],
			skippedStylesheet: false,
		});
	});

	afterEach(() => {
		fs.rmSync(cwd, { recursive: true, force: true });
	});

	async function runInitCommand(...args: string[]) {
		const program = new Command();
		program.addCommand(init);
		await program.parseAsync(["node", "shadcn-svelte", "init", "-c", cwd, "--no-deps", ...args]);
	}

	it.each([
		{ name: "a detected tsconfig", file: "tsconfig.json", args: [], typescript: true },
		{
			name: "--tsconfig",
			file: "tsconfig.app.json",
			args: ["--tsconfig", "tsconfig.app.json"],
			typescript: { config: "tsconfig.app.json" },
		},
	])("runs with every flag and $name", async ({ file, args, typescript }) => {
		fs.writeFileSync(path.join(cwd, file), tsconfig);

		await runInitCommand(...flags, ...args);

		expect(p.cancel).not.toHaveBeenCalled();
		const [options] = vi.mocked(items.addRegistryItems).mock.calls[0]!;
		expect(options.config.typescript).toEqual(typescript);
		expect(options.config.aliases.ui).toBe("$lib/components/ui");
	});

	describe("with package.json subpath imports", () => {
		const subpathFlags = [
			["--preset", encodePreset(decidedPresets)],
			["--css", "src/app.css"],
			...aliases.map(([flag, alias]) => [flag!, alias!.replace("$lib", "#lib")]),
		].flat();

		function writePackageJson(devDependencies = {}) {
			const imports = { "#lib": "./src/lib/index.js", "#lib/*": "./src/lib/*" };
			fs.writeFileSync(
				path.join(cwd, "package.json"),
				JSON.stringify({ imports, devDependencies })
			);
		}

		it("runs without a tsconfig as a JavaScript project", async () => {
			writePackageJson();

			await runInitCommand(...subpathFlags);

			expect(p.cancel).not.toHaveBeenCalled();
			const [options] = vi.mocked(items.addRegistryItems).mock.calls[0]!;
			expect(options.config.typescript).toBe(false);
			expect(options.config.resolvedPaths.ui).toBe(path.join(cwd, "src/lib/components/ui"));
		});

		it("runs again without a tsconfig", async () => {
			// which an existing config is checked for
			writePackageJson({ svelte: "^5.0.0", tailwindcss: "^4.0.0" });
			const existing = {
				tailwind: { css: "src/app.css", baseColor: "zinc" },
				aliases: Object.fromEntries(
					aliases.map(([flag, alias]) => [
						flag!.slice(2, -"-alias".length),
						alias!.replace("$lib", "#lib"),
					])
				),
				typescript: false,
				// the same style, so that it doesn't look for components to reinstall
				style: decidedPresets.style,
				menuColor: decidedPresets.menuColor,
				menuAccent: decidedPresets.menuAccent,
			};
			fs.writeFileSync(path.join(cwd, "components.json"), JSON.stringify(existing));

			await runInitCommand(...subpathFlags);

			expect(p.cancel).not.toHaveBeenCalled();
			expect(items.addRegistryItems).toHaveBeenCalled();
		});
	});
});

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetAllMocks();
});
