import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import * as p from "@clack/prompts";
import color from "picocolors";
import { Command, Option } from "commander";
import { z } from "zod";
import { preflightInit } from "./preflight.js";
import * as cliConfig from "../../utils/config/index.js";
import * as project from "../../utils/project.js";
import * as registry from "../../utils/registry/index.js";
import { type PresetConfig, decodePreset, encodePreset } from "../../preset/index.js";
import { promptForPreset } from "../../preset/presets.js";
import { addRegistryItems } from "../../utils/add-registry-items.js";
import {
	AGENT_NAMES,
	detectConfigs,
	detectPM,
	getInstalledAgents,
} from "../../utils/auto-detect.js";
import { highlight } from "../../utils/colors.js";
import { error } from "../../utils/errors.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { installDependencies } from "../../utils/install-deps.js";
import { checkPreconditions } from "../../utils/preconditions.js";
import { cancel, intro, prettifyList, handleError } from "../../utils/prompt-helpers.js";
import type { TsConfigResult } from "get-tsconfig";

const baseColors = registry.getBaseColors();

// in the order they're asked for
const ALIASES = ["lib", "components", "ui", "utils", "hooks"] as const;

const OVERWRITE_PARTS = ["components", "utils", "stylesheet"] as const;

const initOptionsSchema = z.object({
	cwd: z.string(),
	baseColor: z.string().optional(),
	preset: z.string().optional(),
	css: z.string().optional(),
	tsconfig: z.string().optional(),
	componentsAlias: z.string().optional(),
	utilsAlias: z.string().optional(),
	libAlias: z.string().optional(),
	hooksAlias: z.string().optional(),
	uiAlias: z.string().optional(),
	deps: z.boolean(),
	install: z.boolean(),
	depsInstall: z.boolean(),
	installWith: z.enum(AGENT_NAMES).optional(),
	overwrite: z.union([z.boolean(), z.enum(OVERWRITE_PARTS).array()]).optional(),
	proxy: z.string().optional(),
	skipPreflight: z.boolean(),
	reinstall: z.boolean().optional(),
});

type InitOptions = z.infer<typeof initOptionsSchema>;

export const init = new Command()
	.command("init")
	.description("initialize your project and install dependencies")
	.option("--preset <preset>", "the preset to use")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.addOption(new Option("--no-deps", "disable adding & installing dependencies").hideHelp())
	.addOption(
		new Option(
			"--install-with <package-manager>",
			"install dependencies with the given package manager"
		)
			.choices(getInstalledAgents())
			.conflicts(["deps", "install", "depsInstall"])
	)
	.option("--no-install", "add dependencies to package.json without installing them")
	.addOption(new Option("--no-deps-install", "deprecated: use --no-install").hideHelp())
	.option("--skip-preflight", "ignore preflight checks and continue", false)
	.addOption(
		new Option("-o, --overwrite [parts...]", "overwrite existing files, or only the given parts")
			.choices(OVERWRITE_PARTS)
			.conflicts(["reinstall"])
	)
	.option("--no-overwrite", "keep existing files and leave the stylesheet as is")
	.addOption(new Option("--reinstall", "deprecated: use --overwrite").hideHelp())
	.addOption(new Option("--no-reinstall", "deprecated: use --overwrite <parts...>").hideHelp())
	.addOption(
		new Option("--base-color <name>", "the base color for the components").choices(
			baseColors.map((color) => color.name)
		)
	)
	.option("--css <path>", "path to the global CSS file")
	.option("--tsconfig <path>", "path to the tsconfig/jsconfig file")
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

			let presetConfig: PresetConfig | null = null;
			if (options.preset !== undefined) {
				presetConfig = decodePreset(options.preset);
				if (presetConfig === null) {
					p.log.warn(`${color.dim(`--preset ${options.preset}`)} is not a valid preset.`);
				}
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

			const { resolvedConfig, decidedPresets, styleChanged } = await promptForConfig({
				cwd,
				presetConfig,
				existingConfig,
				options,
			});

			await runInit({ cwd, config: resolvedConfig, decidedPresets, options, styleChanged });

			p.outro(`${color.green("Success!")} Project initialization completed.`);
		} catch (e) {
			handleError(e);
		}
	})
	.on("option:reinstall", () => warnDeprecated("--reinstall", "--overwrite"))
	.on("option:no-reinstall", () => warnDeprecated("--no-reinstall", "--overwrite <parts...>"));

function warnDeprecated(flag: string, replacement: string) {
	console.warn(
		color.yellow(
			`Warning: ${color.bold(flag)} is deprecated. Use ${color.bold(replacement)} instead.\n`
		)
	);
}

function validateOptions(cwd: string, options: InitOptions, tsconfig: TsConfigResult | undefined) {
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
		const validationResult = cliConfig.validateImportAlias({ cwd, importPath, tsconfig });
		if (validationResult) {
			throw error(validationResult);
		}
	}
}

async function promptForConfig({
	cwd,
	presetConfig,
	existingConfig,
	options,
}: {
	cwd: string;
	presetConfig: PresetConfig | null;
	existingConfig: cliConfig.RawConfig | undefined;
	options: InitOptions;
}) {
	const config: cliConfig.RawConfig = existingConfig ?? structuredClone(cliConfig.DEFAULT_CONFIG);

	// if it's a SvelteKit project, run sync so that the aliases are always up to date
	await project.syncSvelteKit(cwd);

	const { cssPath, tsconfigPath, packageImportAlias } = detectConfigs(cwd, { relative: true });
	// A tsconfig isn't necessary when the aliases are subpath imports from `package.json`. The
	// prompts default to `packageImportAlias` for the aliases that aren't passed.
	const needsTsconfig =
		!existingConfig &&
		!tsconfigPath &&
		cliConfig.needsTSConfig(
			cwd,
			ALIASES.map((alias) => options[`${alias}Alias`] ?? packageImportAlias)
		);

	// Without a terminal, prompts would hang or exit without doing anything, so fail and name all
	// the flags that answer them instead.
	if (!process.stdin.isTTY) {
		const missing = [
			needsTsconfig && options.tsconfig === undefined && "--tsconfig <path>",
			!presetConfig && "--preset <preset>",
			options.css === undefined && "--css <path>",
			...ALIASES.filter((alias) => options[`${alias}Alias`] === undefined).map(
				(alias) => `--${alias}-alias <path>`
			),
		].filter((flag) => flag !== false);

		if (missing.length > 0) {
			const flags = missing.map((flag) => highlight(flag)).join(", ");
			throw error(`Pass ${flags} to skip the prompts.`);
		}
	}

	let tsconfig;
	if (options.tsconfig !== undefined) {
		if (!existsSync(path.resolve(cwd, options.tsconfig))) {
			throw error(
				`The provided tsconfig/jsconfig file path ${color.cyan(options.tsconfig)} does not exist. Please enter a valid path.`
			);
		}
		config.typescript = { config: options.tsconfig };
		tsconfig = cliConfig.resolveTSConfig(cwd, config);
	} else if (existingConfig) {
		const aliases = ALIASES.map(
			(alias) => options[`${alias}Alias`] ?? existingConfig.aliases[alias]
		);
		tsconfig = cliConfig.resolveTSConfig(cwd, existingConfig, {
			optional: !cliConfig.needsTSConfig(cwd, aliases),
		});
	} else {
		if (needsTsconfig) {
			const input = await p.text({
				message: `Where is your ${highlight("tsconfig/jsconfig")} file?`,
				// initialValue: "tsconfig.json",
				placeholder: "tsconfig.json",
				validate: (value) => {
					const tsconfigPath = path.resolve(cwd, value ?? "");
					if (value && existsSync(tsconfigPath)) {
						return;
					}
					return `"${color.bold(value)}" does not exist. Please enter a valid path.`;
				},
			});

			if (p.isCancel(input)) cancel();

			config.typescript = { config: input };
		} else if (tsconfigPath) {
			config.typescript = tsconfigPath.includes("tsconfig");
		} else {
			// without a tsconfig or jsconfig in the project or above it, it's a JavaScript project
			config.typescript = false;
		}

		tsconfig = cliConfig.resolveTSConfig(cwd, config, { optional: !needsTsconfig });
	}

	// Validation for any paths provided by flags
	validateOptions(cwd, options, tsconfig);

	// Design system
	const decidedPresets = presetConfig ?? (await promptForPreset(existingConfig));

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

	const { utilsAlias, libAlias, componentAlias, hooksAlias, uiAlias } =
		await cliConfig.promptForAliases({
			...options,
			libAliasDefault: packageImportAlias,
			tsconfig,
			cwd,
			existingConfig,
		});

	const rawConfig = cliConfig.parseRawConfig({
		...config,
		tailwind: {
			css: globalCss,
			baseColor: decidedPresets.baseColor,
		},
		aliases: {
			utils: utilsAlias,
			lib: libAlias,
			components: componentAlias,
			hooks: hooksAlias,
			ui: uiAlias,
		},
		style: decidedPresets.style,
		iconLibrary: decidedPresets.iconLibrary,
		menuColor: decidedPresets.menuColor,
		menuAccent: decidedPresets.menuAccent,
	});

	let styleChanged;
	if (existingConfig) {
		styleChanged =
			existingConfig.style !== decidedPresets.style ||
			existingConfig.menuColor !== decidedPresets.menuColor ||
			existingConfig.menuAccent !== decidedPresets.menuAccent;
	} else {
		styleChanged = false;
	}

	return {
		resolvedConfig: await cliConfig.resolveConfig(cwd, rawConfig),
		decidedPresets,
		styleChanged,
	};
}

export async function runInit({
	cwd,
	config,
	decidedPresets,
	options,
	styleChanged,
}: {
	cwd: string;
	config: cliConfig.ResolvedConfig;
	decidedPresets: PresetConfig;
	options: InitOptions;
	styleChanged: boolean;
}) {
	// Without a terminal, prompts would hang or exit without doing anything, so fail and name the
	// flag that answers them instead.
	const interactive = Boolean(process.stdin.isTTY);

	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}

	// find the package manager first, so that a missing one fails before any file is written
	const install = options.install && options.depsInstall;
	const installWith =
		options.deps && install
			? (options.installWith ?? (await detectPM(cwd, true)))
			: options.installWith;

	// we create a registry base item using the encoded preset at the /init endpoint in the docs
	const registryUrl = registry.getRegistryUrl(config);
	const encodedPreset = encodePreset(decidedPresets);
	const presetUrl = new URL(`/init?preset=${encodedPreset}`, registryUrl).toString();

	let selectedItems: string[] = [];
	// `undefined` asks about the items that already exist, and a list names the items to replace
	let overwrite: boolean | string[] | undefined;
	let stylesheet: "write" | "keep" | "ask" | undefined;

	if (Array.isArray(options.overwrite)) {
		// only the given parts are replaced, without asking
		const parts = options.overwrite;
		if (styleChanged && parts.includes("components")) {
			selectedItems = await getExistingComponents(registryUrl, config);
		}
		if (parts.includes("utils")) selectedItems.push("utils");
		overwrite = selectedItems;
		stylesheet = parts.includes("stylesheet") ? "write" : "keep";
	} else {
		overwrite = options.overwrite ?? (options.reinstall || undefined);
		// if the style has changed then we want to ask the user if they want to reinstall existing components to update their styles
		// unless of course they user has explicitly disabled it
		if (styleChanged && options.reinstall !== false && overwrite !== false) {
			selectedItems = await getExistingComponents(registryUrl, config);

			if (selectedItems.length > 0 && overwrite === undefined) {
				const style = color.bold(color.yellow(decidedPresets.style));
				if (!interactive) {
					throw error(
						`The registry style has changed to ${style}. Pass ${highlight("--overwrite")} to reinstall your existing components with it, ${highlight("--overwrite <parts...>")} to replace only some parts, or ${highlight("--no-overwrite")} to keep them.`
					);
				}

				p.log.warn(`The registry style has changed to ${style}.`);

				const choice = await p.confirm({
					message: `Would you like to ${color.bold(color.red("overwrite"))} your existing components?`,
					initialValue: true,
				});
				if (p.isCancel(choice)) cancel();
				overwrite = choice;
				// keeping the components still asks about the stylesheet, since the new style needs it
				if (!choice) stylesheet = "ask";
			}
		}
	}

	// these run once nothing is left to ask, so that stopping at a question leaves the project as
	// it was
	const setup: p.Task[] = [];

	setup.push({
		title: "Creating config file",
		async task() {
			cliConfig.writeConfig(cwd, config);
			return `Config file ${highlight("components.json")} created`;
		},
	});

	setup.push({
		title: "Validating alias paths",
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
			return `Alias paths validated`;
		},
	});

	const result = await addRegistryItems({
		selectedItems: [presetUrl, ...selectedItems],
		config,
		deps: options.deps,
		overwrite,
		stylesheet,
		interactive,
		overwriteArg: "<parts...>",
		before: setup,
	});

	if (options.deps) {
		await installDependencies({
			cwd,
			dependencies: Array.from(result.dependencies),
			devDependencies: Array.from(result.devDependencies),
			install,
			installWith,
		});
	} else if (result.skippedDeps.size) {
		const prettyList = prettifyList([...result.skippedDeps], 7);
		p.log.warn(
			`shadcn-svelte has been initialized ${color.bold(color.red("without"))} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}

async function getExistingComponents(registryUrl: string, config: cliConfig.ResolvedConfig) {
	const registryIndex = await registry.getRegistryIndex(registryUrl);
	const components = await project.getComponents({ registryIndex, config });
	return components
		.filter((component) => component.name !== "utils")
		.map((component) => component.name);
}
