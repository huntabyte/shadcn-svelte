import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import color from "chalk";
import * as v from "valibot";
import { Command, type Option, type OptionValues } from "commander";
import { execa } from "execa";
import * as cliConfig from "../utils/get-config.js";
import type { Config } from "../utils/get-config.js";
import { getPackageManager } from "../utils/get-package-manager.js";
import { error, handleError } from "../utils/errors.js";
import { getBaseColors, getRegistryBaseColor, getStyles } from "../utils/registry";
import * as templates from "../utils/templates.js";
import * as p from "../utils/prompts.js";
import { intro } from "../utils/prompt-helpers.js";
import { resolveImport } from "../utils/resolve-imports.js";
import { syncSvelteKit } from "../utils/sveltekit.js";
import { detectConfigs } from "../utils/auto-detect.js";

const PROJECT_DEPENDENCIES = ["tailwind-variants", "clsx", "tailwind-merge"] as const;
const highlight = (...args: unknown[]) => color.bold.cyan(...args);

const baseColors = getBaseColors();
const styles = getStyles();

export const init = new Command()
	.command("init")
	.description("initialize your project and install dependencies")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.option("-ts, --typescript", `use TypeScript`)
	.addOption(
		new Option("-s, --style <name>", "the style").choices(styles.map((style) => style.name))
	)
	.addOption(
		new Option("-bc, --base-color <name>", "the base color for the components").choices(
			baseColors.map((color) => color.name)
		)
	)
	.option("-gc, --global-css <path>", "path to the global css file")
	.option("-tc, --tailwind-config <path>", "path to the tailwind config file")
	.option("-ca, --component-alias <path>", "import alias for components")
	.option("-ua, --utils-alias <path>", "import alias for utils")
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
			const config = await promptForConfig(cwd, existingConfig, options);

			await runInit(cwd, config);

			p.outro(`${color.green("Success!")} Project initialization completed.`);
		} catch (e) {
			handleError(e);
		}
	});

async function promptForConfig(cwd: string, defaultConfig: Config | null, options: OptionValues) {
	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await syncSvelteKit(cwd);

	const detectedConfigs = detectConfigs(cwd, { relative: true });

	let typescript = options.typescript;

	if (options.typescript === undefined) {
		typescript = await p.confirm({
			message: `Would you like to use ${highlight("TypeScript")}? ${color.gray("(recommended)")}`,
			initialValue: defaultConfig?.typescript ?? cliConfig.DEFAULT_TYPESCRIPT,
		});
		if (p.isCancel(typescript)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}
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

	// -- get style --

	let style: string | symbol | undefined = styles.find(
		(style) => style.name === options.style
	)?.name;

	if (style === undefined) {
		style = await p.select({
			message: `Which ${highlight("style")} would you like to use?`,
			initialValue: defaultConfig?.style ?? cliConfig.DEFAULT_STYLE,
			options: styles.map((style) => ({
				label: style.label,
				value: style.name,
			})),
		});
	}

	if (p.isCancel(style)) {
		p.cancel("Operation cancelled.");
		process.exit(0);
	}

	// -- get base color --

	let tailwindBaseColor: string | symbol | undefined = baseColors.find(
		(color) => color.name === options.baseColor
	)?.name;

	if (tailwindBaseColor === undefined) {
		tailwindBaseColor = await p.select({
			message: `Which ${highlight("base color")} would you like to use?`,
			initialValue: defaultConfig?.tailwind.baseColor ?? cliConfig.DEFAULT_TAILWIND_BASE_COLOR,
			options: baseColors.map((color) => ({
				label: color.label,
				value: color.name,
			})),
		});
	}

	if (p.isCancel(tailwindBaseColor)) {
		p.cancel("Operation cancelled.");
		process.exit(0);
	}

	// -- get global css file --

	let globalCss: string | undefined = options.globalCss;

	if (globalCss === undefined || !existsSync(path.resolve(cwd, globalCss))) {
		if (globalCss !== undefined) {
			throw error(`"${color.bold(globalCss)}" does not exist. Please enter a valid path.`);
		}

		const promptResult = await p.text({
			message: `Where is your ${highlight("global CSS")} file? ${color.gray("(this file will be overwritten)")}`,
			initialValue:
				defaultConfig?.tailwind.css ?? detectedConfigs.cssPath ?? cliConfig.DEFAULT_TAILWIND_CSS,
			placeholder: detectedConfigs.cssPath ?? cliConfig.DEFAULT_TAILWIND_CSS,
			validate: (value) => {
				if (value && existsSync(path.resolve(cwd, value))) {
					return;
				}
				return `"${color.bold(value)}" does not exist. Please enter a valid path.`;
			},
		});

		if (p.isCancel(promptResult)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		globalCss = promptResult;
	}

	// -- get tailwind config --

	let tailwindConfig: string | undefined = options.tailwindConfig;

	if (tailwindConfig === undefined || !existsSync(path.resolve(cwd, tailwindConfig))) {
		if (tailwindConfig !== undefined) {
			throw error(`"${color.bold(tailwindConfig)}" does not exist. Please enter a valid path.`);
		}

		const promptResult = await p.text({
			message: `Where is your ${highlight("Tailwind config")} located? ${color.gray("(this file will be overwritten)")}`,
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
		});

		if (p.isCancel(promptResult)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		tailwindConfig = promptResult;
	}

	// -- get component alias --

	let componentAlias: string | undefined = options.componentAlias;

	const importAliasValidationResult = componentAlias ? validateImportAlias(componentAlias) : "";

	if (componentAlias === undefined || typeof importAliasValidationResult == "string") {
		if (componentAlias !== undefined && typeof importAliasValidationResult == "string") {
			throw error(importAliasValidationResult);
		}

		const promptResult = await p.text({
			message: `Configure the import alias for ${highlight("components")}:`,
			initialValue: defaultConfig?.aliases.components ?? cliConfig.DEFAULT_COMPONENTS,
			placeholder: cliConfig.DEFAULT_COMPONENTS,
			validate: validateImportAlias,
		});

		if (p.isCancel(promptResult)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		componentAlias = promptResult;
	}

	// -- get utils alias --

	let utilsAlias: string | undefined = options.utilsAlias;

	const utilsAliasValidationResult = utilsAlias ? validateImportAlias(utilsAlias) : "";

	if (utilsAlias === undefined || typeof utilsAliasValidationResult == "string") {
		if (utilsAlias !== undefined && typeof utilsAliasValidationResult == "string") {
			throw error(utilsAliasValidationResult);
		}

		const promptResult = await p.text({
			message: `Configure the import alias for ${highlight("utils")}:`,
			initialValue:
				defaultConfig?.aliases.utils ??
				// infers the alias from `components`. if `components = @/comps` then suggest `utils = @/utils`
				`${componentAlias?.split("/").slice(0, -1).join("/")}/utils` ??
				cliConfig.DEFAULT_UTILS,
			placeholder: cliConfig.DEFAULT_UTILS,
			validate: validateImportAlias,
		});

		if (p.isCancel(promptResult)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		utilsAlias = promptResult;
	}

	const config = v.parse(cliConfig.rawConfigSchema, {
		$schema: "https://shadcn-svelte.com/schema.json",
		style,
		typescript,
		tailwind: {
			config: tailwindConfig,
			css: globalCss,
			baseColor: tailwindBaseColor,
		},
		aliases: {
			utils: utilsAlias,
			components: componentAlias,
		},
	});

	// Delete `tailwind.config.cjs` and rename to `.js`
	if (config.tailwind.config.endsWith(".cjs")) {
		p.log.info(`Your tailwind config has been renamed to ${highlight("tailwind.config.js")}.`);
		await fs.unlink(config.tailwind.config).catch(() => null);
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
			const { TS, JS } = templates.TAILWIND_CONFIG_WITH_VARIABLES;
			const tailwindConfigContent = config.resolvedPaths.tailwindConfig.endsWith(".ts") ? TS : JS;
			await fs.writeFile(config.resolvedPaths.tailwindConfig, tailwindConfigContent, "utf8");

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
