import { existsSync, promises as fs } from "fs";
import path from "path";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import { getAvailableComponents } from "../utils/get-components";
import { getPackageManager } from "../utils/get-package-manager";
import { getProjectInfo } from "../utils/get-project-info";
import { logger } from "../utils/logger";
import { promptForComponents } from "../utils/prompts";
import { getConfig } from "../utils/set-config";

export const update = new Command()
	.command("update")
	.description("update components in your project")
	.argument("[components...]", "name of components")
	.action(async (components: string[], options) => {
		const projectInfo = await getProjectInfo();
		const packageManager = getPackageManager();

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
			logger.error("'shadcn' config is missing in 'svelte.config.js'.");
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
			}
			componentSpinner.succeed(component.name);
		}
	});
