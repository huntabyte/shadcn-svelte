import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import color from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import * as z from "zod";
import { getConfig, type Config } from "../utils/get-config.js";
import { getEnvProxy } from "../utils/get-env-proxy.js";
import { getPackageManager } from "../utils/get-package-manager.js";
import { handleError } from "../utils/handle-error.js";
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

const addOptionsSchema = z.object({
	components: z.array(z.string()).optional(),
	yes: z.boolean(),
	all: z.boolean(),
	overwrite: z.boolean(),
	cwd: z.string(),
	path: z.string().optional(),
	nodep: z.boolean(),
	proxy: z.string().optional(),
});

export const add = new Command()
	.command("add")
	.description("add components to your project")
	.argument("[components...]", "name of components")
	.option("--nodep", "disables adding & installing dependencies.", false)
	.option("-a, --all", "install all components to your project.", false)
	.option("-y, --yes", "skip confirmation prompt.", false)
	.option("-o, --overwrite", "overwrite existing files.", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy.")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.option("-p, --path <path>", "the path to add the component to.")
	.action(async (components, opts) => {
		try {
			intro();
			const options = addOptionsSchema.parse({
				components,
				...opts,
			});

			const cwd = path.resolve(options.cwd);

			if (!existsSync(cwd)) {
				p.cancel(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
				process.exit(1);
			}

			const config = await getConfig(cwd);
			if (!config) {
				p.cancel(
					`Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
				);
				process.exit(1);
			}

			await runAdd(cwd, config, options);

			p.outro(`${color.green("Success!")} Component installation completed.`);
		} catch (error) {
			handleError(error);
		}
	});

async function runAdd(cwd: string, config: Config, options: z.infer<typeof addOptionsSchema>) {
	const proxy = options.proxy ?? getEnvProxy();
	if (proxy) {
		const isCustom = !!options.proxy;
		if (isCustom) process.env.HTTP_PROXY = options.proxy;

		p.log.warn(
			`You are using a ${isCustom ? "provided" : "system environment"} proxy: ${color.green(proxy)}`
		);
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
	const depsToInstall = new Set<string>();
	const packageManager = await getPackageManager(cwd);

	// TODO: registryDependencies are not considered
	for (const item of payload) {
		const targetPath = options.path ? path.resolve(cwd, options.path) : undefined;
		const targetDir = await getItemTargetPath(config, item, targetPath);

		// TODO: what is this case?
		if (!targetDir) {
			continue;
		}

		if (!existsSync(targetDir)) {
			await fs.mkdir(targetDir, { recursive: true });
		}

		const componentPath = path.relative(process.cwd(), path.resolve(targetDir, item.name));

		const existingComponent = item.files.filter((file) => {
			return existsSync(path.resolve(targetDir, item.name, file.name));
		});

		if (existingComponent.length && !options.overwrite) {
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

		const installSpinner = p.spinner();
		installSpinner.start(`Installing ${highlight(item.name)}`);

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

		// Install dependencies.
		if (item.dependencies.length) {
			if (options.nodep) {
				item.dependencies.forEach((dep) => skippedDeps.add(dep));
			} else {
				item.dependencies.forEach((dep) => depsToInstall.add(dep));
			}
		}

		installSpinner.stop(`${highlight(item.name)} installed at ${color.gray(componentPath)}`);
	}

	// Install dependencies.
	if (depsToInstall.size > 0) {
		const spinner = p.spinner();
		spinner.start("Installing package dependencies");
		await execa(packageManager, ["add", ...depsToInstall], {
			cwd,
		});
		spinner.stop("Dependencies installed");
	}

	if (options.nodep) {
		const prettyList = prettifyList([...skippedDeps], 7);
		p.log.warn(
			`Components have been installed ${color.bold.red("without")} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
