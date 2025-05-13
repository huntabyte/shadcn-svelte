import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "chalk";
import * as v from "valibot";
import semver from "semver";
import merge from "deepmerge";
import { exec } from "tinyexec";
import { Command } from "commander";
import { detectPM } from "../utils/auto-detect.js";
import { ConfigError, error, handleError } from "../utils/errors.js";
import * as cliConfig from "../utils/get-config.js";
import { getEnvProxy } from "../utils/get-env-proxy.js";
import { cancel, intro, prettifyList } from "../utils/prompt-helpers.js";
import * as p from "../utils/prompts.js";
import * as registry from "../utils/registry/index.js";
import { transformContent, transformCss } from "../utils/transformers.js";
import { resolveCommand } from "package-manager-detector/commands";
import { parseDependency } from "../utils/utils.js";
import { loadProjectPackageInfo } from "../utils/get-package-info.js";
import { preflightAdd } from "../utils/preflight-add";
import { highlight } from "../utils/highlight";

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
	.argument("[components...]", "the components to add or a url to the component")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
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

			preflightAdd(cwd);

			const config = await cliConfig.getConfig(cwd);
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

async function runAdd(cwd: string, config: cliConfig.Config, options: AddOptions) {
	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}

	const registryUrl = registry.getRegistryUrl(config);
	const shadcnIndex = await registry.getRegistryIndex(registryUrl);

	let selectedComponents = new Set(
		options.all ? shadcnIndex.map(({ name }) => name) : options.components
	);

	// if the user hasn't passed any components prompt them to select components
	if (selectedComponents.size === 0) {
		const components = await p.multiselect({
			message: `Which ${highlight("components")} would you like to install?`,
			maxItems: 10,
			options: shadcnIndex.map((item) => {
				let deps: string[] = [...(item.registryDependencies ?? [])];
				if (options.deps) {
					deps = deps.concat(item.dependencies ?? []);
					deps = deps.concat(item.devDependencies ?? []);
				}
				return {
					label: item.name,
					value: item.name,
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

	const resolvedItems = await registry.resolveRegistryItems({
		baseUrl: registryUrl,
		items: Array.from(selectedComponents),
		registryIndex: shadcnIndex,
	});

	const itemsWithContent = await registry.fetchRegistryItems({
		baseUrl: registryUrl,
		items: resolvedItems,
	});

	if (itemsWithContent.length === 0) cancel("Selected components not found.");

	// build a list of existing components
	const existingComponents: string[] = [];
	// TODO: deal with this stupid `--path` option
	const targetPath = options.path ? path.resolve(cwd, options.path) : undefined;
	for (const item of itemsWithContent) {
		if (selectedComponents.has(item.name) === false) continue;
		for (const regDep of item.registryDependencies ?? []) {
			selectedComponents.add(regDep);
		}

		const componentExists = item.files.some((file) => {
			const filePath = registry.resolveItemFilePath(config, item, file);
			return existsSync(filePath);
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
	const devDependencies = new Set<string>();
	const tasks: p.Task[] = [];
	let cssVars = {};

	for (const item of itemsWithContent) {
		const aliasDir = registry.getItemAliasDir(config, item.type, targetPath);
		if (!existsSync(aliasDir)) {
			await fs.mkdir(aliasDir, { recursive: true });
		}

		const componentPath = path.relative(cwd, path.resolve(aliasDir, item.name));

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
			item.dependencies?.forEach((dep) => dependencies.add(dep));
			item.devDependencies?.forEach((dep) => devDependencies.add(dep));
		} else {
			item.dependencies?.forEach((dep) => skippedDeps.add(dep));
			item.devDependencies?.forEach((dep) => devDependencies.add(dep));
		}

		// Install Component
		tasks.push({
			title: `Installing ${highlight(item.name)}`,
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

				return `${highlight(item.name)} installed at ${color.gray(componentPath)}`;
			},
		});
	}

	// Install dependencies.
	const pm = await detectPM(cwd, options.deps);
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
				const relative = path.relative(cwd, cssPath);
				const cssSource = await fs.readFile(cssPath, "utf8");

				const modifiedCss = transformCss(cssSource, cssVars);
				await fs.writeFile(cssPath, modifiedCss, "utf8");

				return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
			},
		});
	}

	await p.tasks(tasks);

	if (!options.deps) {
		const prettyList = prettifyList([...skippedDeps], 7);
		p.log.warn(
			`Components have been installed ${color.bold.red("without")} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
