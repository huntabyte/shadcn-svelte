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
import { cancel, intro, prettifyList } from "../utils/prompt-helpers.js";
import * as p from "../utils/prompts.js";
import * as registry from "../utils/registry/index.js";
import { transformImports } from "../utils/transformers.js";
import { resolveCommand } from "package-manager-detector/commands";
import { checkPreconditions } from "../utils/preconditions.js";

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

			registry.setRegistry(config.registry);

			checkPreconditions(cwd);

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

	const uiRegistryIndex = await registry.getRegistryIndex();

	let selectedComponents = new Set(
		options.all ? uiRegistryIndex.map(({ name }) => name) : options.components
	);

	const registryDepMap = new Map<string, string[]>();
	for (const item of uiRegistryIndex) {
		registryDepMap.set(item.name, item.registryDependencies);
	}

	if (selectedComponents === undefined || selectedComponents.size === 0) {
		const components = await p.multiselect({
			message: `Which ${highlight("components")} would you like to install?`,
			maxItems: 10,
			options: uiRegistryIndex.map(({ name, dependencies, registryDependencies }) => {
				const deps = [...(options.deps ? dependencies : []), ...registryDependencies];
				return {
					label: name,
					value: name,
					hint: deps.length ? `also installs: ${deps.join(", ")}` : undefined,
				};
			}),
		});

		if (p.isCancel(components)) cancel();
		selectedComponents = new Set(components);
	} else {
		const prettyList = prettifyList(Array.from(selectedComponents));
		p.log.step(`Components to install:\n${color.gray(prettyList)}`);
	}

	/**
	 * Adds all the selected items and their registry dependencies to the `selectedComponents`
	 * set so that they can be individually overwritten.
	 */
	for (const name of selectedComponents) {
		if (registryDepMap.has(name)) {
			/**
			 * We will have all the `ui` registry dependencies in the `registryDepMap`,
			 * so if the `name` is a `ui` component, we go ahead and add its dependencies
			 * to the `selectedComponents` set.
			 */
			const regDeps: string[] = registryDepMap.get(name) ?? [];
			for (const dep of regDeps) {
				selectedComponents.add(dep);
			}
		} else {
			/**
			 * For blocks, hooks, etc. we need to resolve the tree to get their dependencies
			 * and add them to the `selectedComponents` set.
			 */
			const tree = await registry.resolveTree({
				index: uiRegistryIndex,
				names: [name],
				includeRegDeps: true,
				config,
			});
			for (const item of tree) {
				for (const dep of item.registryDependencies) {
					// we first add the reg dep to the selected components
					selectedComponents.add(dep);
					const depRegDeps: string[] = registryDepMap.get(dep) ?? [];
					// we then add each of that dep's deps to the `selectedComponents` set
					for (const depRegDep of depRegDeps) {
						selectedComponents.add(depRegDep);
					}
				}
			}
		}
	}

	const tree = await registry.resolveTree({
		index: uiRegistryIndex,
		names: Array.from(selectedComponents),
		includeRegDeps: false,
		config,
	});

	const payload = await registry.fetchTree(config, tree);
	// const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);

	if (payload.length === 0) cancel("Selected components not found.");

	// build a list of existing components
	const existingComponents: string[] = [];
	const targetPath = options.path ? path.resolve(cwd, options.path) : undefined;
	for (const item of payload) {
		if (selectedComponents.has(item.name) === false) continue;
		for (const regDep of item.registryDependencies) {
			selectedComponents.add(regDep);
		}

		const targetDir = registry.getRegistryItemTargetPath(config, item.type, targetPath);

		if (targetDir === null) continue;

		const componentExists = item.files.some((file) => {
			return existsSync(path.resolve(targetDir, file.target));
		});
		if (componentExists) {
			existingComponents.push(item.name);
		}
	}

	// prompt if the user wants to overwrite ALL components or individually
	if (options.overwrite === false && existingComponents.length > 0) {
		const prettyList = prettifyList(existingComponents);
		p.log.warn(
			`The following components/hooks ${color.bold.yellow("already exist")}:\n${color.gray(prettyList)}`
		);

		const overwrite = await p.confirm({
			message: `Would you like to ${color.bold.red("overwrite")} all existing components?`,
			active: "Yes, overwrite everything",
			inactive: "No, let me decide individually",
			initialValue: false,
		});

		if (p.isCancel(overwrite)) cancel();

		options.overwrite = overwrite;
	}

	if (options.yes === false) {
		const proceed = await p.confirm({
			message: `Ready to install ${highlight("components")}${options.deps ? ` and ${highlight("dependencies")}?` : "?"}`,
			initialValue: true,
		});

		if (p.isCancel(proceed) || proceed === false) cancel();
	}

	const skippedDeps = new Set<string>();
	const dependencies = new Set<string>();
	const tasks: p.Task[] = [];

	for (const item of payload) {
		const targetDir = registry.getRegistryItemTargetPath(config, item.type, targetPath);
		if (targetDir === null) continue;

		if (!existsSync(targetDir)) {
			await fs.mkdir(targetDir, { recursive: true });
		}

		const componentPath = path.relative(cwd, path.resolve(targetDir, item.name));

		if (!options.overwrite && existingComponents.includes(item.name)) {
			// Only confirm overwrites for selected components and not transitive dependencies
			if (selectedComponents.has(item.name)) {
				if (item.type === "registry:hook") {
					p.log.warn(
						`Hook ${highlight(item.name)} already exists at ${color.gray(componentPath)}`
					);
				} else {
					p.log.warn(
						`Component ${highlight(item.name)} already exists at ${color.gray(componentPath)}`
					);
				}
				const type = item.type === "registry:hook" ? "hook" : "component";
				const overwrite = await p.confirm({
					message: `Would you like to ${color.bold.red("overwrite")} your existing ${highlight(item.name)} ${type}?`,
				});
				if (p.isCancel(overwrite)) cancel();
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
				let pageName: string | undefined;
				for (const file of item.files) {
					const targetDir = registry.getRegistryItemTargetPath(config, file.type);
					const filePath = path.resolve(targetDir, file.target);

					// Run transformers.
					const content = transformImports(file.content, config);

					const dir = path.parse(filePath).dir;
					if (!existsSync(dir)) {
						await fs.mkdir(dir, { recursive: true });
					}

					await fs.writeFile(filePath, content);
					if (file.type === "registry:page") {
						pageName = file.target;
					}
				}
				if (item.type === "registry:block") {
					const blockPath = path.relative(cwd, targetDir);
					if (pageName) {
						return `${highlight(item.name)} page installed at ${color.gray(`${blockPath}/${pageName}`)}`;
					}
					return `${highlight(item.name)} components installed at ${color.gray(blockPath)}.`;
				}

				return `${highlight(item.name)} installed at ${color.gray(componentPath)}`;
			},
		});
	}

	// Install dependencies.
	const pm = await detectPM(cwd, options.deps);
	if (pm) {
		const add = resolveCommand(pm, "add", ["-D", ...dependencies]);
		if (!add) throw error(`Could not detect a package manager in ${cwd}.`);
		tasks.push({
			title: `${highlight(pm)}: Installing dependencies`,
			enabled: dependencies.size > 0,
			async task() {
				await execa(add.command, [...add.args], {
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
