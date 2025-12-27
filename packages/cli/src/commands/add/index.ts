import path from "node:path";
import process from "node:process";
import { existsSync } from "node:fs";
import color from "picocolors";
import { z } from "zod";
import { Command } from "commander";
import { ConfigError, error, handleError } from "../../utils/errors.js";
import * as cliConfig from "../../utils/get-config.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { cancel, intro, prettifyList } from "../../utils/prompt-helpers.js";
import * as p from "@clack/prompts";
import * as registry from "../../utils/registry/index.js";
import { addRegistryItems } from "../../utils/add-registry-items.js";
import { highlight } from "../../utils/utils.js";
import { installDependencies } from "../../utils/install-deps.js";
import { checkPreconditions } from "../../utils/preconditions.js";
import {
	findNeededAtRules,
	updateCustomAtRules,
} from "../../utils/updaters/update-custom-at-rules.js";

const addOptionsSchema = z.object({
	components: z.string().array().optional(),
	yes: z.boolean(),
	all: z.boolean(),
	overwrite: z.boolean(),
	cwd: z.string(),
	deps: z.boolean(),
	proxy: z.string().optional(),
	skipPreflight: z.boolean(),
});

type AddOptions = z.infer<typeof addOptionsSchema>;

export const add = new Command()
	.command("add")
	.description("add components to your project")
	.argument("[components...]", "the components to add or a url to the component")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("--no-deps", "skips adding & installing package dependencies")
	.option("--skip-preflight", "ignore preflight checks and continue", false)
	.option("-a, --all", "install all components to your project", false)
	.option("-y, --yes", "skip confirmation prompt", false)
	.option("-o, --overwrite", "overwrite existing files", false)
	.option("--proxy <proxy>", "fetch components from registry using a proxy", getEnvProxy())
	.action(async (components, opts) => {
		try {
			intro();
			const options = addOptionsSchema.parse({ components, ...opts });

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

			const updatedConfig = checkPreconditions({
				config,
				cwd,
				skipPreflight: options.skipPreflight,
			});

			await runAdd(cwd, updatedConfig, options);

			p.outro(`${color.green("Success!")} Components added.`);
		} catch (e) {
			handleError(e);
		}
	});

async function runAdd(cwd: string, config: cliConfig.ResolvedConfig, options: AddOptions) {
	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}

	const registryUrl = registry.getRegistryUrl(config);
	const shadcnIndex = await registry.getRegistryIndex(registryUrl);
	const uiOnly = shadcnIndex.filter((f) => f.type === "registry:ui");

	let selectedComponents = new Set(
		options.all ? uiOnly.map(({ name }) => name) : options.components
	);

	// if the user hasn't passed any components prompt them to select components
	if (selectedComponents.size === 0) {
		const components = await p.multiselect({
			message: `Which ${highlight("components")} would you like to add?`,
			maxItems: 10,
			options: uiOnly.map((item) => {
				let deps = [...(item.registryDependencies ?? [])];
				if (options.deps) {
					deps = deps.concat(item.dependencies ?? []).concat(item.devDependencies ?? []);
				}
				return {
					label: item.name,
					value: item.name,
					hint: deps.length ? `also adds: ${deps.join(", ")}` : undefined,
				};
			}),
		});

		if (p.isCancel(components)) cancel();
		selectedComponents = new Set(components);
	} else {
		const prettyList = prettifyList(Array.from(selectedComponents));
		p.log.step(`Components to install:\n${color.gray(prettyList)}`);
	}

	if (options.yes === false) {
		const proceed = await p.confirm({
			message: `Ready to install ${highlight("components")}${options.deps ? ` and ${highlight("dependencies")}?` : "?"}`,
			initialValue: true,
		});

		if (p.isCancel(proceed) || proceed === false) cancel();
	}

	const result = await addRegistryItems({
		config,
		deps: options.deps,
		overwrite: options.overwrite,
		selectedItems: Array.from(selectedComponents),
	});

	const neededAtRules = await findNeededAtRules(config);

	if (neededAtRules.length > 0) {
		const cssPath = config.resolvedPaths.tailwindCss;
		const relative = path.relative(cwd, cssPath);

		await p.tasks([
			{
				title: "Updating stylesheet",
				async task() {
					await updateCustomAtRules(cssPath, neededAtRules);

					return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
				},
			},
		]);
	}

	if (options.deps) {
		await installDependencies({
			cwd,
			prompt: options.deps,
			dependencies: Array.from(result.dependencies),
			devDependencies: Array.from(result.devDependencies),
		});
	} else if (result.skippedDeps.size) {
		const prettyList = prettifyList([...result.skippedDeps], 7);
		p.log.warn(
			`Components have been installed ${color.bold(color.red("without"))} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
