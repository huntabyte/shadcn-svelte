import color from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import * as v from "valibot";
import { detectPM } from "../utils/auto-detect.js";
import { ConfigError, error, handleError } from "../utils/errors.js";
import * as cliConfig from "../utils/get-config.js";
import { getEnvProxy } from "../utils/get-env-proxy.js";
import { intro, prettifyList } from "../utils/prompt-helpers.js";
import * as p from "../utils/prompts.js";
import {
	fetchTree,
	// getRegistryBaseColor,
	getRegistryIndex,
	getRegistryItemFileTargetPath,
	resolveTree,
	setRegistry,
} from "../utils/registry/index.js";
import { transformImports } from "../utils/transformers.js";

const highlight = (...args: unknown[]) => color.bold.cyan(...args);

const addOptionsSchema = v.object({
	components: v.optional(v.array(v.string())),
	yes: v.boolean(),
	all: v.boolean(),
	overwrite: v.boolean(),
	cwd: v.string(),
	path: v.optional(v.string()),
	deps: v.boolean(),
	proxy: v.optional(v.string()),
});

type AddOptions = v.InferOutput<typeof addOptionsSchema>;

export const add = new Command()
	.command("add")
	.description("add components to your project")
	.argument("[components...]", "name of components")
	.option("-c, --cwd <cwd>", "the working directory", process.cwd())
	.option("--no-deps", "skips adding & installing package dependencies")
	.option("-a, --all", "install all components to your project", false)
	.option("-y, --yes", "skip confirmation prompt", false)
	.option("-o, --overwrite", "overwrite existing files", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy", getEnvProxy())
	.option("-p, --path <path>", "the path to add the component to")
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

			const config = await cliConfig.getConfig(cwd);
			if (!config) {
				throw new ConfigError(
					`Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
				);
			}

			setRegistry(config.registry);

			await runAdd(cwd, config, options);

			p.outro(`${color.green("Success!")} Component installation completed.`);
		} catch (error) {
			handleError(error);
		}
	});

async function runAdd(cwd: string, config: cliConfig.Config, options: AddOptions) {
	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}

	const registryIndex = await getRegistryIndex();

	let selectedComponents = new Set(
		options.all ? registryIndex.map(({ name }) => name) : options.components
	);

	const registryDepMap = new Map<string, string[]>();
	for (const item of registryIndex) {
		registryDepMap.set(item.name, item.registryDependencies);
	}

	if (selectedComponents === undefined || selectedComponents.size === 0) {
		const components = await p.multiselect({
			message: `Which ${highlight("components")} would you like to install?`,
			maxItems: 10,
			options: registryIndex.map(({ name, dependencies, registryDependencies }) => {
				const deps = [...(options.deps ? dependencies : []), ...registryDependencies];
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
		selectedComponents = new Set(components);
	} else {
		const prettyList = prettifyList(Array.from(selectedComponents));
		p.log.step(`Components to install:\n${color.gray(prettyList)}`);
	}

	// adds `registryDependency` to `selectedComponents` so that they can be individually overwritten
	for (const name of selectedComponents) {
		if (registryDepMap.has(name)) {
			const regDeps = registryDepMap.get(name);
			regDeps?.forEach((dep) => selectedComponents.add(dep));
		} else {
			const tree = await resolveTree({
				index: registryIndex,
				names: [name],
				includeRegDeps: true,
				config,
			});
			for (const item of tree) {
				console.log(
					"item name:",
					item.name,
					"registryDependencies:",
					item.registryDependencies
				);
				registryDepMap.set(item.name, item.registryDependencies);
				for (const regDep of item.registryDependencies) {
					const regDeps = registryDepMap.get(regDep);
					regDeps?.forEach((dep) => selectedComponents.add(dep));
				}
			}
		}
	}

	const tree = await resolveTree({
		index: registryIndex,
		names: Array.from(selectedComponents),
		includeRegDeps: false,
		config,
	});

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
		if (selectedComponents.has(item.name) === false) continue;
		for (const regDep of item.registryDependencies) {
			selectedComponents.add(regDep);
		}

		const targetDir = getRegistryItemFileTargetPath(config, item, targetPath);
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
			message: `Ready to install ${highlight("components")}${options.deps ? ` and ${highlight("dependencies")}?` : "?"}`,
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
		const targetDir = getRegistryItemFileTargetPath(config, item, targetPath);
		if (targetDir === null) continue;

		if (!existsSync(targetDir)) {
			await fs.mkdir(targetDir, { recursive: true });
		}

		const componentPath = path.relative(process.cwd(), path.resolve(targetDir, item.name));

		if (!options.overwrite && existingComponents.includes(item.name)) {
			// Only confirm overwrites for selected components and not transitive dependencies
			if (selectedComponents.has(item.name)) {
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
		if (options.deps) {
			item.dependencies.forEach((dep) => dependencies.add(dep));
		} else {
			item.dependencies.forEach((dep) => skippedDeps.add(dep));
		}

		// Install Component
		tasks.push({
			title: `Installing ${highlight(item.name)}`,
			async task() {
				for (const file of item.files) {
					const componentDir = path.resolve(targetDir, item.name);
					const filePath = path.resolve(targetDir, item.name, file.name);

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
	const commands = await detectPM(cwd, options.deps);
	if (commands) {
		const [pm, add] = commands.add.split(" ") as [string, string];
		tasks.push({
			title: `${highlight(pm)}: Installing dependencies`,
			enabled: dependencies.size > 0,
			async task() {
				await execa(pm, [add, ...dependencies], {
					cwd,
				});
				return `Dependencies installed with ${highlight(pm)}`;
			},
		});
	}

	// Update the config
	tasks.push({
		title: "Updating config file",
		async task() {
			cliConfig.writeConfig(cwd, config);
			return `Config file ${highlight("components.json")} updated`;
		},
	});

	await p.tasks(tasks);

	if (!options.deps) {
		const prettyList = prettifyList([...skippedDeps], 7);
		p.log.warn(
			`Components have been installed ${color.bold.red("without")} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
