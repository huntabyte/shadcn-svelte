import path from "node:path";
import process from "node:process";
import { existsSync } from "node:fs";
import * as p from "@clack/prompts";
import color from "picocolors";
import { Command, Option } from "commander";
import { z } from "zod";
import * as cliConfig from "../../utils/config/index.js";
import * as registry from "../../utils/registry/index.js";
import { addRegistryItems } from "../../utils/add-registry-items.js";
import { AGENT_NAMES, detectPM, getInstalledAgents } from "../../utils/auto-detect.js";
import { highlight } from "../../utils/colors.js";
import { ConfigError, error } from "../../utils/errors.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { installDependencies } from "../../utils/install-deps.js";
import { checkPreconditions } from "../../utils/preconditions.js";
import { cancel, intro, prettifyList, handleError } from "../../utils/prompt-helpers.js";

const addOptionsSchema = z.object({
	components: z.string().array().optional(),
	yes: z.boolean(),
	all: z.boolean(),
	overwrite: z.union([z.boolean(), z.string().array()]).optional(),
	cwd: z.string(),
	deps: z.boolean(),
	install: z.boolean(),
	depsInstall: z.boolean(),
	installWith: z.enum(AGENT_NAMES).optional(),
	proxy: z.string().optional(),
	skipPreflight: z.boolean(),
});

type AddOptions = z.infer<typeof addOptionsSchema>;

export const add = new Command()
	.command("add")
	.description("add components to your project")
	.argument("[components...]", "the components to add or a url to the component")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.addOption(new Option("--no-deps", "skips adding & installing package dependencies").hideHelp())
	.addOption(
		new Option(
			"--install-with <package-manager>",
			"install dependencies with the given package manager"
		)
			.choices(getInstalledAgents())
			.conflicts(["deps", "install", "depsInstall"])
	)
	.option("--no-install", "add dependencies to package.json without installing them")
	.addOption(new Option("--no-deps-install", "deprecated: use --no-install").hideHelp())
	.option("--skip-preflight", "ignore preflight checks and continue", false)
	.option("-a, --all", "install all components to your project", false)
	.option("-y, --yes", "skip confirmation prompt", false)
	.option(
		"-o, --overwrite [items...]",
		'overwrite existing files, or only the given items\' files\nappending "..." to an item also overwrites its dependencies, e.g. "sidebar..."'
	)
	.option("--no-overwrite", "keep existing files and leave the stylesheet as is")
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
	// Without a terminal, prompts would hang or exit without doing anything, so fail and name the
	// flag that answers them instead.
	const interactive = Boolean(process.stdin.isTTY);

	if (options.proxy !== undefined) {
		process.env.HTTP_PROXY = options.proxy;
		p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
	}

	const registryUrl = registry.getRegistryUrl(config);
	const shadcnIndex = await registry.getRegistryIndex(registryUrl);
	const uiOnly = shadcnIndex.filter((f) => f.type === "registry:ui");

	// the items to overwrite are added too, since in `add -o button card` the components end up
	// as the option's values
	const overwriteItems = Array.isArray(options.overwrite)
		? options.overwrite.map((item) => item.replace(/\.\.\.$/, ""))
		: [];
	let selectedComponents = new Set([
		...(options.all ? uiOnly.map(({ name }) => name) : (options.components ?? [])),
		...overwriteItems,
	]);

	// if the user hasn't passed any components prompt them to select components
	if (selectedComponents.size === 0) {
		if (!interactive) {
			throw error(`Specify the components to add, or pass ${highlight("--all")}.`);
		}

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
		if (!interactive) {
			throw error(`Pass ${highlight("--yes")} to skip the confirmation.`);
		}

		const proceed = await p.confirm({
			message: `Ready to install ${highlight("components")}${options.deps ? ` and ${highlight("dependencies")}?` : "?"}`,
			initialValue: true,
		});

		if (p.isCancel(proceed) || proceed === false) cancel();
	}

	// find the package manager first, so that a missing one fails before any file is written
	const install = options.install && options.depsInstall;
	const installWith =
		options.deps && install
			? (options.installWith ?? (await detectPM(cwd, true)))
			: options.installWith;

	const result = await addRegistryItems({
		config,
		deps: options.deps,
		overwrite: options.overwrite,
		interactive,
		selectedItems: Array.from(selectedComponents),
	});

	if (result.skippedItems.length > 0) {
		p.log.warn(
			`Skipped the items that already exist: ${prettifyList(result.skippedItems)}. Pass ${highlight("--overwrite")} to replace them.`
		);
	}

	if (result.skippedStylesheet) {
		const relative = path.relative(cwd, config.resolvedPaths.tailwindCss);
		p.log.warn(
			`Left ${highlight(relative)} as is, so the components may be missing their CSS variables. Pass ${highlight("--overwrite")} to update it.`
		);
	}

	if (options.deps) {
		await installDependencies({
			cwd,
			prompt: false,
			dependencies: Array.from(result.dependencies),
			devDependencies: Array.from(result.devDependencies),
			install,
			installWith,
		});
	} else if (result.skippedDeps.size) {
		const prettyList = prettifyList([...result.skippedDeps], 7);
		p.log.warn(
			`Components have been installed ${color.bold(color.red("without"))} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
		);
	}
}
