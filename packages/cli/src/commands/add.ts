import { existsSync, promises as fs } from "fs";
import path from "path";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import { getAvailableComponents } from "../utils/get-components";
import { getPackageManager } from "../utils/get-package-manager";
import { getProjectInfo } from "../utils/get-project-info";
import { logger } from "../utils/logger";
import { promptForComponents, promptForDestinationDir } from "../utils/prompts";

export const add = new Command()
	.command("add")
	.description("add components to your project")
	.argument("[components...]", "name of components")
	.option("--nodep", "disable adding & installing dependencies (advanced)")
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
