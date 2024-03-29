import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import color from "chalk";
import * as v from "valibot";
import { Command } from "commander";
import { execa } from "execa";
import * as cliConfig from "../utils/get-config.js";
import type { Config } from "../utils/get-config.js";
import { getPackageManager } from "../utils/get-package-manager.js";
import { error, handleError } from "../utils/handle-error.js";
import { getRegistryBaseColor, getRegistryBaseColors, getRegistryStyles } from "../utils/registry";
import * as templates from "../utils/templates.js";
import * as p from "../utils/prompts.js";
import { intro } from "../utils/prompt-helpers.js";
import { resolveImport } from "../utils/resolve-imports.js";
import { syncSvelteKit } from "../utils/sync-sveltekit.js";
import { detectConfigs } from "../utils/auto-detect.js";

const PROJECT_DEPENDENCIES = ["tailwind-variants", "clsx", "tailwind-merge"] as const;
const highlight = (...args: unknown[]) => color.bold.cyan(...args);

export const init = new Command()
	.command("init")
	.description("initialize your project and install dependencies")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async (options) => {
		intro();
		const cwd = path.resolve(options.cwd);

		try {
			// Ensure target directory exists.
			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			// Read config.
			const existingConfig = await cliConfig.getConfig(cwd);
			const config = await promptForConfig(cwd, existingConfig);

			await runInit(cwd, config);

			p.outro(`${color.green("Success!")} Project initialization completed.`);
		} catch (e) {
			handleError(e);
		}
	});

async function promptForConfig(cwd: string, defaultConfig: Config | null) {
	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await syncSvelteKit(cwd);

	const styles = await getRegistryStyles();
	const baseColors = await getRegistryBaseColors();
	const detectedConfigs = detectConfigs(cwd, { relative: true });

	const typescript = await p.confirm({
		message: `Would you like to use ${highlight("TypeScript")} (recommended)?`,
		initialValue: defaultConfig?.typescript ?? cliConfig.DEFAULT_TYPESCRIPT,
	});
	if (p.isCancel(typescript)) {
		p.cancel("Operation cancelled.");
		process.exit(0);
	}

	const tsconfigName = typescript ? "tsconfig.json" : "jsconfig.json";
	// throws if the tsconfig is missing
	cliConfig.getTSConfig(cwd, tsconfigName);

	const validateImportAlias = (alias: string) => {
		const tsconfig = cliConfig.getTSConfig(cwd, tsconfigName);
		const resolvedPath = resolveImport(alias, tsconfig);
		if (resolvedPath !== undefined) {
			return;
		}
		return `"${color.bold(alias)}" does not use an existing path alias defined in your ${color.bold(tsconfigName)}. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation/manual#configure-path-aliases")}`;
	};

	const options = await p.group(
		{
			style: () =>
				p.select({
					message: `Which ${highlight("style")} would you like to use?`,
					initialValue: defaultConfig?.style ?? cliConfig.DEFAULT_STYLE,
					options: styles.map((style) => ({
						label: style.label,
						value: style.name,
					})),
				}),
			tailwindBaseColor: () =>
				p.select({
					message: `Which ${highlight("base color")} would you like to use?`,
					initialValue: defaultConfig?.tailwind.baseColor ?? cliConfig.DEFAULT_TAILWIND_BASE_COLOR,
					options: baseColors.map((color) => ({
						label: color.label,
						value: color.name,
					})),
				}),
			tailwindCss: () =>
				p.text({
					message: `Where is your ${highlight("global CSS")} file?`,
					initialValue:
						defaultConfig?.tailwind.css ??
						detectedConfigs.cssPath ??
						cliConfig.DEFAULT_TAILWIND_CSS,
					placeholder: detectedConfigs.cssPath ?? cliConfig.DEFAULT_TAILWIND_CSS,
					validate: (value) => {
						if (value && existsSync(path.resolve(cwd, value))) {
							return;
						}
						return `"${color.bold(value)}" does not exist. Please enter a valid path.`;
					},
				}),
			tailwindConfig: () =>
				p.text({
					message: `Where is your ${highlight("Tailwind config")} located?`,
					initialValue:
						defaultConfig?.tailwind.config ??
						detectedConfigs.tailwindPath ??
						cliConfig.DEFAULT_TAILWIND_CONFIG,
					placeholder: detectedConfigs.tailwindPath ?? cliConfig.DEFAULT_TAILWIND_CONFIG,
					validate: (value) => {
						if (value && existsSync(path.resolve(cwd, value))) {
							return;
						}
						return `"${color.bold(value)}" does not exist. Please enter a valid path.`;
					},
				}),
			components: () =>
				p.text({
					message: `Configure the import alias for ${highlight("components")}:`,
					initialValue: defaultConfig?.aliases["components"] ?? cliConfig.DEFAULT_COMPONENTS,
					placeholder: cliConfig.DEFAULT_COMPONENTS,
					validate: validateImportAlias,
				}),
			utils: () =>
				p.text({
					message: `Configure the import alias for ${highlight("utils")}:`,
					initialValue: defaultConfig?.aliases["utils"] ?? cliConfig.DEFAULT_UTILS,
					placeholder: cliConfig.DEFAULT_UTILS,
					validate: validateImportAlias,
				}),
		},
		{
			onCancel: () => {
				p.cancel("Operation cancelled.");
				process.exit(0);
			},
		}
	);

	const config = v.parse(cliConfig.rawConfigSchema, {
		$schema: "https://shadcn-svelte.com/schema.json",
		style: options.style,
		typescript: typescript,
		tailwind: {
			config: options.tailwindConfig,
			css: options.tailwindCss,
			baseColor: options.tailwindBaseColor,
		},
		aliases: {
			utils: options.utils,
			components: options.components,
		},
	});

	if (config.tailwind.config.endsWith(".cjs")) {
		p.log.info(`Your tailwind config has been renamed to ${highlight("tailwind.config.js")}.`);
		const renamedTailwindConfigPath = config.tailwind.config.replace(".cjs", ".js");
		config.tailwind.config = renamedTailwindConfigPath;
	}

	const configPaths = await cliConfig.resolveConfigPaths(cwd, config);
	return configPaths;
}

export async function runInit(cwd: string, config: Config) {
	// Write to file.
	const createConfig: p.Task = {
		title: "Creating config file",
		async task() {
			const targetPath = path.resolve(cwd, "components.json");
			const conf = v.parse(cliConfig.rawConfigSchema, config); // inefficient, but it'll do
			await fs.writeFile(targetPath, JSON.stringify(conf, null, "\t"), "utf8");
			return `Config file ${highlight("components.json")} created`;
		},
	};

	const init: p.Task = {
		title: "Initializing project",
		async task() {
			// Ensure all resolved paths directories exist.
			for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
				// Determine if the path is a file or directory.
				let dirname = path.extname(resolvedPath) ? path.dirname(resolvedPath) : resolvedPath;

				// If the utils alias is set to something like "@/lib/utils",
				// assume this is a file and remove the "utils" file name.
				// TODO: In future releases we should add support for individual utils.
				if (key === "utils" && resolvedPath.endsWith("/utils")) {
					// Remove /utils at the end.
					dirname = dirname.replace(/\/utils$/, "");
				}

				if (!existsSync(dirname) && key !== "utils") {
					await fs.mkdir(dirname, { recursive: true });
				}
			}

			// Write tailwind config.
			await fs.writeFile(
				config.resolvedPaths.tailwindConfig,
				templates.TAILWIND_CONFIG_WITH_VARIABLES,
				"utf8"
			);

			// Delete tailwind.config.cjs, if present
			const cjsConfig = config.resolvedPaths.tailwindConfig.replace(".js", ".cjs");
			if (cjsConfig.endsWith(".cjs")) await fs.unlink(cjsConfig).catch((e) => e); // throws when it DNE

			// Write css file.
			const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);
			if (baseColor) {
				await fs.writeFile(config.resolvedPaths.tailwindCss, baseColor.cssVarsTemplate, "utf8");
			}

			const utilsPath = config.resolvedPaths.utils + (config.typescript ? ".ts" : ".js");
			const utilsTemplate = config.typescript ? templates.UTILS : templates.UTILS_JS;
			// Write cn file.
			await fs.writeFile(utilsPath, utilsTemplate, "utf8");

			return "Project initialized";
		},
	};

	// Install dependencies.
	const installDeps: p.Task = {
		title: "Installing dependencies",
		async task() {
			const packageManager = await getPackageManager(cwd);

			await execa(packageManager, ["add", ...PROJECT_DEPENDENCIES], {
				cwd,
			});
			return "Dependencies installed";
		},
	};

	await p.tasks([createConfig, init, installDeps]);
}
