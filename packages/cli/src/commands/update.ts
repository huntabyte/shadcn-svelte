import { existsSync, promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";
import { z } from "zod";
import { getConfig } from "../utils/get-config";
import { getPackageManager } from "../utils/get-package-manager";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";
import {
	RegistryItem,
	fetchTree,
	getItemTargetPath,
	getRegistryBaseColor,
	getRegistryIndex,
	resolveTree
} from "../utils/registry";
import { transform } from "../utils/transformers";

const updateOptionsSchema = z.object({
	all: z.boolean(),
	components: z.array(z.string()).optional(),
	cwd: z.string()
});

export const update = new Command()
	.command("update")
	.description("update components in your project")
	.argument("[components...]", "name of components")
	.option("-a, --all", "update all existing components.", false)
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async (comps, opts) => {
		logger.warn(
			"Running the following command will overwrite existing files."
		);
		logger.warn(
			"Make sure you have committed your changes before proceeding."
		);
		logger.warn("");

		try {
			const options = updateOptionsSchema.parse({
				components: comps,
				...opts
			});

			const components = options.components;
			const cwd = path.resolve(options.cwd);

			if (!existsSync(cwd)) {
				logger.error(
					`The path ${cwd} does not exist. Please try again.`
				);
				process.exitCode = 1;
				return;
			}

			const config = await getConfig(cwd);
			if (!config) {
				logger.warn(
					`Configuration is missing. Please run ${chalk.green(
						`init`
					)} to create a components.json file.`
				);
				process.exitCode = 1;
				return;
			}

			const registryBaseColor = await getRegistryBaseColor(
				config.tailwind.baseColor
			);

			const registryIndex = await getRegistryIndex();

			const componentDir = path.resolve(
				config.resolvedPaths.components,
				"ui"
			);
			if (!existsSync(componentDir)) {
				logger.error(`Component dir '${componentDir}' does not exist.`);
				process.exitCode = 1;
				return;
			}

			const existingComponents: typeof registryIndex = [];
			const files = await fs.readdir(componentDir, {
				withFileTypes: true
			});
			for (const file of files) {
				if (file.isDirectory()) {
					const component = registryIndex.find(
						(comp) => comp.name === file.name
					);
					// is a valid shadcn component
					component && existingComponents.push(component);
				}
			}

			let selectedComponents: typeof registryIndex = options.all
				? existingComponents
				: [];
			if (!selectedComponents.length && components !== undefined) {
				selectedComponents = existingComponents.filter((component) =>
					components.includes(component.name)
				);
			}

			if (existingComponents.length === 0) {
				logger.info(
					`No shadcn components detected in '${componentDir}'.`
				);
				process.exitCode = 0;
				return;
			}

			// If user didn't specify any component arguments
			if (selectedComponents.length === 0) {
				selectedComponents = await promptForComponents(
					existingComponents,
					"Which component(s) would you like to update?"
				);
			}

			if (selectedComponents.length === 0) {
				logger.info("No components selected. Nothing to update.");
				process.exitCode = 0;
				return;
			}

			const tree = await resolveTree(
				registryIndex,
				selectedComponents.map((com) => com.name)
			);
			const payload = await fetchTree(config.style, tree);

			const spinner = ora(
				`Updating ${selectedComponents.length} component(s) and dependencies...`
			).start();
			for (const item of payload) {
				spinner.text = `Updating ${item.name}...`;
				const targetDir = await getItemTargetPath(config, item);

				if (!targetDir) {
					continue;
				}

				if (!existsSync(targetDir)) {
					await fs.mkdir(targetDir, { recursive: true });
				}

				for (const file of item.files) {
					const componentDir = path.resolve(targetDir, item.name);
					let filePath = path.resolve(
						targetDir,
						item.name,
						file.name
					);

					// Run transformers.
					const content = await transform({
						filename: file.name,
						raw: file.content,
						config,
						baseColor: registryBaseColor
					});

					if (!existsSync(componentDir)) {
						await fs.mkdir(componentDir, { recursive: true });
					}

					await fs.writeFile(filePath, content);
				}

				// Install dependencies.
				if (item.dependencies?.length) {
					const packageManager = await getPackageManager(cwd);
					await execa(
						packageManager,
						[
							packageManager === "npm" ? "install" : "add",
							...item.dependencies
						],
						{
							cwd
						}
					);
				}
			}
			spinner.succeed(`Done.`);
		} catch (e) {
			handleError(e);
		}
	});

async function promptForComponents(
	components: RegistryItem[],
	message: string
): Promise<RegistryItem[]> {
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
