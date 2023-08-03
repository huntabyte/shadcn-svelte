#!/usr/bin/env node
// Credit to @shadcn for the original code. It has been slightly modified to fit the needs of this project.
import { existsSync, promises as fs } from "fs";
import path from "path";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";
import { Component, getAvailableComponents } from "./utils/get-components";
import { getPackageInfo } from "./utils/get-package-info";
import { getPackageManager } from "./utils/get-package-manager";
import { getProjectInfo } from "./utils/get-project-info";
import { logger } from "./utils/logger";
import {
	addAliases,
	getConfig,
	installMeltPP,
	isMeltPPInstalled,
	setConfig
} from "./utils/set-config";
import { STYLES, TAILWIND_CONFIG, UTILS } from "./utils/templates";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const PROJECT_DEPENDENCIES = [
	"tailwindcss-animate",
	"class-variance-authority",
	"clsx",
	"tailwind-merge",
	"lucide-svelte"
];

async function main() {
	const packageInfo = getPackageInfo();
	const projectInfo = await getProjectInfo();
	const packageManager = getPackageManager();

	const program = new Command()
		.name("shadcn-svelte")
		.description("Add shadcn-svelte components to your project")
		.version(
			packageInfo.version || "1.0.0",
			"-v, --version",
			"display the version number"
		);

	program
		.command("init")
		.description("Configure your SvelteKit project.")
		.option("-y, --yes", "Skip confirmation prompt.")
		.action(async (options) => {
			logger.warn(
				"IMPORTANT: Svelte v4 is not supported yet by some of our dependencies (lucide-svelte & radix-svelte). Please use Svelte v3 for now. We expect this issue to be resolved very soon. Apologies for the inconvenience."
			);
			logger.warn(
				"This command assumes a SvelteKit project with TypeScript and Tailwind CSS."
			);
			logger.warn(
				"If you don't have these, follow the manual steps at https://shadcn-svelte.com/docs/installation."
			);
			logger.warn("");

			if (!options.yes) {
				const { proceed } = await prompts({
					type: "confirm",
					name: "proceed",
					message:
						"Running this command will install dependencies and overwrite your existing tailwind.config.[cjs|js] & svelte.config.js. Proceed?",
					initial: true
				});

				if (!proceed) {
					process.exit(0);
				}
			}

			// Install dependencies.
			const dependenciesSpinner = ora(
				`Installing dependencies...`
			).start();
			await execa(packageManager, [
				packageManager === "npm" ? "install" : "add",
				...PROJECT_DEPENDENCIES
			]);
			dependenciesSpinner.succeed();

			// Update styles
			let stylesDestination = "./src/app.postcss";

			const stylesSpinner = ora(
				`Adding styles with CSS variables...`
			).start();
			await fs.writeFile(stylesDestination, STYLES, "utf8");
			stylesSpinner.succeed();

			// Ensure lib directory exists.
			const libDir = "./src/lib";
			if (!existsSync(path.resolve(libDir))) {
				await fs.mkdir(path.resolve(libDir), { recursive: true });
			}

			// Create lib/utils.ts
			const utilsDestination = "./src/lib/utils.ts";

			const utilsSpinner = ora(`Adding utils...`).start();
			await fs.writeFile(utilsDestination, UTILS, "utf8");
			utilsSpinner.succeed();

			// Update tailwind.config.js
			const tailwindDestination = "./tailwind.config.js";
			const tailwindSpinner = ora(
				`Updating tailwind.config.js...`
			).start();
			await fs.writeFile(tailwindDestination, TAILWIND_CONFIG, "utf8");
			// Delete tailwind.config.cjs if present
			await fs.unlink("./tailwind.config.cjs").catch((e) => e); // throws when it DNE
			tailwindSpinner.succeed();

			// Update svelte.config.js
			const svelteConfigSpinner = ora(
				`Updating svelte.config.js...`
			).start();

			await addAliases();
			svelteConfigSpinner.succeed();
		});

	program
		.command("add")
		.description("add components to your project")
		.argument("[components...]", "name of components")
		.option(
			"--nodep",
			"disable adding & installing dependencies (advanced)"
		)
		.action(async (components: string[], options) => {
			logger.warn(
				"Running the following command will overwrite existing files."
			);
			logger.warn(
				"Make sure you have committed your changes before proceeding."
			);
			logger.warn("");

			const availableComponents = await getAvailableComponents();

			if (!availableComponents?.length) {
				logger.error(
					"An error occurred while fetching components. Please try again."
				);
				process.exit(0);
			}

			let selectedComponents = availableComponents.filter((component) =>
				components.includes(component.component)
			);

			if (!selectedComponents?.length) {
				selectedComponents = await promptForComponents(
					availableComponents,
					"Which component(s) would you like to add?"
				);
			}

			const dir = await promptForDestinationDir();

			if (!selectedComponents?.length) {
				logger.warn("No components selected. Nothing to install.");
				process.exit(0);
			}

			// Create componentPath directory if it doesn't exist.
			const destinationDir = path.resolve(dir);
			if (!existsSync(destinationDir)) {
				const spinner = ora(`Creating ${dir}...`).start();
				await fs.mkdir(destinationDir, { recursive: true });
				spinner.succeed();
			}

			logger.success(
				`Installing ${selectedComponents.length} component(s) and dependencies...`
			);

			// check if they already have the PP installed
			const hasMeltPP = await isMeltPPInstalled();

			for (const component of selectedComponents) {
				const componentSpinner = ora(`${component.name}...`).start();

				// Write the files.
				for (const file of component.files) {
					// Replace alias with the project's alias.
					if (projectInfo?.alias) {
						file.content = file.content.replace(
							/$\//g,
							projectInfo.alias
						);
					}
					const dirPath = path.join(dir, file.dir);
					await fs.mkdir(dirPath, { recursive: true });
					const filePath = path.resolve(dirPath, file.name);
					await fs.writeFile(filePath, file.content);
				}

				// Install dependencies.
				if (component.dependencies?.length && !options.nodep) {
					await execa(packageManager, [
						packageManager === "npm" ? "install" : "add",
						...component.dependencies
					]);

					// need PP? Let's add it
					if (
						!hasMeltPP &&
						component.dependencies.includes("@melt-ui/pp")
					) {
						await installMeltPP();
					}
				}
				componentSpinner.succeed(component.name);
			}

			if (options.nodep)
				logger.warn(
					`components installed without dependencies, consider adding ${[
						...new Set(
							selectedComponents.flatMap(
								(component) => component.dependencies ?? []
							)
						)
					].join(", ")} to your project dependencies`
				);
		});

	program
		.command("update")
		.description("update components in your project")
		.argument("[components...]", "name of components")
		.action(async (components: string[], options) => {
			logger.warn(
				"Running the following command will overwrite existing files."
			);
			logger.warn(
				"Make sure you have committed your changes before proceeding."
			);
			logger.warn("");

			const availableComponents = await getAvailableComponents();
			if (!availableComponents?.length) {
				logger.error(
					"An error occurred while fetching components. Please try again."
				);
				process.exit(0);
			}

			const config = await getConfig();
			if (!config) {
				logger.error(
					"'shadcn' config is missing in 'svelte.config.js'."
				);
				process.exit(0);
			}

			const dir = config.componentPath;

			const destinationDir = path.resolve(dir);
			if (!existsSync(destinationDir)) {
				logger.error(`componentPath '${dir}' does not exist.`);
				process.exit(0);
			}

			const userDefinedComponents: typeof availableComponents = [];
			const files = await fs.readdir(destinationDir, {
				withFileTypes: true
			});
			for (const file of files) {
				const component = availableComponents.find(
					(comp) => comp.component === file.name
				);
				if (file.isDirectory() && component) {
					// is a valid shadcn component
					userDefinedComponents.push(component);
				}
			}

			let selectedComponents = userDefinedComponents.filter((component) =>
				components.includes(component.component)
			);

			// If user didn't specify any component arguments
			if (selectedComponents.length === 0) {
				selectedComponents = await promptForComponents(
					userDefinedComponents,
					"Which component(s) would you like to update?"
				);
			}

			if (selectedComponents === undefined) {
				logger.warn(`No shadcn components detected in '${dir}'.`);
				process.exit(0);
			}

			if (selectedComponents.length === 0) {
				logger.warn("No components selected. Nothing to update.");
				process.exit(0);
			}

			logger.success(
				`Updating ${selectedComponents.length} component(s) and dependencies...`
			);

			// check if they already have the PP installed
			const hasMeltPP = await isMeltPPInstalled();

			for (const component of selectedComponents) {
				const componentSpinner = ora(`${component.name}...`).start();

				// Write the files.
				for (const file of component.files) {
					// Replace alias with the project's alias.
					if (projectInfo?.alias) {
						file.content = file.content.replace(
							/$\//g,
							projectInfo.alias
						);
					}
					const dirPath = path.join(dir, file.dir);
					await fs.mkdir(dirPath, { recursive: true });
					const filePath = path.resolve(dirPath, file.name);
					await fs.writeFile(filePath, file.content);
				}

				// Install dependencies.
				if (component.dependencies?.length) {
					await execa(packageManager, [
						packageManager === "npm" ? "install" : "add",
						...component.dependencies
					]);

					// need PP? Let's add it
					if (
						!hasMeltPP &&
						component.dependencies.includes("@melt-ui/pp")
					) {
						await installMeltPP();
					}
				}
				componentSpinner.succeed(component.name);
			}
		});

	program.parse();
}

async function promptForComponents(components: Component[], message: string) {
	const { components: selectedComponents } = await prompts({
		type: "multiselect",
		name: "components",
		message,
		hint: "<SPACE> to select. <A> to select all.",
		instructions: false,
		choices: components.map((component) => ({
			title: component.name,
			value: component
		}))
	});

	return selectedComponents;
}

async function promptForDestinationDir() {
	const config = await getConfig();

	if (!config) {
		const { dir } = await prompts([
			{
				type: "text",
				name: "dir",
				message: "Where would you like to install the component(s)?",
				initial: "./src/lib/components/ui"
			}
		]);
		await setConfig(dir);
		return dir;
	}

	return config.componentPath;
}

main();
