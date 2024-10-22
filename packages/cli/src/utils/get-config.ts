import color from "chalk";
import { getTsconfig } from "get-tsconfig";
import fs from "node:fs";
import path from "node:path";
import * as v from "valibot";
import { ConfigError, error } from "./errors.js";
import { resolveImport } from "./resolve-imports.js";
import { syncSvelteKit } from "./sveltekit.js";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "$lib/components";
export const DEFAULT_UTILS = "$lib/utils";
export const DEFAULT_HOOKS = "$lib/hooks";
export const DEFAULT_UI = "$lib/components/ui";
export const DEFAULT_TAILWIND_CSS = "src/app.css";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.ts";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";
export const DEFAULT_TYPESCRIPT = true;

const highlight = (...args: unknown[]) => color.bold.cyan(...args);

const aliasSchema = (alias: string) =>
	v.pipe(
		v.string(`Missing aliases.${color.bold(`${alias}`)} alias`),
		v.transform((v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, ""))
	);

const originalConfigSchema = v.object({
	$schema: v.optional(v.string()),
	style: v.string(`Missing ${color.bold("style")} field`),
	tailwind: v.object(
		{
			config: v.string(`Missing tailwind.${color.bold("config")} path`),
			css: v.string(`Missing tailwind.${color.bold("css")} path`),
			baseColor: v.string(`Missing tailwind.${color.bold("baseColor")} field`),
			// cssVariables: v.boolean().default(true)
		},
		`Missing ${color.bold("tailwind")} object`
	),
	aliases: v.object(
		{
			components: aliasSchema("components"),
			utils: aliasSchema("utils"),
		},
		`Missing ${color.bold("aliases")} object`
	),
});

// fields that were added after the fact so they must be optional so we can gracefully migrate
const newConfigFields = v.object({
	aliases: v.object({
		ui: v.optional(aliasSchema("ui"), DEFAULT_UI),
		hooks: v.optional(aliasSchema("hooks"), DEFAULT_HOOKS),
	}),
	typescript: v.optional(v.boolean(), true),
});

// combines the old with the new
export const rawConfigSchema = v.object({
	...originalConfigSchema.entries,
	...newConfigFields.entries,
	aliases: v.object({
		...originalConfigSchema.entries.aliases.entries,
		...newConfigFields.entries.aliases.entries,
	}),
});

export type RawConfig = v.InferOutput<typeof rawConfigSchema>;

export const configSchema = v.object({
	...rawConfigSchema.entries,
	...v.object({
		resolvedPaths: v.object({
			cwd: v.string(),
			tailwindConfig: v.string(),
			tailwindCss: v.string(),
			utils: v.string(),
			components: v.string(),
			hooks: v.string(),
			ui: v.string(),
		}),
	}).entries,
});

export type Config = v.InferOutput<typeof configSchema>;

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
		throw error(
			`Missing ${highlight("paths")} field in your ${highlight(tsconfigType)} for path aliases. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation/manual#configure-path-aliases")}`
		);
	}

	const utilsPath = resolveImport(config.aliases.utils, pathAliases);
	const componentsPath = resolveImport(config.aliases.components, pathAliases);
	const hooksPath = resolveImport(config.aliases.hooks, pathAliases);
	const uiPath = resolveImport(config.aliases.ui, pathAliases);

	const aliasError = (type: string, alias: string) =>
		new ConfigError(
			`Invalid import alias found: (${highlight(`"${type}": "${alias}"`)}) in ${highlight("components.json")}.
   - Import aliases ${color.underline("must use")} existing path aliases defined in your ${highlight(tsconfigType)} (e.g. "${type}": "$lib/${type}").
   - See: ${color.underline("https://www.shadcn-svelte.com/docs/installation/manual#configure-path-aliases")}.`
		);

	if (utilsPath === undefined) throw aliasError("utils", config.aliases.utils);
	if (componentsPath === undefined) throw aliasError("components", config.aliases.components);

	return v.parse(configSchema, {
		...config,
		resolvedPaths: {
			cwd,
			tailwindConfig: path.resolve(cwd, config.tailwind.config),
			tailwindCss: path.resolve(cwd, config.tailwind.css),
			utils: utilsPath,
			components: componentsPath,
			hooks: hooksPath,
			ui: uiPath,
		},
	});
}

export function getTSConfig(cwd: string, tsconfigName: "tsconfig.json" | "jsconfig.json") {
	const parsedConfig = getTsconfig(path.resolve(cwd, "package.json"), tsconfigName);
	if (parsedConfig === null) {
		throw error(
			`Failed to find ${highlight(tsconfigName)}. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation#opt-out-of-typescript")}`
		);
	}

	return parsedConfig;
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
	const configPath = path.resolve(cwd, "components.json");
	if (!fs.existsSync(configPath)) return null;

	try {
		const configResult = fs.readFileSync(configPath, { encoding: "utf8" });
		const config = JSON.parse(configResult);
		return v.parse(rawConfigSchema, config);
	} catch (e) {
		if (!(e instanceof v.ValiError)) throw e;
		const formatted = `Errors:\n- ${color.redBright(e.issues.map((i) => i.message).join("\n- "))}`;
		throw new ConfigError(
			`Invalid configuration found in ${highlight(configPath)}.\n\n${formatted}`
		);
	}
}
