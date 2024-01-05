import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import { execa } from "execa";
import { parseNative } from "tsconfck";
import * as z from "zod";
import { find } from "./find-tsconfig";
import { isUsingSvelteKit } from "./get-package-info";
import { getPackageManager } from "./get-package-manager";
import { logger } from "./logger";
import { resolveImport } from "./resolve-imports";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "$lib/components";
export const DEFAULT_UTILS = "$lib/utils";
export const DEFAULT_TAILWIND_CSS = "src/app.pcss";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.cjs";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";

export const rawConfigSchema = z
	.object({
		$schema: z.string().optional(),
		style: z.string(),
		tailwind: z.object({
			config: z.string(),
			css: z.string(),
			baseColor: z.string()
			// cssVariables: z.boolean().default(true)
		}),
		aliases: z.object({
			components: z
				.string()
				.transform((v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, "")),
			utils: z.string().transform((v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, ""))
		})
	})
	.strict();

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
	resolvedPaths: z.object({
		tailwindConfig: z.string(),
		tailwindCss: z.string(),
		utils: z.string(),
		components: z.string()
	})
});

export type Config = z.infer<typeof configSchema>;

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
		await execa(
			packageManager === "npm" ? "npx" : packageManager,
			["svelte-kit", "sync"],
			{
				cwd
			}
		);
	}

	const tsconfigPath = await find(path.resolve(cwd, "package.json"), { root: cwd });
	if (tsconfigPath === null)
		throw new Error(`Failed to find ${logger.highlight("tsconfig.json")}.`);

	const parsedConfig = await parseNative(tsconfigPath);

	const absoluteBaseUrl: string | undefined = parsedConfig.result.options.pathsBasePath;
	let paths: Record<string, string[]> | undefined = parsedConfig.result.options.paths;

	if (absoluteBaseUrl === undefined || paths === undefined) {
		throw new Error(
			`Specify a ${logger.highlight("paths")} field in your ${logger.highlight(
				"tsconfig.json"
			)} and define your path aliases. \n\nSee: ${chalk.green(
				"https://www.shadcn-svelte.com/docs/installation#setup-path-aliases"
			)}`
		);
	}

	const importOpts = {
		absoluteBaseUrl,
		paths
	};
	const utilsPath = await resolveImport(config.aliases.utils, importOpts);
	const componentsPath = await resolveImport(config.aliases.components, importOpts);

	return configSchema.parse({
		...config,
		resolvedPaths: {
			tailwindConfig: path.resolve(cwd, config.tailwind.config),
			tailwindCss: path.resolve(cwd, config.tailwind.css),
			utils: utilsPath,
			components: componentsPath
		}
	});
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
	const configPath = path.resolve(cwd, "components.json");
	try {
		const configResult = await fs
			.readFile(configPath, {
				encoding: "utf8"
			})
			.catch((e) => null);

		// no predefined config exists
		if (!configResult) {
			return null;
		}

		const config = JSON.parse(configResult);

		return rawConfigSchema.parse(config);
	} catch (error) {
		throw new Error(
			`Invalid configuration found in ${logger.highlight(configPath)}.`
		);
	}
}
