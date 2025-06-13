import color from "picocolors";
import { getTsconfig } from "get-tsconfig";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod/v4";
import { highlight, stripTrailingSlash } from "./utils.js";
import { SITE_BASE_URL } from "../constants.js";
import { ConfigError, error } from "./errors.js";
import { resolveImportAlias } from "./resolve-imports.js";
import { isUsingSvelteKit, syncSvelteKit } from "./sveltekit.js";

export const DEFAULT_CONFIG = {
	$schema: `${SITE_BASE_URL}/schema.json`,
	aliases: {
		lib: "$lib",
		utils: "$lib/utils",
		hooks: "$lib/hooks",
		components: "$lib/components",
		ui: "$lib/components/ui",
	},
	tailwind: {
		baseColor: "slate",
		css: "src/app.css",
	},
	typescript: true,
	registry: `${SITE_BASE_URL}/registry`,
} as const;

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
		.union(
			[
				z.boolean(),
				z.object({
					// config: z.string(`Missing path to ${color.bold("tsconfig/jsconfig")}`),
					// Not sure why, but I can't get the above error msg to appear during zod parsing
					// when `typescript` is set to an empty object: `"typescript": {}`
					// Possibly a zod bug with unions?
					config: z.string(),
				}),
			],
			`Invalid ${color.bold("typescript")} field. Must either be 'true', 'false', or '{ "config": "path/to/tsconfig.json" }'`
		)
		.default(DEFAULT_CONFIG.typescript),
});

const originalConfigSchema = baseConfigSchema.extend({ style: z.string().optional() });

const newConfigSchema = baseConfigSchema.extend({
	aliases: baseConfigSchema.shape.aliases.extend({
		ui: aliasSchema("ui").default(DEFAULT_CONFIG.aliases.ui),
		hooks: aliasSchema("hooks").default(DEFAULT_CONFIG.aliases.hooks),
		lib: aliasSchema("lib").default(DEFAULT_CONFIG.aliases.lib),
	}),
	registry: z.string().default(DEFAULT_CONFIG.registry),
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

export type ResolvedConfig = z.infer<typeof resolvedConfigSchema>;
export const resolvedConfigSchema = rawConfigSchema.extend({
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

export async function getConfig(cwd: string): Promise<ResolvedConfig | undefined> {
	const config = loadConfig(cwd);
	if (!config) return;

	return await resolveConfig(cwd, config);
}

export async function resolveConfig(cwd: string, config: RawConfig): Promise<ResolvedConfig> {
	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await syncSvelteKit(cwd);

	const tsconfig = resolveTSConfig(cwd, config);

	const tsconfigFilename = path.basename(tsconfig.path);
	if (!tsconfig.config.compilerOptions?.paths) {
		throw error(
			`Missing ${highlight("paths")} field in your ${highlight(tsconfigFilename)} for path aliases. See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}`
		);
	}

	const aliasError = (type: string, alias: string) =>
		new ConfigError(
			`Invalid import alias found: (${highlight(`"${type}": "${alias}"`)}) in ${highlight("components.json")}.
   - Import aliases ${color.underline("must use")} existing path aliases defined in your ${highlight(tsconfigFilename)} (e.g. "${type}": "$lib/${type}").
   - See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}.`
		);

	const resolvedPaths: Record<string, string> = {
		cwd,
		tailwindCss: path.resolve(cwd, config.tailwind.css),
	};

	for (const [alias, aliasPath] of Object.entries(config.aliases)) {
		const resolvedPath = resolveImportAlias({ cwd, importPath: aliasPath, tsconfig });
		if (!resolvedPath) throw aliasError(alias, aliasPath);
		resolvedPaths[alias] = path.normalize(resolvedPath);
	}

	const sveltekit = isUsingSvelteKit(cwd);

	return resolvedConfigSchema.parse({ ...config, sveltekit, resolvedPaths });
}

export function loadConfig(cwd: string): RawConfig | undefined {
	const configPath = path.resolve(cwd, "components.json");
	if (!fs.existsSync(configPath)) return;

	try {
		const configResult = fs.readFileSync(configPath, { encoding: "utf8" });
		const config = JSON.parse(configResult);
		return rawConfigSchema.parse(config);
	} catch (e) {
		if (!(e instanceof z.ZodError)) throw e;
		const formatted = z.prettifyError(e);
		throw new ConfigError(
			`Invalid configuration found in ${highlight(configPath)}.\n\n${formatted}`
		);
	}
}

export function writeConfig(cwd: string, config: RawConfig): void {
	const targetPath = path.resolve(cwd, "components.json");
	const conf = newConfigSchema.parse(config, { jitless: true }); // `jitless` to retain the property order
	fs.writeFileSync(targetPath, JSON.stringify(conf, null, "\t") + "\n", "utf8");
}

type TSConfigName = "tsconfig.json" | "jsconfig.json" | (string & {});
export function resolveTSConfig(cwd: string, config: RawConfig) {
	let tsconfig;
	let tsconfigType: TSConfigName;
	if (typeof config.typescript === "object") {
		const tsconfigPath = path.resolve(cwd, config.typescript.config);
		tsconfigType = path.basename(tsconfigPath);
		tsconfig = getTsconfig(tsconfigPath, tsconfigType);
	} else {
		tsconfigType = config.typescript ? "tsconfig.json" : "jsconfig.json";
		tsconfig = getTsconfig(path.resolve(cwd, "package.json"), tsconfigType);
	}

	if (!tsconfig) {
		let msg = `Failed to find a ${highlight(tsconfigType)} file. `;

		if (config.typescript)
			msg += `See: ${color.underline(`${SITE_BASE_URL}/docs/components-json#typescript`)}`;
		else
			msg += `See: ${color.underline(`${SITE_BASE_URL}/docs/installation#opt-out-of-typescript`)}`;

		throw error(msg);
	}

	return tsconfig;
}
