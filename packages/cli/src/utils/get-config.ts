import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { execa } from "execa";
import { loadConfig } from "tsconfig-paths";
import * as z from "zod";
import { getPackageManager } from "./get-package-manager";
import { resolveImport } from "./resolve-imports";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "$lib/components";
export const DEFAULT_UTILS = "$lib/utils";
export const DEFAULT_TAILWIND_CSS = "src/app.postcss";
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
			utils: z
				.string()
				.transform((v) => v.replace(/[\u{0080}-\u{FFFF}]/gu, ""))
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
	const TSCONFIG_PATH = ".svelte-kit/tsconfig.json";
	if (!existsSync(TSCONFIG_PATH)) {
		const packageManager = await getPackageManager(cwd);
		await execa(
			packageManager === "npm" ? "npx" : packageManager,
			["svelte-kit", "sync"],
			{
				cwd
			}
		);
	}

	const tsconfigPath = path.resolve(cwd, TSCONFIG_PATH);
	const tsConfig = loadConfig(tsconfigPath);

	if (tsConfig.resultType === "failed") {
		throw new Error(
			`Failed to load .svelte-kit/tsconfig.json. Error: ${
				tsConfig.message ?? ""
			}`.trim()
		);
	}

	const utilsPath = await resolveImport(config.aliases["utils"], tsConfig);
	const componentsPath = await resolveImport(
		config.aliases["components"],
		tsConfig
	);

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

async function getRawConfig(cwd: string): Promise<RawConfig | null> {
	try {
		const configPath = path.resolve(cwd, "components.json");
		const configResult = await readFile(configPath, {
			encoding: "utf8"
		}).catch((e) => null);

		// no predefined config exists
		if (!configResult) {
			return null;
		}

		const config = JSON.parse(configResult);

		return rawConfigSchema.parse(config);
	} catch (error) {
		throw new Error(
			`Invalid configuration found in ${cwd}/components.json.`
		);
	}
}
