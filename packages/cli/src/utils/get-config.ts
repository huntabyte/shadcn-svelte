import fs from "node:fs";
import path from "node:path";
import color from "chalk";
import { getTsconfig } from "get-tsconfig";
import * as v from "valibot";
import { resolveImport } from "./resolve-imports.js";
import { syncSvelteKit } from "./sync-sveltekit.js";

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

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await syncSvelteKit(cwd);

	const tsconfigType = config.typescript ? "tsconfig.json" : "jsconfig.json";
	const pathAliases = getTSConfig(cwd, tsconfigType);

	if (pathAliases === null) {
		throw new Error(
			`Missing ${highlight("paths")} field in your ${highlight(tsconfigType)} for path aliases. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation/manual#configure-path-aliases")}`
		);
	}

	const utilsPath = resolveImport(config.aliases.utils, pathAliases);
	const componentsPath = resolveImport(config.aliases.components, pathAliases);

	const aliasError = (type: string, alias: string) =>
		new Error(
			`[components.json]: Invalid ${highlight(type)} import alias: ${highlight(alias)}. Import aliases ${color.underline("must use")} existing path aliases defined in your ${highlight(tsconfigType)}. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation/manual#configure-path-aliases")}.`
		);

	if (utilsPath === undefined) throw aliasError("utils", config.aliases.utils);
	if (componentsPath === undefined) throw aliasError("components", config.aliases.components);

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

export function getTSConfig(cwd: string, tsconfigName: "tsconfig.json" | "jsconfig.json") {
	const parsedConfig = getTsconfig(path.resolve(cwd, "package.json"), tsconfigName);
	if (parsedConfig === null) {
		throw new Error(
			`Failed to find ${highlight(tsconfigName)}. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation#opt-out-of-typescript")}`
		);
	}

	return parsedConfig;
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
	const configPath = path.resolve(cwd, "components.json");
	try {
		const configResult = await fs.promises
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
		throw new Error(`[components.json]: Invalid configuration found in ${highlight(configPath)}.`);
	}
}
