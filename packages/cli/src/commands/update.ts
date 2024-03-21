import { existsSync, promises as fs } from "fs";
import path from "path";
import color from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import * as z from "zod";
import { getConfig, type Config } from "../utils/get-config";
import { getPackageManager } from "../utils/get-package-manager";
import { handleError } from "../utils/handle-error";
import { fetchTree, getItemTargetPath, getRegistryIndex, resolveTree } from "../utils/registry";
import { UTILS } from "../utils/templates";
import { transformImports } from "../utils/transformers";
import * as p from "../utils/prompts.js";
import { intro, prettifyList } from "../utils/prompt-helpers.js";
import { getEnvProxy } from "../utils/get-env-proxy.js";

const updateOptionsSchema = z.object({
	all: z.boolean(),
	components: z.array(z.string()).optional(),
	cwd: z.string(),
	proxy: z.string().optional(),
	yes: z.boolean(),
});
const highlight = (msg: string) => color.bold.cyan(msg);

export const update = new Command()
	.command("update")
	.description("update components in your project")
	.argument("[components...]", "name of components")
	.option("-a, --all", "update all existing components.", false)
	.option("-y, --yes", "skip confirmation prompt.", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy.")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async (components, opts) => {
		intro();

		try {
			const options = updateOptionsSchema.parse({
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

			await runUpdate(cwd, config, options);

			p.note(
				`This action ${color.underline("does not")} update your ${highlight("dependencies")} to their ${color.bold("latest")} versions.\n\nConsider updating them as well.`
			);

			p.outro(`${color.green("Success!")} Component update completed.`);
		} catch (e) {
			handleError(e);
		}
	});

async function runUpdate(
	cwd: string,
	config: Config,
	options: z.infer<typeof updateOptionsSchema>
) {
	const components = options.components;

	const proxy = options.proxy ?? getEnvProxy();
	if (proxy) {
		const isCustom = !!options.proxy;
		if (isCustom) process.env.HTTP_PROXY = options.proxy;

		p.log.warn(
			`You are using a ${isCustom ? "provided" : "system environment"} proxy: ${color.green(proxy)}`
		);
	}

	const registryIndex = await getRegistryIndex();

	const componentDir = path.resolve(config.resolvedPaths.components, "ui");
	if (!existsSync(componentDir)) {
		p.cancel(`Component directory ${color.cyan(componentDir)} does not exist.`);
		process.exit(1);
	}

	// Retrieve existing components in user's project
	const existingComponents: typeof registryIndex = [];
	const files = await fs.readdir(componentDir, {
		withFileTypes: true,
	});
	for (const file of files) {
		if (file.isDirectory()) {
			const component = registryIndex.find((comp) => comp.name === file.name);
			if (component) {
				// is a valid shadcn component
				existingComponents.push(component);
			}
		}
	}
	// add `utils` option to the end
	existingComponents.push({
		name: "utils",
		type: "components:ui",
		files: [],
		dependencies: [],
		registryDependencies: [],
	});

	// If the user specifies component args
	let selectedComponents = options.all ? existingComponents : [];
	if (selectedComponents.length === 0 && components !== undefined) {
		// ...only add valid components to the list
		selectedComponents = existingComponents.filter((component) =>
			components.includes(component.name)
		);
	}

	// If user didn't specify any component arguments
	if (selectedComponents.length === 0) {
		const selected = await p.multiselect({
			message: "Which components would you like to update?",
			maxItems: 10,
			options: existingComponents.map((component) => ({
				label: component.name,
				value: component,
				hint: component.registryDependencies.length
					? `also updates: ${component.registryDependencies.join(", ")}`
					: undefined,
			})),
		});

		if (p.isCancel(selected)) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		selectedComponents = selected;
	} else {
		const prettyList = prettifyList(selectedComponents.map(({ name }) => name));
		p.log.step(`Components to update:\n${color.gray(prettyList)}`);
	}

	if (options.yes === false) {
		const proceed = await p.confirm({
			message: `Ready to update ${highlight("components")}? ${color.gray("(Make sure you have committed your changes before proceeding!)")}`,
			initialValue: true,
		});

		if (p.isCancel(proceed) || proceed === false) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}
	}

	// `update utils` - update the utils.(ts|js) file
	if (selectedComponents.find((item) => item.name === "utils")) {
		const extension = config.typescript ? ".ts" : ".js";
		const utilsPath = config.resolvedPaths.utils + extension;

		if (!existsSync(utilsPath)) {
			p.cancel(`Failed to find ${highlight("utils")} at ${color.cyan(utilsPath)}`);
			process.exit(1);
		}

		// utils.(ts|js) is not in the registry, it is a template, so we'll just overwrite it
		await fs.writeFile(utilsPath, UTILS);
	}

	const tree = await resolveTree(
		registryIndex,
		selectedComponents.map((com) => com.name)
	);
	const payload = (await fetchTree(config, tree)).sort((a, b) => a.name.localeCompare(b.name));

	const componentsToRemove: Record<string, string[]> = {};
	const dependencies = new Set<string>();
	for (const item of payload) {
		const updateSpinner = p.spinner();
		updateSpinner.start(`Updating ${highlight(item.name)}`);
		const targetDir = getItemTargetPath(config, item);

		if (!targetDir) {
			continue;
		}

		if (!existsSync(targetDir)) {
			await fs.mkdir(targetDir, { recursive: true });
		}

		const componentDir = path.resolve(targetDir, item.name);
		if (!existsSync(componentDir)) {
			await fs.mkdir(componentDir, { recursive: true });
		}

		for (const file of item.files) {
			const filePath = path.resolve(targetDir, item.name, file.name);

			// Run transformers.
			const content = transformImports(file.content, config);

			await fs.writeFile(filePath, content);
		}

		const installedFiles = await fs.readdir(componentDir);
		const remoteFiles = item.files.map((file) => file.name);
		const filesToDelete = installedFiles
			.filter((file) => !remoteFiles.includes(file))
			.map((file) => path.resolve(targetDir, item.name, file));

		if (filesToDelete.length > 0) {
			componentsToRemove[item.name] = filesToDelete;
		}

		// Add dependencies to the install list
		item.dependencies.forEach((dep) => dependencies.add(dep));

		const componentPath = path.relative(process.cwd(), path.resolve(targetDir, item.name));
		updateSpinner.stop(`${highlight(item.name)} updated at ${color.gray(componentPath)}`);
	}

	// Install dependencies.
	if (dependencies.size > 0) {
		const spinner = p.spinner();
		spinner.start("Installing new package dependencies");

		const packageManager = await getPackageManager(cwd);
		await execa(packageManager, ["add", ...dependencies], {
			cwd,
		});

		spinner.stop("Dependencies installed");
	}

	for (const [component, files] of Object.entries(componentsToRemove)) {
		p.log.warn(
			`The ${highlight(component)} component does not use the following files:\n${files.map((file) => color.white(`- ${color.gray(path.relative(cwd, file))}`)).join("\n")}`
		);
	}
	if (Object.keys(componentsToRemove).length > 0) {
		p.log.message(color.bold("You may want to delete them."));
	}
}
