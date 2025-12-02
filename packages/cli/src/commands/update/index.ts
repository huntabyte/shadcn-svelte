import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "picocolors";
import { z } from "zod/v4";
import merge from "deepmerge";
import { Command } from "commander";
import { error, handleError } from "../../utils/errors.js";
import * as cliConfig from "../../utils/get-config.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { cancel, intro, prettifyList } from "../../utils/prompt-helpers.js";
import * as p from "@clack/prompts";
import * as registry from "../../utils/registry/index.js";
import { transformContent, transformCss } from "../../utils/transformers.js";
import { checkPreconditions } from "../../utils/preconditions.js";
import { highlight } from "../../utils/utils.js";
import { installDependencies } from "../../utils/install-deps.js";

const updateOptionsSchema = z.object({
	all: z.boolean(),
	components: z.string().array().optional(),
	cwd: z.string(),
	proxy: z.string().optional(),
	yes: z.boolean(),
	force: z.boolean(),
});

type UpdateOptions = z.infer<typeof updateOptionsSchema>;

export const update = new Command()
	.command("update", { hidden: true })
	.description("update components in your project")
	.argument("[components...]", "name of components")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-f, --force", "ignore preflight checks and continue", false)
	.option("-a, --all", "update all existing components", false)
	.option("-y, --yes", "skip confirmation prompt", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy", getEnvProxy())
	.action(async (components, opts) => {
		intro();

		try {
			const options = updateOptionsSchema.parse({
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

			const updatedConfig = checkPreconditions({ config, cwd, force: options.force });
			await runUpdate(cwd, updatedConfig, options);

			p.note(
				`This action ${color.underline("does not")} update your ${highlight("dependencies")} to their ${color.bold("latest")} versions.\n\nConsider updating them as well.`
			);

			p.outro(`${color.green("Success!")} Component update completed.`);
		} catch (e) {
			handleError(e);
		}
	});

async function runUpdate(cwd: string, config: cliConfig.ResolvedConfig, options: UpdateOptions) {
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
	for (const dir of Object.values(dirs)) {
		if (!existsSync(dir)) continue;

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
						.map((file) => path.resolve(file.parentPath, file.name))
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

	await installDependencies({
		cwd,
		dependencies: Array.from(dependencies),
		devDependencies: Array.from(devDependencies),
		prompt: true,
	});

	for (const [component, files] of Object.entries(componentsToRemove)) {
		p.log.warn(
			`The ${highlight(component)} component does not use the following files:\n${files.map((file) => color.white(`- ${color.gray(path.relative(cwd, file))}`)).join("\n")}`
		);
	}
	if (Object.keys(componentsToRemove).length > 0) {
		p.log.message(color.bold("You may want to delete them."));
	}
}
