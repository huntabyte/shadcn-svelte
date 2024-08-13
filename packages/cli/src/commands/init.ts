import { existsSync, promises as fs } from "node:fs";
import { EOL } from "node:os";
import path from "node:path";
import process from "node:process";
import { execa } from "execa";
import { Command, Option } from "commander";
import color from "chalk";
import * as v from "valibot";
import { type DetectLanguageResult, detectConfigs, detectLanguage } from "../utils/auto-detect.js";
import { handleDependencies } from "../utils/dependencies.js";
import { error, handleError } from "../utils/errors.js";
import type { Config } from "../utils/get-config.js";
import * as cliConfig from "../utils/get-config.js";
import { intro, prettifyList } from "../utils/prompt-helpers.js";
import * as p from "../utils/prompts.js";
import { getBaseColors, getRegistryBaseColor, getStyles } from "../utils/registry";
import { resolveImport } from "../utils/resolve-imports.js";
import { syncSvelteKit } from "../utils/sveltekit.js";
import * as templates from "../utils/templates.js";

const PROJECT_DEPENDENCIES = ["tailwind-variants", "clsx", "tailwind-merge"] as const;
const highlight = (...args: unknown[]) => color.bold.cyan(...args);

const baseColors = getBaseColors();
const styles = getStyles();

const initOptionsSchema = v.object({
	cwd: v.string(),
	style: v.optional(v.string()),
	baseColor: v.optional(v.string()),
	css: v.optional(v.string()),
	tailwindConfig: v.optional(v.string()),
	componentsAlias: v.optional(v.string()),
	utilsAlias: v.optional(v.string()),
	deps: v.boolean(),
});

type InitOptions = v.InferOutput<typeof initOptionsSchema>;

export const init = new Command()
	.command("init")
	.description("initialize your project and install dependencies")
	.option("-c, --cwd <cwd>", "the working directory", process.cwd())
	.option("--no-deps", "disable adding & installing dependencies")
	.addOption(
		new Option("--style <name>", "the style for the components").choices(
			styles.map((style) => style.name)
		)
	)
	.addOption(
		new Option("--base-color <name>", "the base color for the components").choices(
			baseColors.map((color) => color.name)
		)
	)
	.option("--css <path>", "path to the global CSS file")
	.option("--tailwind-config <path>", "path to the tailwind config file")
	.option("--components-alias <path>", "import alias for components")
	.option("--utils-alias <path>", "import alias for utils")
	.action(async (opts) => {
		intro();
		const options = v.parse(initOptionsSchema, opts);
		const cwd = path.resolve(options.cwd);

		try {
			// Ensure target directory exists.
			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			// Read config.
			const existingConfig = await cliConfig.getConfig(cwd);
			const config = await promptForConfig(cwd, existingConfig, options);

			await runInit(cwd, config, options);

			p.outro(`${color.green("Success!")} Project initialization completed.`);
		} catch (e) {
			handleError(e);
		}
	});

function validateOptions(cwd: string, options: InitOptions, langConfig: DetectLanguageResult) {
	if (options.css) {
		if (!existsSync(path.resolve(cwd, options.css))) {
			throw error(
				`The provided global CSS file path ${color.cyan(options.css)} does not exist. Please enter a valid path.`
			);
		}
	}

	if (options.tailwindConfig) {
		if (!existsSync(path.resolve(cwd, options.tailwindConfig))) {
			throw error(
				`The provided tailwind config file path ${color.cyan(options.tailwindConfig)} does not exist. Please enter a valid path.`
			);
		}
	}

	if (options.componentsAlias) {
		const validationResult = validateImportAlias(options.componentsAlias, langConfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}

	if (options.utilsAlias) {
		const validationResult = validateImportAlias(options.utilsAlias, langConfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}
}

async function promptForConfig(cwd: string, defaultConfig: Config | null, options: InitOptions) {
	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await syncSvelteKit(cwd);

	const detectedConfigs = detectConfigs(cwd, { relative: true });

	const langConfig = detectLanguage(cwd);
	if (langConfig === undefined) {
		throw error(
			`Failed to find a ${highlight("tsconfig.json")} or ${highlight("jsconfig.json")} file. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation#opt-out-of-typescript")}`
		);
	}

	// Validation for any paths provided by flags
	validateOptions(cwd, options, langConfig);

	// Styles
	let style = styles.find((style) => style.name === options.style)?.name;
	if (style === undefined) {
		const input = await p.select({
			message: `Which ${highlight("style")} would you like to use?`,
			initialValue: defaultConfig?.style ?? cliConfig.DEFAULT_STYLE,
			options: styles.map((style) => ({
				label: style.label,
				value: style.name,
			})),
		});

		if (p.isCancel(input)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		style = input;
	}

	// Base Color
	let tailwindBaseColor = baseColors.find((color) => color.name === options.baseColor)?.name;
	if (tailwindBaseColor === undefined) {
		const input = await p.select({
			message: `Which ${highlight("base color")} would you like to use?`,
			initialValue:
				defaultConfig?.tailwind.baseColor ?? cliConfig.DEFAULT_TAILWIND_BASE_COLOR,
			options: baseColors.map((color) => ({
				label: color.label,
				value: color.name,
			})),
		});

		if (p.isCancel(input)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		tailwindBaseColor = input;
	}

	// Global CSS File
	let globalCss = options.css;
	if (globalCss === undefined) {
		const input = await p.text({
			message: `Where is your ${highlight("global CSS")} file? ${color.gray("(this file will be overwritten)")}`,
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
		});

		if (p.isCancel(input)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		globalCss = input;
	}

	// Tailwind Config
	let tailwindConfig = options.tailwindConfig;
	if (tailwindConfig === undefined) {
		const input = await p.text({
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

		if (p.isCancel(input)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		tailwindConfig = input;
	}

	// Components Alias
	let componentAlias = options.componentsAlias;
	if (componentAlias === undefined) {
		const promptResult = await p.text({
			message: `Configure the import alias for ${highlight("components")}:`,
			initialValue: defaultConfig?.aliases.components ?? cliConfig.DEFAULT_COMPONENTS,
			placeholder: cliConfig.DEFAULT_COMPONENTS,
			validate: (value) => validateImportAlias(value, langConfig),
		});

		if (p.isCancel(promptResult)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		componentAlias = promptResult;
	}

	// Utils Alias
	let utilsAlias = options.utilsAlias;
	if (utilsAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("utils")}:`,
			initialValue:
				defaultConfig?.aliases.utils ??
				// infers the alias from `components`. if `components = @/comps` then suggest `utils = @/utils`
				`${componentAlias?.split("/").slice(0, -1).join("/")}/utils` ??
				cliConfig.DEFAULT_UTILS,
			placeholder: cliConfig.DEFAULT_UTILS,
			validate: (value) => validateImportAlias(value, langConfig),
		});

		if (p.isCancel(input)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		utilsAlias = input;
	}

	const config = v.parse(cliConfig.rawConfigSchema, {
		$schema: "https://shadcn-svelte.com/schema.json",
		style,
		typescript: langConfig.type === "tsconfig.json",
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

function validateImportAlias(alias: string, langConfig: DetectLanguageResult) {
	const resolvedPath = resolveImport(alias, langConfig.config);
	if (resolvedPath !== undefined) {
		return;
	}
	return `"${color.bold(alias)}" does not use an existing path alias defined in your ${color.bold(langConfig.type)}. See: ${color.underline("https://www.shadcn-svelte.com/docs/installation/manual#configure-path-aliases")}`;
}

export async function runInit(cwd: string, config: Config, options: InitOptions) {
	const tasks: p.Task[] = [];

	// Write to file.
	tasks.push({
		title: "Creating config file",
		async task() {
			const targetPath = path.resolve(cwd, "components.json");
			const conf = v.parse(cliConfig.rawConfigSchema, config); // inefficient, but it'll do
			await fs.writeFile(targetPath, JSON.stringify(conf, null, "\t"), "utf8");
			return `Config file ${highlight("components.json")} created`;
		},
	});

	// Initialize project
	tasks.push({
		title: "Initializing project",
		async task() {
			// Ensure all resolved paths directories exist.
			for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
				// Determine if the path is a file or directory.
				let dirname = path.extname(resolvedPath)
					? path.dirname(resolvedPath)
					: resolvedPath;

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
			const tailwindConfigContent = config.resolvedPaths.tailwindConfig.endsWith(".ts")
				? TS
				: JS;
			await fs.writeFile(config.resolvedPaths.tailwindConfig, tailwindConfigContent, "utf8");

			// Write css file.
			const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);
			if (baseColor) {
				await fs.writeFile(
					config.resolvedPaths.tailwindCss,
					baseColor.cssVarsTemplate,
					"utf8"
				);
			}

			const utilsPath = config.resolvedPaths.utils + (config.typescript ? ".ts" : ".js");
			const utilsTemplate = config.typescript ? templates.UTILS : templates.UTILS_JS;
			// Write cn file.
			await fs.writeFile(utilsPath, utilsTemplate, "utf8");

			return "Project initialized";
		},
	});

	// Install dependencies.
	if (options.deps) {
		const { packageManager, dependencies: missingDeps } = await handleDependencies(
			cwd,
			new Set(PROJECT_DEPENDENCIES)
		);

		tasks.push({
			title: `${highlight(packageManager)} Installing package dependencies`,
			enabled: missingDeps.length > 0,
			async task() {
				await execa(packageManager, ["add", ...missingDeps], {
					cwd,
				});
				return `Dependencies installed:${EOL}\t${color.gray(prettifyList(missingDeps))}`;
			},
		});
	}

	await p.tasks(tasks);

	if (!options.deps) {
		const prettyList = prettifyList([...PROJECT_DEPENDENCIES], 7);
		p.log.warn(
			`shadcn-svelte has been initialized ${color.bold.red("without")} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
