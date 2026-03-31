import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "picocolors";
import { z } from "zod";
import merge from "deepmerge";
import { Command } from "commander";
import { error } from "../../utils/errors.js";
import * as cliConfig from "../../utils/config/index.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { cancel, intro, prettifyList, handleError } from "../../utils/prompt-helpers.js";
import * as p from "@clack/prompts";
import * as registry from "../../utils/registry/index.js";
import { shadcnSvelteTailwindCssImport } from "../../utils/css.js";
import { transformCss } from "../../utils/transform-css.js";
import { setupFonts, type Font } from "../../utils/fonts.js";
import { checkPreconditions } from "../../utils/preconditions.js";
import { highlight } from "../../utils/colors.js";
import { installDependencies } from "../../utils/install-deps.js";
import {
	transform,
	transformFont,
	transformImports,
	transformIcons,
	transformMenu,
	transformStripTypes,
} from "../../utils/transformers/index.js";
import { getSupportedFontMarkers, type FontMarkerSource } from "../../utils/font-markers.js";
import * as project from "../../utils/project.js";

const updateOptionsSchema = z.object({
	all: z.boolean(),
	components: z.string().array().optional(),
	cwd: z.string(),
	proxy: z.string().optional(),
	yes: z.boolean(),
	skipPreflight: z.boolean(),
	deps: z.boolean(),
});

type UpdateOptions = z.infer<typeof updateOptionsSchema>;

export const update = new Command()
	.command("update", { hidden: true })
	.description("update components in your project")
	.argument("[components...]", "name of components")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("--skip-preflight", "ignore preflight checks and continue", false)
	.option("--no-deps", "skips adding & installing package dependencies")
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

			const updatedConfig = checkPreconditions({
				config,
				cwd,
				skipPreflight: options.skipPreflight,
			});
			await runUpdate(cwd, updatedConfig, options);

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

	// Retrieve existing items in the user's project
	const existingComponents = await project.getComponents({ registryIndex, config });

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
		registryUrl,
		registryIndex,
		items: selectedComponents.map((comp) => comp.name),
	});

	const payload = await registry.fetchRegistryItems({
		baseUrl: registryUrl,
		items: resolvedItems,
	});
	payload.sort((a, b) => a.name.localeCompare(b.name));

	const fontMarkerSources: FontMarkerSource[] = [];
	for (const item of payload) {
		if (item.cssVars) {
			fontMarkerSources.push({ cssVars: item.cssVars });
		}
		if (item.type === "registry:font" && item.font) {
			fontMarkerSources.push({ fonts: [{ font: item.font }] });
		}
	}
	const registryFontMarkers = getSupportedFontMarkers(fontMarkerSources);

	const componentsToRemove: Record<string, string[]> = {};
	const dependencies = new Set<string>();
	const devDependencies = new Set<string>();
	const fonts: Font[] = [];
	let cssVars = {};
	let css = {};
	for (const item of payload) {
		const aliasDir = registry.getItemAliasDir(config, item.type);

		// Add dependencies to the install list
		item.dependencies?.forEach((dep) => dependencies.add(dep));
		item.devDependencies?.forEach((dep) => devDependencies.add(dep));

		if (item.type === "registry:font") {
			fonts.push({
				name: item.name,
				...item.font,
			});
		}

		// Update Components
		tasks.push({
			title: `Updating ${highlight(item.name)}`,
			async task() {
				for (const file of item.files ?? []) {
					const filePath = registry.resolveItemFilePath(config, item, file);

					const {
						content,
						dependencies: transformDependencies,
						devDependencies: transformDevDependencies,
						filePath: transformFilePath,
					} = await transform(
						{
							content: file.content,
							filePath,
							config,
							supportedFontMarkers: registryFontMarkers,
						},
						[
							transformImports,
							transformIcons,
							transformMenu,
							transformFont,
							!config.typescript && transformStripTypes,
						]
					);

					transformDependencies?.forEach((dep) => dependencies.add(dep));
					transformDevDependencies?.forEach((dep) => devDependencies.add(dep));

					const dir = path.parse(transformFilePath).dir;
					if (!existsSync(dir)) {
						await fs.mkdir(dir, { recursive: true });
					}

					await fs.writeFile(transformFilePath, content, "utf8");
				}

				if (item.css) {
					css = merge(css, item.css);
				}
				if (item.cssVars) {
					cssVars = merge(cssVars, item.cssVars);
				}

				const itemDir = path.resolve(aliasDir, item.name);
				if (item.files && item.files?.length > 1) {
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

	const {
		css: fontsCss,
		cssVars: fontsCssVars,
		dependencies: fontsDependencies,
	} = setupFonts(fonts);

	css = merge(css, fontsCss);
	cssVars = merge(cssVars, fontsCssVars);
	fontsDependencies.forEach((dep) => devDependencies.add(dep));

	if (Object.keys(cssVars).length > 0 || Object.keys(css).length > 0) {
		css = merge(css, shadcnSvelteTailwindCssImport);
		// Update the stylesheet
		tasks.push({
			title: "Updating stylesheet",
			async task() {
				const cssPath = config.resolvedPaths.tailwindCss;
				const cssSource = await fs.readFile(cssPath, "utf8");

				const modifiedCss = transformCss(cssSource, { css, cssVars });
				await fs.writeFile(cssPath, modifiedCss, "utf8");

				const relative = path.relative(cwd, cssPath);
				return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
			},
		});
	}

	await p.tasks(tasks);

	if (options.deps) {
		await installDependencies({
			cwd,
			dependencies: Array.from(dependencies),
			devDependencies: Array.from(devDependencies),
			prompt: true,
		});
	} else if (dependencies.size > 0 || devDependencies.size > 0) {
		const prettyList = prettifyList([...dependencies, ...devDependencies], 7);
		p.log.warn(
			`Components have been updated ${color.bold(color.red("without"))} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
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
