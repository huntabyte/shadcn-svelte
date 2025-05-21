import color from "chalk";
import { Command, Option } from "commander";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { z } from "zod/v4";
import * as p from "@clack/prompts";
import { detectConfigs } from "../../utils/auto-detect.js";
import { error, handleError } from "../../utils/errors.js";
import type { ResolvedConfig } from "../../utils/get-config.js";
import * as cliConfig from "../../utils/get-config.js";
import { cancel, intro, prettifyList } from "../../utils/prompt-helpers.js";
import * as registry from "../../utils/registry/index.js";
import { resolveImport } from "../../utils/resolve-imports.js";
import { syncSvelteKit } from "../../utils/sveltekit.js";
import { SITE_BASE_URL } from "../../constants.js";
import { preflightInit } from "./preflight.js";
import { addRegistryItems } from "../../utils/add-registry-items.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { highlight } from "../../utils/utils.js";
import { installDependencies } from "../../utils/install-deps.js";
import type { TsConfigResult } from "get-tsconfig";

const baseColors = registry.getBaseColors();

const initOptionsSchema = z.object({
	cwd: z.string(),
	baseColor: z.string().optional(),
	css: z.string().optional(),
	componentsAlias: z.string().optional(),
	utilsAlias: z.string().optional(),
	libAlias: z.string().optional(),
	hooksAlias: z.string().optional(),
	uiAlias: z.string().optional(),
	deps: z.boolean(),
	overwrite: z.boolean(),
	proxy: z.string().optional(),
});

type InitOptions = z.infer<typeof initOptionsSchema>;

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
		const options = initOptionsSchema.parse(opts);
		const cwd = path.resolve(options.cwd);

		try {
			// Ensure target directory exists.
			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			preflightInit(cwd);

			// Read config.
			const existingConfig = cliConfig.getRawConfig(cwd);
			const config = await promptForConfig(cwd, existingConfig, options);

			await runInit(cwd, config, options);

			p.outro(`${color.green("Success!")} Project initialization completed.`);
		} catch (e) {
			handleError(e);
		}
	});

function validateOptions(cwd: string, options: InitOptions, tsconfig: TsConfigResult) {
	if (options.css) {
		if (!existsSync(path.resolve(cwd, options.css))) {
			throw error(
				`The provided global CSS file path ${color.cyan(options.css)} does not exist. Please enter a valid path.`
			);
		}
	}

	if (options.libAlias) {
		const validationResult = validateImportAlias(options.libAlias, tsconfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}

	if (options.componentsAlias) {
		const validationResult = validateImportAlias(options.componentsAlias, tsconfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}

	if (options.uiAlias) {
		const validationResult = validateImportAlias(options.uiAlias, tsconfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}

	if (options.utilsAlias) {
		const validationResult = validateImportAlias(options.utilsAlias, tsconfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}

	if (options.hooksAlias) {
		const validationResult = validateImportAlias(options.hooksAlias, tsconfig);
		if (validationResult) {
			throw error(validationResult);
		}
	}
}

async function promptForConfig(
	cwd: string,
	existingConfig: cliConfig.RawConfig | undefined,
	options: InitOptions
) {
	const config: cliConfig.RawConfig = existingConfig ?? structuredClone(cliConfig.DEFAULT_CONFIG);

	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await syncSvelteKit(cwd);

	const { cssPath, tsconfigPath } = detectConfigs(cwd, { relative: true });

	let tsconfig;
	if (existingConfig) {
		tsconfig = cliConfig.resolveTSConfig(cwd, existingConfig);
	} else {
		if (!tsconfigPath) {
			const input = await p.text({
				message: `Where is your ${highlight("tsconfig/jsconfig")} file?`,
				// initialValue: "tsconfig.json",
				placeholder: "tsconfig.json",
				validate: (value) => {
					const tsconfigPath = path.resolve(cwd, value);
					if (value && existsSync(tsconfigPath)) {
						return;
					}
					return `"${color.bold(value)}" does not exist. Please enter a valid path.`;
				},
			});

			if (p.isCancel(input)) cancel();

			config.typescript = { config: input };
		} else {
			config.typescript = tsconfigPath.includes("tsconfig");
		}

		tsconfig = cliConfig.resolveTSConfig(cwd, config);
	}

	// Validation for any paths provided by flags
	validateOptions(cwd, options, tsconfig);

	// Base Color
	let tailwindBaseColor = baseColors.find((color) => color.name === options.baseColor)?.name;
	if (tailwindBaseColor === undefined) {
		const input = await p.select({
			message: `Which ${highlight("base color")} would you like to use?`,
			initialValue:
				existingConfig?.tailwind.baseColor ?? cliConfig.DEFAULT_CONFIG.tailwind.baseColor,
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
		const cssDefault = cliConfig.DEFAULT_CONFIG.tailwind.css;
		const input = await p.text({
			message: `Where is your ${highlight("global CSS")} file? ${color.gray("(this file will be overwritten)")}`,
			initialValue: existingConfig?.tailwind.css ?? cssPath ?? cssDefault,
			placeholder: cssPath ?? cssDefault,
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
			initialValue: existingConfig?.aliases.lib ?? "$lib",
			placeholder: cliConfig.DEFAULT_CONFIG.aliases.lib,
			validate: (value) => validateImportAlias(value, tsconfig),
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
			initialValue: existingConfig?.aliases.components ?? inferAlias("components"),
			placeholder: cliConfig.DEFAULT_CONFIG.aliases.components,
			validate: (value) => validateImportAlias(value, tsconfig),
		});

		if (p.isCancel(promptResult)) cancel();

		componentAlias = promptResult;
	}

	// UI Alias
	let uiAlias = options.uiAlias;
	if (uiAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("ui")}:`,
			initialValue: existingConfig?.aliases.ui ?? `${componentAlias}/ui`,
			placeholder: cliConfig.DEFAULT_CONFIG.aliases.ui,
			validate: (value) => validateImportAlias(value, tsconfig),
		});

		if (p.isCancel(input)) cancel();

		uiAlias = input;
	}

	// Utils Alias
	let utilsAlias = options.utilsAlias;
	if (utilsAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("utils")}:`,
			initialValue: existingConfig?.aliases.utils ?? inferAlias("utils"),
			placeholder: cliConfig.DEFAULT_CONFIG.aliases.utils,
			validate: (value) => validateImportAlias(value, tsconfig),
		});

		if (p.isCancel(input)) cancel();

		utilsAlias = input;
	}

	// Hooks Alias
	let hooksAlias = options.hooksAlias;
	if (hooksAlias === undefined) {
		const input = await p.text({
			message: `Configure the import alias for ${highlight("hooks")}:`,
			initialValue: existingConfig?.aliases.hooks ?? inferAlias("hooks"),
			placeholder: cliConfig.DEFAULT_CONFIG.aliases.hooks,
			validate: (value) => validateImportAlias(value, tsconfig),
		});

		if (p.isCancel(input)) cancel();

		hooksAlias = input;
	}

	const rawConfig = cliConfig.rawConfigSchema.parse({
		...config,
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

	const configPaths = await cliConfig.resolveConfig(cwd, rawConfig);
	return configPaths;
}

function validateImportAlias(alias: string, tsconfig: TsConfigResult) {
	const resolvedPath = resolveImport(alias, tsconfig);
	if (resolvedPath !== undefined) return;

	return `"${color.bold(alias)}" does not use an existing path alias defined in your ${color.bold(path.basename(tsconfig.path))}. See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}`;
}

export async function runInit(cwd: string, config: ResolvedConfig, options: InitOptions) {
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

	await p.tasks(tasks);

	if (options.deps) {
		await installDependencies({
			cwd,
			prompt: options.deps,
			dependencies: Array.from(result.dependencies),
			devDependencies: Array.from(result.devDependencies),
		});
	} else if (result.skippedDeps.size) {
		const prettyList = prettifyList([...result.skippedDeps], 7);
		p.log.warn(
			`shadcn-svelte has been initialized ${color.bold.red("without")} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
