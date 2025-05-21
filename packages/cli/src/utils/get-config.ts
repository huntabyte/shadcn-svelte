import color from "chalk";
import { getTsconfig } from "get-tsconfig";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod/v4";
import { highlight } from "./utils.js";
import { SITE_BASE_URL } from "../constants.js";
import { ConfigError, error } from "./errors.js";
import { resolveImport } from "./resolve-imports.js";
import { isUsingSvelteKit, syncSvelteKit } from "./sveltekit.js";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "$lib/components";
export const DEFAULT_UTILS = "$lib/utils";
export const DEFAULT_HOOKS = "$lib/hooks";
export const DEFAULT_UI = "$lib/components/ui";
export const DEFAULT_LIB = "$lib";
export const DEFAULT_TAILWIND_CSS = "src/app.css";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";
export const DEFAULT_TYPESCRIPT = true;

const stripTrailingSlash = (s: string) => (s.endsWith("/") ? s.slice(0, -1) : s);

const aliasSchema = (alias: string) =>
	z
		.string(`Missing aliases.${color.bold(`${alias}`)} alias`)
		.transform((v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, ""))
		// trailing slashes are stripped for an easier alias replacement during transformation
		.transform((v) => stripTrailingSlash(v));

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
	typescript: z
		.union([
			z.boolean(),
			z.object({ config: z.string(`Missing path to ${color.bold("tsconfig/jsconfig")}`) }),
		])
		.default(true),
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
	sveltekit: z.boolean(),
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

	let tsconfig;
	let tsconfigType: TSConfigName;
	if (typeof config.typescript === "object") {
		const tsconfigPath = path.resolve(cwd, config.typescript.config);
		tsconfigType = path.basename(tsconfigPath);
		tsconfig = resolveTSConfig(tsconfigPath);
	} else {
		tsconfigType = config.typescript ? "tsconfig.json" : "jsconfig.json";
		tsconfig = resolveTSConfig(path.resolve(cwd, "package.json"), tsconfigType);
	}

	if (!tsconfig) {
		throw error(
			`Failed to find ${highlight(tsconfigType)}. See: ${color.underline(`${SITE_BASE_URL}/docs/installation#opt-out-of-typescript`)}`
		);
	}

	if (!tsconfig.config.compilerOptions?.paths) {
		throw error(
			`Missing ${highlight("paths")} field in your ${highlight(tsconfigType)} for path aliases. See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}`
		);
	}

	const aliasError = (type: string, alias: string) =>
		new ConfigError(
			`Invalid import alias found: (${highlight(`"${type}": "${alias}"`)}) in ${highlight("components.json")}.
   - Import aliases ${color.underline("must use")} existing path aliases defined in your ${highlight(tsconfigType)} (e.g. "${type}": "$lib/${type}").
   - See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}.`
		);

	const resolvedPaths: Record<string, string> = {
		cwd,
		tailwindCss: path.resolve(cwd, config.tailwind.css),
	};

	for (const [alias, aliasPath] of Object.entries(config.aliases)) {
		const resolvedPath = resolveImport(aliasPath, tsconfig);
		if (!resolvedPath) throw aliasError(alias, aliasPath);
		resolvedPaths[alias] = path.normalize(resolvedPath);
	}

	const sveltekit = isUsingSvelteKit(cwd);

	return configSchema.parse({ ...config, sveltekit, resolvedPaths });
}

type TSConfigName = "tsconfig.json" | "jsconfig.json" | (string & {});
export function resolveTSConfig(
	targetPath: string,
	tsconfigName: TSConfigName = path.basename(targetPath)
) {
	const parsedConfig = getTsconfig(targetPath, tsconfigName) ?? undefined;
	return parsedConfig;
}

export function writeConfig(cwd: string, config: RawConfig): void {
	const targetPath = path.resolve(cwd, "components.json");
	const conf = newConfigSchema.parse(config, { jitless: true }); // `jitless` to retain the property order
	fs.writeFileSync(targetPath, JSON.stringify(conf, null, "\t") + "\n", "utf8");
}
