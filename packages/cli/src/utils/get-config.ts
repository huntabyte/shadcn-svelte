import { promises as fs } from "node:fs";
import path from "node:path";
import color from "chalk";
import { execa } from "execa";
import { parseNative } from "tsconfck";
import * as v from "valibot";
import { find } from "./find-tsconfig.js";
import { isUsingSvelteKit } from "./get-package-info.js";
import { getPackageManager } from "./get-package-manager.js";
import { resolveImport } from "./resolve-imports.js";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "$lib/components";
export const DEFAULT_UTILS = "$lib/utils";
export const DEFAULT_TAILWIND_CSS = "src/app.pcss";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.cjs";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";
export const DEFAULT_TYPESCRIPT = true;

const highlight = (...args: unknown[]) => color.bold.cyan(...args);

export const rawConfigSchema = v.object({
	$schema: v.optional(v.string()),
	style: v.string(),
	tailwind: v.object({
		config: v.string(),
		css: v.string(),
		baseColor: v.string(),
		// cssVariables: v.boolean().default(true)
	}),
	aliases: v.object({
		components: v.transform(v.string(), (v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, "")),
		utils: v.transform(v.string(), (v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, "")),
	}),
	typescript: v.optional(v.boolean(), true),
});

export type RawConfig = v.Output<typeof rawConfigSchema>;

export const configSchema = v.merge([
	rawConfigSchema,
	v.object({
		resolvedPaths: v.object({
			tailwindConfig: v.string(),
			tailwindCss: v.string(),
			utils: v.string(),
			components: v.string(),
		}),
	}),
]);

export type Config = v.Output<typeof configSchema>;

export async function getConfig(cwd: string) {
	const config = await getRawConfig(cwd);

	if (!config) {
		return null;
	}

	return await resolveConfigPaths(cwd, config);
}

export async function getAliases() {
	const SVELTE_CONFIG_PATH = path.resolve(process.cwd(), "svelte.config.js");
	const IMPORT_SVELTE_CONFIG_PATH = "file://" + SVELTE_CONFIG_PATH;

	const { default: svelteConfig } = await import(IMPORT_SVELTE_CONFIG_PATH);

	const aliases: Record<string, string> | undefined = svelteConfig.kit.alias;

	return aliases;
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		const packageManager = await getPackageManager(cwd);
		await execa(packageManager === "npm" ? "npx" : packageManager, ["svelte-kit", "sync"], {
			cwd,
		});
	}

	const tsconfigPath = await find(path.resolve(cwd, "package.json"), { root: cwd });

	if (tsconfigPath === null) {
		const configToFind = config.typescript ? "tsconfig.json" : "jsconfig.json";
		throw new Error(`Failed to find ${highlight(configToFind)}.`);
	}

	const parsedConfig = await parseNative(tsconfigPath);

	const absoluteBaseUrl: string | undefined = parsedConfig.result.options.pathsBasePath;
	let paths: Record<string, string[]> | undefined = parsedConfig.result.options.paths;

	if (absoluteBaseUrl === undefined || paths === undefined) {
		throw new Error(
			`Specify a ${highlight("paths")} field in your ${highlight(
				"tsconfig.json"
			)} and define your path aliases. \n\nSee: ${color.green(
				"https://www.shadcn-svelte.com/docs/installation#setup-path-aliases"
			)}`
		);
	}

	const importOpts = {
		absoluteBaseUrl,
		paths,
	};
	const utilsPath = await resolveImport(config.aliases.utils, importOpts);
	const componentsPath = await resolveImport(config.aliases.components, importOpts);

	return v.parse(configSchema, {
		...config,
		resolvedPaths: {
			tailwindConfig: path.resolve(cwd, config.tailwind.config),
			tailwindCss: path.resolve(cwd, config.tailwind.css),
			utils: utilsPath,
			components: componentsPath,
		},
	});
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
	const configPath = path.resolve(cwd, "components.json");
	try {
		const configResult = await fs
			.readFile(configPath, {
				encoding: "utf8",
			})
			.catch((e) => null);

		// no predefined config exists
		if (!configResult) {
			return null;
		}

		const config = JSON.parse(configResult);

		return v.parse(rawConfigSchema, config);
	} catch (error) {
		throw new Error(`Invalid configuration found in ${highlight(configPath)}.`);
	}
}
