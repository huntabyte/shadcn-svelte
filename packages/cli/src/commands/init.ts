import { existsSync, promises as fs } from "fs";
import path from "path";
import type { Config } from "../utils/get-config";
import color from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import {
	DEFAULT_COMPONENTS,
	DEFAULT_TAILWIND_CONFIG,
	DEFAULT_TAILWIND_CSS,
	DEFAULT_TYPESCRIPT,
	DEFAULT_UTILS,
	getConfig,
	rawConfigSchema,
	resolveConfigPaths,
} from "../utils/get-config";
import { getPackageManager } from "../utils/get-package-manager";
import { handleError } from "../utils/handle-error";
import { getRegistryBaseColor, getRegistryBaseColors, getRegistryStyles } from "../utils/registry";
import * as templates from "../utils/templates.js";
import * as p from "../utils/prompts.js";
import { intro } from "../utils/intro.js";

const PROJECT_DEPENDENCIES = ["tailwind-variants", "clsx", "tailwind-merge"] as const;
const highlight = (...args: unknown[]) => color.bold.cyan(...args);

export const init = new Command()
	.command("init")
	.description("Configure your SvelteKit project.")
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
				p.cancel(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
				process.exitCode = 1;
				return;
			}

			// Read config.
			const existingConfig = await getConfig(cwd);
			const config = await promptForConfig(cwd, existingConfig);

			await runInit(cwd, config);
			p.note("Don't forget to add the aliases you configured to your svelte.config.js!");

			p.outro(`${color.green("Success!")} Project initialization completed.`);
		} catch (e) {
			handleError(e);
		}
	});

async function promptForConfig(cwd: string, defaultConfig: Config | null = null) {
	const styles = await getRegistryStyles();
	const baseColors = await getRegistryBaseColors();

	const options = await p.group(
		{
			typescript: () =>
				p.confirm({
					message: `Would you like to use ${highlight("TypeScript")} (recommended)?`,
					initialValue: defaultConfig?.typescript ?? DEFAULT_TYPESCRIPT,
				}),
			style: ({}) =>
				p.select({
					message: `Which ${highlight("style")} would you like to use?`,
					initialValue: defaultConfig?.style,
					options: styles.map((style) => ({
						label: style.label,
						value: style.name,
					})),
				}),
			tailwindBaseColor: ({}) =>
				p.select({
					message: `Which color would you like to use as ${highlight("base color")}?`,
					initialValue: defaultConfig?.tailwind.baseColor,
					options: baseColors.map((color) => ({
						label: color.label,
						value: color.name,
					})),
				}),
			tailwindCss: () =>
				p.text({
					message: `Where is your ${highlight("global CSS")} file?`,
					initialValue: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
					placeholder: DEFAULT_TAILWIND_CSS,
					validate: (value) => {
						if (existsSync(path.resolve(cwd, value))) {
							return;
						}
						return `${color.bold(value)} does not exist. Please enter a valid path.`;
					},
				}),
			tailwindConfig: () =>
				p.text({
					message: `Where is your ${highlight("Tailwind config")} located?`,
					initialValue: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
					placeholder: DEFAULT_TAILWIND_CONFIG,
					validate: (value) => {
						if (existsSync(path.resolve(cwd, value))) {
							return;
						}
						return `${color.cyan.bold(value)} does not exist. Please enter a valid path.`;
					},
				}),
			components: () =>
				p.text({
					message: `Configure the import alias for ${highlight("components")}:`,
					initialValue: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS,
					placeholder: DEFAULT_COMPONENTS,
				}),
			utils: () =>
				p.text({
					message: `Configure the import alias for ${highlight("utils")}:`,
					initialValue: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
					placeholder: DEFAULT_UTILS,
				}),
		},
		{
			onCancel: () => {
				p.cancel("Operation cancelled.");
				process.exit(0);
			},
		}
	);

	const config = rawConfigSchema.parse({
		$schema: "https://shadcn-svelte.com/schema.json",
		style: options.style,
		typescript: options.typescript,
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

	const configPaths = await resolveConfigPaths(cwd, config);

	// Write to file.
	const spinner = p.spinner();
	spinner.start(`Creating config file ${highlight("components.json")}`);
	const targetPath = path.resolve(cwd, "components.json");
	await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8");
	spinner.stop(`Config file ${highlight("components.json")} created`);

	return configPaths;
}

export async function runInit(cwd: string, config: Config) {
	const spinner = p.spinner();
	spinner.start(`Initializing project`);

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

	spinner.stop("Project initialized");

	// Install dependencies.
	const dependenciesSpinner = p.spinner();
	dependenciesSpinner.start(`Installing dependencies`);
	const packageManager = await getPackageManager(cwd);

	const deps = [
		...PROJECT_DEPENDENCIES,
		config.style === "new-york" ? "svelte-radix" : "lucide-svelte",
	];

	await execa(packageManager, ["add", ...deps], {
		cwd,
	});
	dependenciesSpinner.stop("Dependencies installed");
}
