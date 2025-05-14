import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "chalk";
import merge from "deepmerge";
import { Command } from "commander";
import { exec } from "tinyexec";
import * as v from "valibot";
import semver from "semver";
import { detectPM } from "../utils/auto-detect.js";
import { error, handleError } from "../utils/errors.js";
import * as cliConfig from "../utils/get-config.js";
import { getEnvProxy } from "../utils/get-env-proxy.js";
import { cancel, intro, prettifyList } from "../utils/prompt-helpers.js";
import * as p from "../utils/prompts.js";
import * as registry from "../utils/registry/index.js";
import { transformContent, transformCss } from "../utils/transformers.js";
import { resolveCommand } from "package-manager-detector/commands";
import { checkPreconditions } from "../utils/preconditions.js";
import { loadProjectPackageInfo } from "../utils/get-package-info.js";
import { highlight, parseDependency } from "../utils/utils.js";

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

	const dirs = {
		ui: config.resolvedPaths.ui,
		components: config.resolvedPaths.components,
		hooks: config.resolvedPaths.hooks,
	};

	// Retrieve existing items in the user's project
	const existingComponents: typeof registryIndex = [];
	for (const [name, dir] of Object.entries(dirs)) {
		if (!existsSync(dir)) {
			throw error(`'${name}' directory ${color.cyan(dir)} does not exist.`);
		}

		const files = await fs.readdir(dir, { withFileTypes: true });
		for (const file of files) {
			if (file.isDirectory()) {
				const item = registryIndex.find((item) => item.name === file.name);
				// is a valid shadcn item
				if (item) existingComponents.push(item);
			}
		}
	}

	// Always offer to update the `utils`
	const utilsItem = registryIndex.find((item) => item.name === "utils");
	if (utilsItem) {
		existingComponents.push(utilsItem);
	}

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
				hint: component.registryDependencies?.length
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

	const resolvedItems = await registry.resolveRegistryItems({
		baseUrl: registryUrl,
		registryIndex: registryIndex,
		items: selectedComponents.map((comp) => comp.name),
	});

	const payload = await registry.fetchRegistryItems({
		baseUrl: registryUrl,
		items: resolvedItems,
	});
	payload.sort((a, b) => a.name.localeCompare(b.name));

	const componentsToRemove: Record<string, string[]> = {};
	const dependencies = new Set<string>();
	const devDependencies = new Set<string>();
	let cssVars = {};
	for (const item of payload) {
		const aliasDir = registry.getItemAliasDir(config, item.type);

		// Add dependencies to the install list
		item.dependencies?.forEach((dep) => dependencies.add(dep));
		item.devDependencies?.forEach((dep) => devDependencies.add(dep));

		// Update Components
		tasks.push({
			title: `Updating ${highlight(item.name)}`,
			async task() {
				for (const file of item.files) {
					let filePath = registry.resolveItemFilePath(config, item, file);

					// Run transformers.
					const content = await transformContent(file.content, filePath, config);

					const dir = path.parse(filePath).dir;
					if (!existsSync(dir)) {
						await fs.mkdir(dir, { recursive: true });
					}

					if (!config.typescript && filePath.endsWith(".ts")) {
						filePath = filePath.replace(".ts", ".js");
					}

					await fs.writeFile(filePath, content, "utf8");
				}

				if (item.cssVars) {
					cssVars = merge(cssVars, item.cssVars);
				}

				const itemDir = path.resolve(aliasDir, item.name);
				if (item.files.length > 1) {
					const remoteFiles = item.files.map((file) => {
						const filepath = registry.resolveItemFilePath(config, item, file);
						if (!config.typescript && filepath.endsWith(".ts")) {
							return filepath.replace(".ts", ".js");
						}
						return filepath;
					});

					const installedFiles = await fs.readdir(itemDir, { withFileTypes: true });
					const filesToDelete = installedFiles
						.map((file) => path.resolve(file.path, file.name))
						.filter((filepath) => !remoteFiles.includes(filepath));

					if (filesToDelete.length > 0) {
						componentsToRemove[item.name] = filesToDelete;
					}
				}

				const componentPath = path.relative(options.cwd, itemDir);
				return `${highlight(item.name)} updated at ${color.gray(componentPath)}`;
			},
		});
	}

	// Install dependencies.
	const pm = await detectPM(cwd, true);
	if (pm) {
		const pkg = loadProjectPackageInfo(config.resolvedPaths.cwd);
		const projectDeps = { ...pkg.dependencies, ...pkg.devDependencies };

		const validateDep = (dep: string) => {
			const { name, version } = parseDependency(dep);
			const depVersion = semver.coerce(projectDeps[name]);
			if (depVersion && semver.satisfies(depVersion, version, { loose: true })) {
				return undefined;
			}
			return `${name}@${version}`;
		};

		const devDeps = [...devDependencies].map(validateDep).filter((d) => d !== undefined);
		const addDevDeps = resolveCommand(pm, "add", ["-D", ...devDeps]);

		const deps = [...dependencies].map(validateDep).filter((d) => d !== undefined);
		const addDeps = resolveCommand(pm, "add", deps);

		if (!addDevDeps || !addDeps) throw error(`Could not detect a package manager in ${cwd}.`);
		tasks.push({
			title: `${highlight(pm)}: Installing dependencies`,
			enabled: deps.length > 0 || devDeps.length > 0,
			async task() {
				if (deps.length > 0) {
					await exec(addDeps.command, addDeps.args, {
						throwOnError: true,
						nodeOptions: { cwd },
					});
				}
				if (devDeps.length > 0) {
					await exec(addDevDeps.command, addDevDeps.args, {
						throwOnError: true,
						nodeOptions: { cwd },
					});
				}
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

				const modifiedCss = transformCss(cssSource, cssVars);
				await fs.writeFile(cssPath, modifiedCss, "utf8");

				const relative = path.relative(cwd, cssPath);
				return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
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
