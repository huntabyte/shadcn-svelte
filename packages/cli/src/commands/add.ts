import { existsSync, promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";
import { z } from "zod";
import { getConfig } from "../utils/get-config";
import { getEnvProxy } from "../utils/get-env-proxy";
import { getPackageManager } from "../utils/get-package-manager";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";
import {
	fetchTree,
	getItemTargetPath,
	getRegistryBaseColor,
	getRegistryIndex,
	resolveTree
} from "../utils/registry";
import { transformImport } from "../utils/transformer";

const addOptionsSchema = z.object({
	components: z.array(z.string()).optional(),
	yes: z.boolean(),
	all: z.boolean(),
	overwrite: z.boolean(),
	cwd: z.string(),
	path: z.string().optional(),
	nodep: z.boolean(),
	proxy: z.string().optional()
});

export const add = new Command()
	.command("add")
	.description("add components to your project")
	.argument("[components...]", "name of components")
	.option("--nodep", "disable adding & installing dependencies (advanced)", false)
	.option("-a, --all", "Add all components to your project.", false)
	.option("-y, --yes", "Skip confirmation prompt.", false)
	.option("-o, --overwrite", "overwrite existing files.", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy.")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.option("-p, --path <path>", "the path to add the component to.")
	.action(async (components: string[], opts) => {
		const highlight = logger.highlight;

		try {
			const options = addOptionsSchema.parse({
				components,
				...opts
			});

			const cwd = path.resolve(options.cwd);

			if (!existsSync(cwd)) {
				logger.error(`The path ${cwd} does not exist. Please try again.`);
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

			const chosenProxy = options.proxy ?? getEnvProxy();
			if (chosenProxy) {
				const isCustom = !!options.proxy;
				if (isCustom) process.env.HTTP_PROXY = options.proxy;

				logger.warn(
					`You are using a ${
						isCustom ? "provided" : "system environment"
					} proxy: ${chalk.green(chosenProxy)}`
				);
			}

			const registryIndex = await getRegistryIndex();

			let selectedComponents = options.all
				? registryIndex.map(({ name }) => name)
				: options.components;

			if (!selectedComponents?.length) {
				const { components } = await prompts({
					type: "multiselect",
					name: "components",
					message: "Which components would you like to add?",
					hint: "Space to select. A to toggle all. Enter to submit.",
					instructions: false,
					choices: registryIndex.map(({ name }) => ({
						title: name,
						value: name
					}))
				});
				selectedComponents = components;
			}

			if (!selectedComponents?.length) {
				logger.warn("No components selected. Exiting.");
				process.exitCode = 0;
				return;
			}

			const tree = await resolveTree(registryIndex, selectedComponents);
			const payload = await fetchTree(config.style, tree);
			const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);

			if (!payload.length) {
				logger.warn("Selected components not found. Exiting.");
				process.exitCode = 0;
				return;
			}

			logger.info(`Selected components:\n${highlight(selectedComponents)}`);

			if (!options.yes) {
				const { proceed } = await prompts({
					type: "confirm",
					name: "proceed",
					message: `Ready to install components and dependencies. Proceed?`,
					initial: true
				});

				if (!proceed) {
					process.exitCode = 0;
					return;
				}
			}

			const spinner = ora(`Installing components...`).start();
			let skippedDeps = new Set<string>();
			let componentPaths = [];

			for (const item of payload) {
				spinner.text = `Installing ${item.name}...`;
				const targetDir = await getItemTargetPath(
					config,
					item,
					options.path ? path.resolve(cwd, options.path) : undefined
				);

				if (!targetDir) {
					continue;
				}

				if (!existsSync(targetDir)) {
					await fs.mkdir(targetDir, { recursive: true });
				}

				const componentPath = path.relative(
					process.cwd(),
					path.resolve(targetDir, item.name)
				);

				const existingComponent = item.files.filter((file) =>
					existsSync(path.resolve(targetDir, item.name, file.name))
				);

				if (existingComponent.length && !options.overwrite) {
					if (selectedComponents.includes(item.name)) {
						logger.warn(
							`\nComponent ${highlight(
								item.name
							)} already exists at ${highlight(
								componentPath
							)}. Use ${chalk.green("--overwrite")} to overwrite.`
						);
						spinner.stop();
						process.exitCode = 1;
						return;
					}

					continue;
				}

				for (const file of item.files) {
					const componentDir = path.resolve(targetDir, item.name);
					let filePath = path.resolve(targetDir, item.name, file.name);

					// Run transformers.
					const content = transformImport(file.content, config);

					if (!existsSync(componentDir)) {
						await fs.mkdir(componentDir, { recursive: true });
					}

					await fs.writeFile(filePath, content);
				}

				// Install dependencies.
				if (item.dependencies?.length) {
					if (options.nodep) {
						item.dependencies.forEach((dep) => skippedDeps.add(dep));
						continue;
					}

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

				componentPaths.push(componentPath);
			}

			logger.info("");
			logger.info("");
			if (options.nodep) {
				logger.warn(
					`Components have installed without dependencies, consider adding the following to your dependencies:\n- ${[
						...skippedDeps
					].join("\n- ")}`
				);
			}
			spinner.succeed(`Done.`);
			logger.info(
				`Components installed at:\n- ${[...componentPaths].join("\n- ")}`
			);
		} catch (error) {
			handleError(error);
		}
	});
