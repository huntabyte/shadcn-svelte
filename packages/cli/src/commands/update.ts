import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "chalk";
import merge from "deepmerge";
import { Command } from "commander";
import { exec } from "tinyexec";
import * as v from "valibot";
import { detectPM } from "../utils/auto-detect.js";
import { error, handleError } from "../utils/errors.js";
import * as cliConfig from "../utils/get-config.js";
import { getEnvProxy } from "../utils/get-env-proxy.js";
import { cancel, intro, prettifyList } from "../utils/prompt-helpers.js";
import * as p from "../utils/prompts.js";
import * as registry from "../utils/registry/index.js";
import { UTILS, UTILS_JS } from "../utils/templates.js";
import { updateCssVars } from "../utils/updaters.js";
import { transformContent } from "../utils/transformers.js";
import { resolveCommand } from "package-manager-detector/commands";
import { checkPreconditions } from "../utils/preconditions.js";

const highlight = (msg: string) => color.bold.cyan(msg);

const updateOptionsSchema = v.object({
	all: v.boolean(),
	components: v.optional(v.array(v.string())),
	cwd: v.string(),
	proxy: v.optional(v.string()),
	yes: v.boolean(),
});

type UpdateOptions = v.InferOutput<typeof updateOptionsSchema>;

export const update = new Command()
	.command("update")
	.description("update components in your project")
	.argument("[components...]", "name of components")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-a, --all", "update all existing components", false)
	.option("-y, --yes", "skip confirmation prompt", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy", getEnvProxy())
	.action(async (components, opts) => {
		intro();

		try {
			const options = v.parse(updateOptionsSchema, {
				components,
				...opts,
			});

			const cwd = path.resolve(options.cwd);

			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			const config = await cliConfig.getConfig(cwd);
			if (!config) {
				throw error(
					`Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
				);
			}

			checkPreconditions(cwd);

			await runUpdate(cwd, config, options);

			p.note(
				`This action ${color.underline("does not")} update your ${highlight("dependencies")} to their ${color.bold("latest")} versions.\n\nConsider updating them as well.`
			);

			p.outro(`${color.green("Success!")} Component update completed.`);
		} catch (e) {
			handleError(e);
		}
	});

async function runUpdate(cwd: string, config: cliConfig.Config, options: UpdateOptions) {
	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}

	const components = options.components;

	const registryUrl = registry.getRegistryUrl(config);
	const registryIndex = await registry.getRegistryIndex(registryUrl);

	const componentDir = path.resolve(config.resolvedPaths.components, "ui");
	if (!existsSync(componentDir)) {
		throw error(`Component directory ${color.cyan(componentDir)} does not exist.`);
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
		title: "utils",
		type: "registry:ui",
		dependencies: [],
		registryDependencies: [],
		devDependencies: [],
		relativeUrl: "",
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

		if (p.isCancel(selected)) cancel();

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

		if (p.isCancel(proceed) || proceed === false) cancel();
	}

	const tasks: p.Task[] = [];

	const utils = selectedComponents.find((item) => item.name === "utils");
	// `update utils` - update the utils.(ts|js) file
	if (utils) {
		// remove utils so that it isn't fetched from the registry
		selectedComponents = selectedComponents.filter((item) => item !== utils);

		const extension = config.typescript ? ".ts" : ".js";
		const utilsPath = config.resolvedPaths.utils + extension;

		if (!existsSync(utilsPath)) {
			throw error(`Failed to find ${highlight("utils")} at ${color.cyan(utilsPath)}`);
		}

		tasks.push({
			title: `Updating ${highlight(utilsPath)}`,
			async task() {
				// utils.(ts|js) is not in the registry, it is a template, so we'll just overwrite it
				await fs.writeFile(utilsPath, config.typescript ? UTILS : UTILS_JS);
			},
		});
	}

	const resolvedItems = await registry.resolveRegistryItems({
		baseUrl: registryUrl,
		registryIndex: registryIndex,
		items: selectedComponents.map((com) => com.name),
	});

	const payload = await registry.fetchRegistryItems({
		baseUrl: registryUrl,
		items: resolvedItems,
	});
	payload.sort((a, b) => a.name.localeCompare(b.name));

	const componentsToRemove: Record<string, string[]> = {};
	const dependencies = new Set<string>();
	let cssVars = {};
	for (const item of payload) {
		const targetDir = registry.getItemTargetPath(config, item);
		if (!targetDir) {
			continue;
		}

		// Add dependencies to the install list
		item.dependencies.forEach((dep) => dependencies.add(dep));

		// Update Components
		tasks.push({
			title: `Updating ${highlight(item.name)}`,
			async task() {
				if (!existsSync(targetDir)) {
					await fs.mkdir(targetDir, { recursive: true });
				}

				const componentDir = path.resolve(targetDir, item.name);
				if (!existsSync(componentDir)) {
					await fs.mkdir(componentDir, { recursive: true });
				}

				for (const file of item.files) {
					let filePath = registry.resolveItemFilePath(config, item, file);
					if (!config.typescript && filePath.endsWith(".ts")) {
						filePath = filePath.replace(".ts", ".js");
					}

					// Run transformers.
					const content = await transformContent(file.content, filePath, config);

					await fs.writeFile(filePath, content, "utf8");
				}

				if (item.cssVars) {
					cssVars = merge(cssVars, item.cssVars);
				}

				const installedFiles = await fs.readdir(componentDir);
				const remoteFiles = item.files.map((file) => {
					const name = "name" in file ? file.name : path.basename(file.target);
					if (!config.typescript && name.endsWith(".ts")) {
						return name.replace(".ts", ".js");
					}
					return name;
				});
				const filesToDelete = installedFiles
					.filter((file) => !remoteFiles.includes(file))
					.map((file) => path.resolve(targetDir, item.name, file));

				if (filesToDelete.length > 0) {
					componentsToRemove[item.name] = filesToDelete;
				}

				const componentPath = path.relative(
					process.cwd(),
					path.resolve(targetDir, item.name)
				);
				return `${highlight(item.name)} updated at ${color.gray(componentPath)}`;
			},
		});
	}

	// Install dependencies.
	const pm = await detectPM(cwd, true);
	if (pm) {
		const add = resolveCommand(pm, "add", ["-D", ...dependencies]);
		if (!add) throw error(`Could not detect a package manager in ${cwd}.`);
		tasks.push({
			title: `${highlight(pm)}: Installing dependencies`,
			enabled: dependencies.size > 0,
			async task() {
				await exec(add.command, [...add.args], {
					throwOnError: true,
					nodeOptions: { cwd },
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

	if (Object.keys(cssVars).length > 0) {
		// Update the stylesheet
		tasks.push({
			title: "Updating stylesheet",
			async task() {
				const cssPath = config.resolvedPaths.tailwindCss;
				const cssSource = await fs.readFile(cssPath, "utf8");

				const updatedCss = updateCssVars(cssSource, cssVars);
				await fs.writeFile(cssPath, updatedCss, "utf8");

				const relative = path.relative(cwd, cssPath);
				return `Stylesheet ${highlight(relative)} updated`;
			},
		});
	}

	await p.tasks(tasks);

	for (const [component, files] of Object.entries(componentsToRemove)) {
		p.log.warn(
			`The ${highlight(component)} component does not use the following files:\n${files.map((file) => color.white(`- ${color.gray(path.relative(cwd, file))}`)).join("\n")}`
		);
	}
	if (Object.keys(componentsToRemove).length > 0) {
		p.log.message(color.bold("You may want to delete them."));
	}
}
