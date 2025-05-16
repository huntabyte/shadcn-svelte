import color from "chalk";
import { getTsconfig } from "get-tsconfig";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod/v4";
import { ConfigError, error } from "./errors.js";
import { resolveImport } from "./resolve-imports.js";
import { syncSvelteKit } from "./sveltekit.js";
import { SITE_BASE_URL } from "../constants.js";
import { highlight } from "./utils.js";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "$lib/components";
export const DEFAULT_UTILS = "$lib/utils";
export const DEFAULT_HOOKS = "$lib/hooks";
export const DEFAULT_UI = "$lib/components/ui";
export const DEFAULT_LIB = "$lib";
export const DEFAULT_TAILWIND_CSS = "src/app.css";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";
export const DEFAULT_TYPESCRIPT = true;

const aliasSchema = (alias: string) =>
	z
		.string(`Missing aliases.${color.bold(`${alias}`)} alias`)
		.transform((v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, ""));

const baseConfigSchema = z.object({
	$schema: z.string().optional(),
	tailwind: z.object(
		{
			css: z.string(`Missing tailwind.${color.bold("css")} path`),
			baseColor: z.string(`Missing tailwind.${color.bold("baseColor")} field`),
			// cssVariables: z.boolean().default(true)
		},
		`Missing ${color.bold("tailwind")} object`
	),
	aliases: z.object(
		{
			components: aliasSchema("components"),
			utils: aliasSchema("utils"),
		},
		`Missing ${color.bold("aliases")} object`
	),
	typescript: z.boolean().default(true),
});

const originalConfigSchema = baseConfigSchema.extend({ style: z.string().optional() });

const newConfigSchema = baseConfigSchema.extend({
	aliases: baseConfigSchema.shape.aliases.extend({
		ui: aliasSchema("ui").default(DEFAULT_UI),
		hooks: aliasSchema("hooks").default(DEFAULT_HOOKS),
		lib: aliasSchema("lib").default(DEFAULT_LIB),
	}),
	registry: z.string().default(`${SITE_BASE_URL}/registry`),
});

export type RawConfig = z.infer<typeof rawConfigSchema>;
// combines the old with the new
export const rawConfigSchema = z.object({
	...originalConfigSchema.shape,
	...newConfigSchema.shape,
	aliases: z.object({
		...originalConfigSchema.shape.aliases.shape,
		...newConfigSchema.shape.aliases.shape,
	}),
});

export type Config = z.infer<typeof configSchema>;
export const configSchema = rawConfigSchema.extend({
	resolvedPaths: z.object({
		cwd: z.string(),
		tailwindCss: z.string(),
		utils: z.string(),
		components: z.string(),
		hooks: z.string(),
		ui: z.string(),
		lib: z.string(),
	}),
});

export async function getConfig(cwd: string) {
	const config = getRawConfig(cwd);

	if (!config) return null;

	return await resolveConfigPaths(cwd, config);
}

function getRawConfig(cwd: string): RawConfig | null {
	const configPath = path.resolve(cwd, "components.json");
	if (!fs.existsSync(configPath)) return null;

	try {
		const configResult = fs.readFileSync(configPath, { encoding: "utf8" });
		const config = JSON.parse(configResult);
		return rawConfigSchema.parse(config);
	} catch (e) {
		if (!(e instanceof z.ZodError)) throw e;
		const formatted = `Errors:\n- ${color.redBright(e.issues.map((i) => i.message).join("\n- "))}`;
		throw new ConfigError(
			`Invalid configuration found in ${highlight(configPath)}.\n\n${formatted}`
		);
	}
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await syncSvelteKit(cwd);

	const tsconfigType = config.typescript ? "tsconfig.json" : "jsconfig.json";
	const pathAliases = getTSConfig(cwd, tsconfigType);

	if (pathAliases === null) {
		throw error(
			`Missing ${highlight("paths")} field in your ${highlight(tsconfigType)} for path aliases. See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}`
		);
	}

	const stripTrailingSlash = (s: string) => (s.endsWith("/") ? s.slice(0, -1) : s);
	for (const [alias, path] of Object.entries(config.aliases)) {
		// @ts-expect-error simmer down
		config.aliases[alias] = stripTrailingSlash(path);
	}

	let utilsPath = resolveImport(config.aliases.utils, pathAliases);
	let componentsPath = resolveImport(config.aliases.components, pathAliases);
	let hooksPath = resolveImport(config.aliases.hooks, pathAliases);
	let uiPath = resolveImport(config.aliases.ui, pathAliases);
	let libPath = resolveImport(config.aliases.lib, pathAliases);

	const aliasError = (type: string, alias: string) =>
		new ConfigError(
			`Invalid import alias found: (${highlight(`"${type}": "${alias}"`)}) in ${highlight("components.json")}.
   - Import aliases ${color.underline("must use")} existing path aliases defined in your ${highlight(tsconfigType)} (e.g. "${type}": "$lib/${type}").
   - See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}.`
		);

	if (utilsPath === undefined) throw aliasError("utils", config.aliases.utils);
	if (componentsPath === undefined) throw aliasError("components", config.aliases.components);
	if (hooksPath === undefined) throw aliasError("hooks", config.aliases.hooks);
	if (uiPath === undefined) throw aliasError("ui", config.aliases.ui);
	if (libPath === undefined) throw aliasError("lib", config.aliases.lib);

	utilsPath = path.normalize(utilsPath);
	componentsPath = path.normalize(componentsPath);
	hooksPath = path.normalize(hooksPath);
	uiPath = path.normalize(uiPath);
	libPath = path.normalize(libPath);

	return configSchema.parse({
		...config,
		resolvedPaths: {
			cwd,
			tailwindCss: path.resolve(cwd, config.tailwind.css),
			utils: utilsPath,
			components: componentsPath,
			hooks: hooksPath,
			ui: uiPath,
			lib: libPath,
		},
	});
}

export function getTSConfig(cwd: string, tsconfigName: "tsconfig.json" | "jsconfig.json") {
	const parsedConfig = getTsconfig(path.resolve(cwd, "package.json"), tsconfigName);
	if (parsedConfig === null) {
		throw error(
			`Failed to find ${highlight(tsconfigName)}. See: ${color.underline(`${SITE_BASE_URL}/docs/installation#opt-out-of-typescript`)}`
		);
	}

	return parsedConfig;
}

export function writeConfig(cwd: string, config: RawConfig): void {
	const targetPath = path.resolve(cwd, "components.json");
	const conf = newConfigSchema.parse(config);
	fs.writeFileSync(targetPath, JSON.stringify(conf, null, "\t") + "\n", "utf8");
}
