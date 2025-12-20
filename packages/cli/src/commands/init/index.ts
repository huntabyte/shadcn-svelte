import color from "picocolors";
import { Command, Option } from "commander";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { z } from "zod";
import * as p from "@clack/prompts";
import type { TsConfigResult } from "get-tsconfig";
import { detectConfigs } from "../../utils/auto-detect.js";
import { error, handleError } from "../../utils/errors.js";
import * as cliConfig from "../../utils/get-config.js";
import { cancel, intro, prettifyList } from "../../utils/prompt-helpers.js";
import * as registry from "../../utils/registry/index.js";
import { resolveImportAlias } from "../../utils/resolve-imports.js";
import { syncSvelteKit } from "../../utils/sveltekit.js";
import { SITE_BASE_URL } from "../../constants.js";
import { preflightInit } from "./preflight.js";
import { addRegistryItems } from "../../utils/add-registry-items.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { highlight, parseUrl, stripTrailingSlash } from "../../utils/utils.js";
import { installDependencies } from "../../utils/install-deps.js";
import { checkPreconditions } from "../../utils/preconditions.js";
import { createCssVars, createGlobalCssFile } from "../../utils/css.js";

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
	skipPreflight: z.boolean(),
});

type InitOptions = z.infer<typeof initOptionsSchema>;

export const init = new Command()
	.command("init")
	.description("initialize your project and install dependencies")
	.argument(
		"[design-system-url]",
		"the design system url to initialize your project with",
		parseUrl
	)
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-o, --overwrite", "overwrite existing files", false)
	.option("--no-deps", "disable adding & installing dependencies")
	.option("--skip-preflight", "ignore preflight checks and continue", false)
	.addOption(
		new Option("--base-color <name>", "the base color for the components").choices(
			baseColors.map((color) => color.name)
		)
	)
	.addOption(new Option("--design-system-url"))
	.option("--css <path>", "path to the global CSS file")
	.option("--components-alias <path>", "import alias for components")
	.option("--lib-alias <path>", "import alias for lib")
	.option("--utils-alias <path>", "import alias for utils")
	.option("--hooks-alias <path>", "import alias for hooks")
	.option("--ui-alias <path>", "import alias for ui")
	.option("--proxy <proxy>", "fetch items from registry using a proxy", getEnvProxy())
	.action(async (designSystemUrl, opts) => {
		intro();
		const options = initOptionsSchema.parse(opts);
		const cwd = path.resolve(options.cwd);

		try {
			// Ensure target directory exists.
			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			if (designSystemUrl !== undefined && options.baseColor !== undefined) {
				p.log.warn(
					"You provided a design system url and the `--base-color` option. The `--base-color` option will be ignored."
				);
			}

			preflightInit(cwd, { skipPreflight: options.skipPreflight });

			let existingConfig = cliConfig.loadConfig(cwd);
			if (existingConfig) {
				existingConfig = checkPreconditions({
					cwd,
					config: existingConfig,
					skipPreflight: options.skipPreflight,
				});
			}

			const config = await promptForConfig(cwd, designSystemUrl, existingConfig, options);

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

	for (const [alias, path] of Object.entries(options)) {
		if (!alias.endsWith("Alias")) continue;
		const importPath = path as string;
		const validationResult = validateImportAlias({ cwd, importPath, tsconfig });
		if (validationResult) {
			throw error(validationResult);
		}
	}
}

async function promptForConfig(
	cwd: string,
	designSystemUrl: URL,
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
	let designSystemChoices: cliConfig.DesignSystemConfig;
	if (designSystemUrl === undefined) {
		let selectedBaseColor = baseColors.find((color) => color.name === options.baseColor)?.name;
		if (selectedBaseColor === undefined) {
			const input = await p.select({
				message: `Which ${highlight("base color")} would you like to use?`,
				initialValue:
					existingConfig?.tailwind.baseColor ??
					cliConfig.DEFAULT_CONFIG.tailwind.baseColor,
				options: baseColors.map((color) => ({ label: color.label, value: color.name })),
			});

			if (p.isCancel(input)) cancel();

			selectedBaseColor = input as cliConfig.BaseColorName;
		}

		designSystemChoices = {
			...cliConfig.DEFAULT_DESIGN_SYSTEM_CONFIG,
			baseColor: selectedBaseColor,
		};
	} else {
		const designSystem = await registry.getDesignSystem(designSystemUrl.toString());

		designSystemChoices = {
			...designSystem,
			radius: designSystem.radius,
		};
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

	const promptAlias = async (alias: keyof cliConfig.RawConfig["aliases"], initial: string) => {
		let path = options[`${alias}Alias`];
		if (path === undefined) {
			const input = await p.text({
				message: `Configure the import alias for ${highlight(alias)}:`,
				initialValue: existingConfig?.aliases[alias] ?? initial,
				placeholder: cliConfig.DEFAULT_CONFIG.aliases[alias],
				validate: (value) => validateImportAlias({ cwd, tsconfig, importPath: value }),
			});

			if (p.isCancel(input)) cancel();

			path = stripTrailingSlash(input);
		}
		return path;
	};

	// Lib Alias
	const libAlias = await promptAlias("lib", "$lib");

	// Components Alias
	const componentAlias = await promptAlias("components", `${libAlias}/components`);

	// UI Alias
	const uiAlias = await promptAlias("ui", `${componentAlias}/ui`);

	// Utils Alias
	const utilsAlias = await promptAlias("utils", `${libAlias}/utils`);

	// Hooks Alias
	const hooksAlias = await promptAlias("hooks", `${libAlias}/hooks`);

	const rawConfig = cliConfig.rawConfigSchema.parse({
		...config,
		tailwind: {
			css: globalCss,
			baseColor: designSystemChoices.baseColor,
		},
		aliases: {
			utils: utilsAlias,
			lib: libAlias,
			components: componentAlias,
			hooks: hooksAlias,
			ui: uiAlias,
		},
		designSystem: {
			...designSystemChoices,
			baseColor: undefined,
		},
	});

	const configPaths = await cliConfig.resolveConfig(cwd, rawConfig);
	return configPaths;
}

function validateImportAlias(opts: Parameters<typeof resolveImportAlias>[0]) {
	const resolvedPath = resolveImportAlias(opts);
	if (resolvedPath !== undefined) return;

	return `"${color.bold(opts.importPath)}" does not use an existing path alias defined in your ${color.bold(path.basename(opts.tsconfig.path))}. See: ${color.underline(`${SITE_BASE_URL}/docs/installation/manual#configure-path-aliases`)}`;
}

export async function runInit(cwd: string, config: cliConfig.ResolvedConfig, options: InitOptions) {
	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}
	const registryUrl = registry.getRegistryUrl(config);

	const tasks: p.Task[] = [];

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

	await p.tasks(tasks);

	const result = await addRegistryItems({
		selectedItems: ["init"],
		config,
		deps: options.deps,
		overwrite: options.overwrite,
	});

	// add font dependencies
	config.designSystem.fonts
		.flatMap((font) => font.font.dependencies ?? [])
		.forEach((dependency) => result.dependencies.add(dependency));

	// update stylesheet
	await p.tasks([
		{
			title: "Updating stylesheet",
			async task() {
				const [baseColor, theme] = await Promise.all([
					registry.getRegistryTheme(registryUrl, config.tailwind.baseColor),
					registry.getRegistryTheme(registryUrl, config.designSystem.theme),
				]);

				const cssVars = createCssVars({
					baseColor,
					theme,
					config,
				});

				const relative = path.relative(cwd, config.resolvedPaths.tailwindCss);
				await fs.writeFile(
					config.resolvedPaths.tailwindCss,
					createGlobalCssFile(cssVars, config),
					"utf8"
				);
				return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
			},
		},
	]);

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
			`shadcn-svelte has been initialized ${color.bold(color.red("without"))} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
