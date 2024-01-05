import { existsSync, promises as fs } from "fs";
import path from "path";
import type { Config } from "../utils/get-config";
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";
import {
	DEFAULT_COMPONENTS,
	DEFAULT_TAILWIND_CONFIG,
	DEFAULT_TAILWIND_CSS,
	DEFAULT_UTILS,
	getConfig,
	rawConfigSchema,
	resolveConfigPaths
} from "../utils/get-config";
import { getPackageManager } from "../utils/get-package-manager";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";
import {
	getRegistryBaseColor,
	getRegistryBaseColors,
	getRegistryStyles
} from "../utils/registry";
import * as templates from "../utils/templates";

const PROJECT_DEPENDENCIES = ["tailwind-variants", "clsx", "tailwind-merge"] as const;

export const init = new Command()
	.command("init")
	.description("Configure your SvelteKit project.")
	.option("-y, --yes", "Skip confirmation prompt.")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async (options) => {
		const cwd = path.resolve(options.cwd);

		logger.warn(
			"This command assumes a SvelteKit project with TypeScript and Tailwind CSS."
		);
		logger.warn(
			"If you don't have these, follow the manual steps at https://shadcn-svelte.com/docs/installation."
		);
		logger.warn("");

		if (!options.yes) {
			const { proceed } = await prompts([
				{
					type: "confirm",
					name: "proceed",
					message:
						"Running this command will install dependencies and overwrite your existing tailwind.config.[cjs|js|ts] & app.pcss file. Proceed?",
					initial: true
				}
			]);

			if (!proceed) {
				process.exitCode = 0;
				return;
			}
		}

		try {
			// Ensure target directory exists.
			if (!existsSync(cwd)) {
				logger.error(`The path ${cwd} does not exist. Please try again.`);
				process.exitCode = 1;
				return;
			}

			// Read config.
			const existingConfig = await getConfig(cwd);
			const config = await promptForConfig(cwd, existingConfig, options.yes);

			await runInit(cwd, config);
			logger.info("");
			logger.info(`${chalk.green("Success!")} Project initialization completed.`);
			logger.info("");
			logger.info(
				"Don't forget to add the aliases you configured to your svelte.config.js!"
			);
			logger.info("");

			// // Update svelte.config.js
			// const svelteConfigSpinner = ora(
			// 	`Updating svelte.config.js...`
			// ).start();

			// await addAliases();
			// svelteConfigSpinner.succeed();
		} catch (e) {
			handleError(e);
		}
	});

async function promptForConfig(
	cwd: string,
	defaultConfig: Config | null = null,
	skip = false
) {
	const highlight = logger.highlight;
	const styles = await getRegistryStyles();
	const baseColors = await getRegistryBaseColors();

	const options = await prompts([
		{
			type: "select",
			name: "style",
			message: `Which ${highlight("style")} would you like to use?`,
			choices: styles.map((style) => ({
				title: style.label,
				value: style.name
			}))
		},
		{
			type: "select",
			name: "tailwindBaseColor",
			message: `Which color would you like to use as ${highlight("base color")}?`,
			choices: baseColors.map((color) => ({
				title: color.label,
				value: color.name
			}))
		},
		{
			type: "text",
			name: "tailwindCss",
			message: `Where is your ${highlight("global CSS")} file?`,
			initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
			validate: (value) => {
				if (existsSync(value)) {
					return true;
				}
				logger.error(`${value} does not exist. Please enter a valid path.`);
				return false;
			}
		},
		{
			type: "text",
			name: "tailwindConfig",
			message: `Where is your ${highlight("tailwind.config.[cjs|js|ts]")} located?`,
			initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
			validate: (value) => {
				if (existsSync(value)) {
					return true;
				}
				logger.info("");
				logger.error(`${value} does not exist. Please enter a valid path.`);
				logger.info("");
				return false;
			}
		},
		{
			type: "text",
			name: "components",
			message: `Configure the import alias for ${highlight("components")}:`,
			initial: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS
		},
		{
			type: "text",
			name: "utils",
			message: `Configure the import alias for ${highlight("utils")}:`,
			initial: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS
		}
	]);

	const config = rawConfigSchema.parse({
		$schema: "https://shadcn-svelte.com/schema.json",
		style: options.style,
		tailwind: {
			config: options.tailwindConfig,
			css: options.tailwindCss,
			baseColor: options.tailwindBaseColor
		},
		aliases: {
			utils: options.utils,
			components: options.components
		}
	});

	if (!skip) {
		const { proceed } = await prompts({
			type: "confirm",
			name: "proceed",
			message: `Write configuration to ${highlight("components.json")}. Proceed?`,
			initial: true
		});

		if (!proceed) {
			process.exitCode = 0;
		}
	}

	if (config.tailwind.config.endsWith(".cjs")) {
		logger.info("Your tailwind.config.cjs has been renamed to tailwind.config.js.");
		const renamedTailwindConfigPath = config.tailwind.config.replace(".cjs", ".js");
		config.tailwind.config = renamedTailwindConfigPath;
	}

	const configPaths = await resolveConfigPaths(cwd, config);

	// Write to file.
	logger.info("");
	const spinner = ora(`Writing components.json...`).start();
	const targetPath = path.resolve(cwd, "components.json");
	await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8");
	spinner.succeed();

	return configPaths;
}

export async function runInit(cwd: string, config: Config) {
	const spinner = ora(`Initializing project...`)?.start();

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
		await fs.writeFile(
			config.resolvedPaths.tailwindCss,
			baseColor.cssVarsTemplate,
			"utf8"
		);
	}

	// Write cn file.
	await fs.writeFile(`${config.resolvedPaths.utils}.ts`, templates.UTILS, "utf8");

	spinner?.succeed();

	// Install dependencies.
	const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
	const packageManager = await getPackageManager(cwd);

	// TODO: add support for other icon libraries.
	const deps = [
		...PROJECT_DEPENDENCIES,
		config.style === "new-york" ? "radix-icons-svelte" : "lucide-svelte"
	];

	await execa(packageManager, [packageManager === "npm" ? "install" : "add", ...deps], {
		cwd
	});
	dependenciesSpinner?.succeed();
}
