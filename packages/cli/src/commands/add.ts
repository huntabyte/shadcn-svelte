import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import color from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import * as v from "valibot";
import { getConfig, type Config } from "../utils/get-config.js";
import { getEnvProxy } from "../utils/get-env-proxy.js";
import { getPackageManager } from "../utils/get-package-manager.js";
import { ConfigError, error, handleError } from "../utils/errors.js";
import {
	fetchTree,
	getItemTargetPath,
	// getRegistryBaseColor,
	getRegistryIndex,
	resolveTree,
} from "../utils/registry";
import { transformImports } from "../utils/transformers.js";
import * as p from "../utils/prompts.js";
import { intro, prettifyList } from "../utils/prompt-helpers.js";

const highlight = (...args: unknown[]) => color.bold.cyan(...args);

const addOptionsSchema = v.object({
	components: v.optional(v.array(v.string())),
	yes: v.boolean(),
	all: v.boolean(),
	overwrite: v.boolean(),
	cwd: v.string(),
	path: v.optional(v.string()),
	nodep: v.boolean(),
	proxy: v.optional(v.string()),
});

type AddOptions = v.Output<typeof addOptionsSchema>;

export const add = new Command()
	.command("add")
	.description("add components to your project")
	.argument("[components...]", "name of components")
	.option("--nodep", "skips adding & installing package dependencies.", false)
	.option("-a, --all", "install all components to your project.", false)
	.option("-y, --yes", "skip confirmation prompt.", false)
	.option("-o, --overwrite", "overwrite existing files.", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy.", getEnvProxy())
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.option("-p, --path <path>", "the path to add the component to.")
	.action(async (components, opts) => {
		try {
			intro();
			const options = v.parse(addOptionsSchema, {
				components,
				...opts,
			});

			const cwd = path.resolve(options.cwd);

			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			const config = await getConfig(cwd);
			if (!config) {
				throw new ConfigError(
					`Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
				);
			}

			await runAdd(cwd, config, options);

			p.outro(`${color.green("Success!")} Component installation completed.`);
		} catch (error) {
			handleError(error);
		}
	});

async function runAdd(cwd: string, config: Config, options: AddOptions) {
	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}

	const registryIndex = await getRegistryIndex();

	let selectedComponents = options.all ? registryIndex.map(({ name }) => name) : options.components;

	if (selectedComponents === undefined || selectedComponents.length === 0) {
		const components = await p.multiselect({
			message: `Which ${highlight("components")} would you like to install?`,
			maxItems: 10,
			options: registryIndex.map(({ name, dependencies, registryDependencies }) => {
				const deps = [...(options.nodep ? [] : dependencies), ...registryDependencies];
				return {
					label: name,
					value: name,
					hint: deps.length ? `also installs: ${deps.join(", ")}` : undefined,
				};
			}),
		});

		if (p.isCancel(components)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}
		selectedComponents = components;
	} else {
		const prettyList = prettifyList(selectedComponents);
		p.log.step(`Components to install:\n${color.gray(prettyList)}`);
	}

	const tree = await resolveTree(registryIndex, selectedComponents);
	const payload = await fetchTree(config, tree);
	// const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);

	if (payload.length === 0) {
		p.cancel("Selected components not found.");
		process.exit(0);
	}

	// build a list of existing components
	const existingComponents: string[] = [];
	const targetPath = options.path ? path.resolve(cwd, options.path) : undefined;
	for (const item of payload) {
		if (selectedComponents.includes(item.name) === false) continue;

		const targetDir = getItemTargetPath(config, item, targetPath);
		if (targetDir === null) continue;

		const componentExists = item.files.some((file) => {
			return existsSync(path.resolve(targetDir, item.name, file.name));
		});

		if (componentExists) {
			existingComponents.push(item.name);
		}
	}

	// prompt if the user wants to overwrite ALL components or individually
	if (options.overwrite === false && existingComponents.length > 0) {
		const prettyList = prettifyList(existingComponents);
		p.log.warn(
			`The following components ${color.bold.yellow("already exists")}:\n${color.gray(prettyList)}`
		);

		const overwrite = await p.confirm({
			message: `Would you like to ${color.bold.red("overwrite")} all existing components?`,
			active: "Yes, overwrite everything",
			inactive: "No, let me decide individually",
			initialValue: false,
		});

		if (p.isCancel(overwrite)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		options.overwrite = overwrite;
	}

	if (options.yes === false) {
		const proceed = await p.confirm({
			message: `Ready to install ${highlight("components")}${options.nodep ? "?" : ` and ${highlight("dependencies")}?`}`,
			initialValue: true,
		});

		if (p.isCancel(proceed) || proceed === false) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}
	}

	const skippedDeps = new Set<string>();
	const dependencies = new Set<string>();
	const tasks: p.Task[] = [];
	for (const item of payload) {
		const targetDir = getItemTargetPath(config, item, targetPath);
		if (targetDir === null) continue;

		if (!existsSync(targetDir)) {
			await fs.mkdir(targetDir, { recursive: true });
		}

		const componentPath = path.relative(process.cwd(), path.resolve(targetDir, item.name));

		if (!options.overwrite && existingComponents.includes(item.name)) {
			// Only confirm overwrites for selected components and not transitive dependencies
			if (selectedComponents.includes(item.name)) {
				p.log.warn(
					`Component ${highlight(item.name)} already exists at ${color.gray(componentPath)}`
				);
				const overwrite = await p.confirm({
					message: `Would you like to ${color.bold.red("overwrite")} your existing ${highlight(item.name)} component?`,
				});
				if (p.isCancel(overwrite)) {
					p.cancel("Operation cancelled.");
					process.exit(0);
				}
				if (overwrite === false) continue;
			}
		}

		// Add dependencies to the install list
		if (options.nodep) {
			item.dependencies.forEach((dep) => skippedDeps.add(dep));
		} else {
			item.dependencies.forEach((dep) => dependencies.add(dep));
		}

		// Install Component
		tasks.push({
			title: `Installing ${highlight(item.name)}`,
			async task() {
				for (const file of item.files) {
					const componentDir = path.resolve(targetDir, item.name);
					let filePath = path.resolve(targetDir, item.name, file.name);

					// Run transformers.
					const content = transformImports(file.content, config);

					if (!existsSync(componentDir)) {
						await fs.mkdir(componentDir, { recursive: true });
					}

					await fs.writeFile(filePath, content);
				}

				return `${highlight(item.name)} installed at ${color.gray(componentPath)}`;
			},
		});
	}

	// Install dependencies.
	tasks.push({
		title: "Installing package dependencies",
		enabled: dependencies.size > 0,
		async task() {
			const packageManager = await getPackageManager(cwd);
			await execa(packageManager, ["add", ...dependencies], {
				cwd,
			});
			return "Dependencies installed";
		},
	});

	await p.tasks(tasks);

	if (options.nodep) {
		const prettyList = prettifyList([...skippedDeps], 7);
		p.log.warn(
			`Components have been installed ${color.bold.red("without")} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
