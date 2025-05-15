import color from "chalk";
import { Command, Option } from "commander";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import * as v from "valibot";
import {
	type DetectLanguageResult,
	detectConfigs,
	detectLanguage,
} from "../../utils/auto-detect.js";
import { error, handleError } from "../../utils/errors.js";
import type { Config } from "../../utils/get-config.js";
import * as cliConfig from "../../utils/get-config.js";
import { cancel, intro, prettifyList } from "../../utils/prompt-helpers.js";
import * as p from "@clack/prompts";
import * as registry from "../../utils/registry/index.js";
import { resolveImport } from "../../utils/resolve-imports.js";
import { syncSvelteKit } from "../../utils/sveltekit.js";
import { SITE_BASE_URL } from "../../constants.js";
import { preflightInit } from "./preflight.js";
import { addRegistryItems } from "../../utils/add-registry-items.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { highlight } from "../../utils/utils.js";
import { installDependencies } from "../../utils/install-deps.js";

const baseColors = registry.getBaseColors();

const initOptionsSchema = v.object({
	cwd: v.string(),
	baseColor: v.optional(v.string()),
	css: v.optional(v.string()),
	componentsAlias: v.optional(v.string()),
	utilsAlias: v.optional(v.string()),
	libAlias: v.optional(v.string()),
	hooksAlias: v.optional(v.string()),
	uiAlias: v.optional(v.string()),
	deps: v.boolean(),
	overwrite: v.boolean(),
	proxy: v.optional(v.string()),
});

type InitOptions = v.InferOutput<typeof initOptionsSchema>;

export const init = new Command()
	.command("init")
	.description("initialize your project and install dependencies")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-o, --overwrite", "overwrite existing files", false)
	.option("--no-deps", "disable adding & installing dependencies")
	.addOption(
		new Option("--base-color <name>", "the base color for the components").choices(
			baseColors.map((color) => color.name)
		)
	)
	.option("--css <path>", "path to the global CSS file")
	.option("--components-alias <path>", "import alias for components")
	.option("--lib-alias <path>", "import alias for lib")
	.option("--utils-alias <path>", "import alias for utils")
	.option("--hooks-alias <path>", "import alias for hooks")
	.option("--ui-alias <path>", "import alias for ui")
	.option("--proxy <proxy>", "fetch items from registry using a proxy", getEnvProxy())
	.action(async (opts) => {
		intro();
		const options = v.parse(initOptionsSchema, opts);
		const cwd = path.resolve(options.cwd);

		try {
			// Ensure target directory exists.
			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			preflightInit(cwd);

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

	if (options.libAlias) {
		const validationResult = validateImportAlias(options.libAlias, langConfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}

	if (options.componentsAlias) {
		const validationResult = validateImportAlias(options.componentsAlias, langConfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}

	if (options.uiAlias) {
		const validationResult = validateImportAlias(options.uiAlias, langConfig);
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

	if (options.hooksAlias) {
		const validationResult = validateImportAlias(options.hooksAlias, langConfig);
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
			`Failed to find a ${highlight("tsconfig.json")} or ${highlight("jsconfig.json")} file. See: ${color.underline(`${SITE_BASE_URL}/docs/installation#opt-out-of-typescript`)}`
		);
	}

	// Validation for any paths provided by flags
	validateOptions(cwd, options, langConfig);

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

		if (p.isCancel(input)) cancel();

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

		if (p.isCancel(input)) cancel();

		globalCss = input;
	}

	// Lib Alias
	let libAlias = options.libAlias;
	if (libAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("lib")}:`,
			initialValue: defaultConfig?.aliases.lib ?? "$lib",
			placeholder: cliConfig.DEFAULT_LIB,
			validate: (value) => validateImportAlias(value, langConfig),
		});

		if (p.isCancel(input)) cancel();

		libAlias = input;
	}

	// infers the alias from `lib`. if `lib = $lib` then suggest `alias = $lib/alias`
	const inferAlias = (alias: string) => `${libAlias}/${alias}`;

	// Components Alias
	let componentAlias = options.componentsAlias;
	if (componentAlias === undefined) {
		const promptResult = await p.text({
			message: `Configure the import alias for ${highlight("components")}:`,
			initialValue: defaultConfig?.aliases.components ?? inferAlias("components"),
			placeholder: cliConfig.DEFAULT_COMPONENTS,
			validate: (value) => validateImportAlias(value, langConfig),
		});

		if (p.isCancel(promptResult)) cancel();

		componentAlias = promptResult;
	}

	// Utils Alias
	let utilsAlias = options.utilsAlias;
	if (utilsAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("utils")}:`,
			initialValue: defaultConfig?.aliases.utils ?? inferAlias("utils"),
			placeholder: cliConfig.DEFAULT_UTILS,
			validate: (value) => validateImportAlias(value, langConfig),
		});

		if (p.isCancel(input)) cancel();

		utilsAlias = input;
	}

	// Hooks Alias
	let hooksAlias = options.hooksAlias;
	if (hooksAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("hooks")}:`,
			initialValue: defaultConfig?.aliases.hooks ?? inferAlias("hooks"),
			placeholder: cliConfig.DEFAULT_HOOKS,
			validate: (value) => validateImportAlias(value, langConfig),
		});

		if (p.isCancel(input)) cancel();

		hooksAlias = input;
	}

	// UI Alias
	let uiAlias = options.uiAlias;
	if (uiAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("ui")}:`,
			initialValue: defaultConfig?.aliases.ui ?? `${componentAlias}/ui`,
			placeholder: cliConfig.DEFAULT_UI,
			validate: (value) => validateImportAlias(value, langConfig),
		});

		if (p.isCancel(input)) cancel();

		uiAlias = input;
	}

	const config = v.parse(cliConfig.rawConfigSchema, {
		$schema: `${SITE_BASE_URL}/schema.json`,
		typescript: langConfig.type === "tsconfig.json",
		registry: defaultConfig?.registry,
		tailwind: {
			css: globalCss,
			baseColor: tailwindBaseColor,
		},
		aliases: {
			utils: utilsAlias,
			lib: libAlias,
			components: componentAlias,
			hooks: hooksAlias,
			ui: uiAlias,
		},
	});

	const configPaths = await cliConfig.resolveConfigPaths(cwd, config);
	return configPaths;
}

function validateImportAlias(alias: string, langConfig: DetectLanguageResult) {
	const resolvedPath = resolveImport(alias, langConfig.config);
	if (resolvedPath !== undefined) {
		return;
	}
	return `"${color.bold(alias)}" does not use an existing path alias defined in your ${color.bold(langConfig.type)}. See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}`;
}

export async function runInit(cwd: string, config: Config, options: InitOptions) {
	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}
	const registryUrl = registry.getRegistryUrl(config);

	const tasks: p.Task[] = [];

	// Write to file.
	tasks.push({
		title: "Creating config file",
		async task() {
			cliConfig.writeConfig(cwd, config);
			return `Config file ${highlight("components.json")} created`;
		},
	});

	tasks.push({
		title: "Validating alias paths",
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
			return `Alias paths validated`;
		},
	});

	// update stylesheet
	tasks.push({
		title: "Updating stylesheet",
		async task() {
			const baseColor = await registry.getRegistryBaseColor(
				registryUrl,
				config.tailwind.baseColor
			);
			const relative = path.relative(cwd, config.resolvedPaths.tailwindCss);
			await fs.writeFile(config.resolvedPaths.tailwindCss, baseColor.cssVarsTemplate, "utf8");
			return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
		},
	});

	const result = await addRegistryItems({
		selectedItems: ["init"],
		config,
		deps: options.deps,
		overwrite: options.overwrite,
	});

	tasks.push(...result.tasks);

	const installTask = await installDependencies({
		cwd,
		prompt: options.deps,
		dependencies: Array.from(result.dependencies),
		devDependencies: Array.from(result.devDependencies),
	});
	if (installTask) tasks.push(installTask);

	await p.tasks(tasks);

	if (!options.deps) {
		const prettyList = prettifyList([...result.skippedDeps], 7);
		p.log.warn(
			`shadcn-svelte has been initialized ${color.bold.red("without")} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
