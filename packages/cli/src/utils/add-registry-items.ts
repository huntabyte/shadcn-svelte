import path from "node:path";
import { existsSync, promises as fs } from "node:fs";
import color from "picocolors";
import merge from "deepmerge";
import * as p from "@clack/prompts";
import * as registry from "./registry/index.js";
import { highlight } from "./utils.js";
import { cancel, prettifyList } from "./prompt-helpers.js";
import { transformContent, transformCss } from "./transformers.js";
import type { ResolvedConfig } from "./get-config.js";

const STYLE_TYPES = ["registry:style", "registry:theme"];

type AddRegistryItemsProps = {
	selectedItems: string[];
	config: ResolvedConfig;
	overwrite: boolean;
	deps: boolean;
};

// this logic is shared between the `add` and `init` commands
export async function addRegistryItems(opts: AddRegistryItemsProps) {
	const dependencies = new Set<string>();
	const devDependencies = new Set<string>();
	const skippedDeps = new Set<string>();
	const selectedItems = new Set<string>(opts.selectedItems);
	const tasks: p.Task[] = [];
	const cwd = opts.config.resolvedPaths.cwd;
	const registryUrl = registry.getRegistryUrl(opts.config);
	let cssVars = {};
	let css = {};

	const registryIndex = await registry.getRegistryIndex(registryUrl);
	const resolvedItems = await registry.resolveRegistryItems({
		items: Array.from(selectedItems),
		registryIndex,
	});

	const itemsWithContent = await registry.fetchRegistryItems({
		baseUrl: registryUrl,
		items: resolvedItems,
	});

	if (itemsWithContent.length === 0) cancel("Selected items not found.");

	// build a list of existing items
	const existingItems: string[] = [];

	for (const item of itemsWithContent) {
		selectedItems.add(item.name);
		for (const regDep of item.registryDependencies ?? []) {
			selectedItems.add(regDep);
		}

		const itemExists = item.files.some((file) => {
			const filePath = registry.resolveItemFilePath(opts.config, item, file);
			return existsSync(filePath);
		});
		if (itemExists) {
			existingItems.push(item.name);
		}
	}

	// prompt if the user wants to overwrite ALL files or individually
	if (opts.overwrite === false && existingItems.length > 0) {
		const prettyList = prettifyList(existingItems);
		p.log.warn(
			`The following items ${color.bold(color.yellow("already exist"))}:\n${color.gray(prettyList)}`
		);

		const overwrite = await p.confirm({
			message: `Would you like to ${color.bold(color.red("overwrite"))} all existing files?`,
			active: "Yes, overwrite everything",
			inactive: "No, let me decide individually",
			initialValue: false,
		});

		if (p.isCancel(overwrite)) cancel();

		opts.overwrite = overwrite;
	}

	for (const item of itemsWithContent) {
		// `theme`s and `style`s do the same thing, because why not?
		if (!STYLE_TYPES.includes(item.type)) {
			const aliasDir = registry.getItemAliasDir(opts.config, item.type);
			if (!existsSync(aliasDir)) {
				await fs.mkdir(aliasDir, { recursive: true });
			}

			const itemPath = path.relative(cwd, path.resolve(aliasDir, item.name));

			if (!opts.overwrite && existingItems.includes(item.name)) {
				if (selectedItems.has(item.name)) {
					p.log.warn(
						`Item ${highlight(item.name)} already exists at ${color.gray(itemPath)}`
					);

					const overwrite = await p.confirm({
						message: `Would you like to ${color.bold(color.red("overwrite"))} your existing ${highlight(item.name)} ${item.type}?`,
					});
					if (p.isCancel(overwrite)) cancel();
					if (overwrite === false) continue;
				}
			}
		}

		if (opts.deps) {
			item.dependencies?.forEach((dep) => dependencies.add(dep));
			item.devDependencies?.forEach((dep) => devDependencies.add(dep));
		} else {
			item.dependencies?.forEach((dep) => skippedDeps.add(dep));
			item.devDependencies?.forEach((dep) => devDependencies.add(dep));
		}

		tasks.push({
			title:
				item.name === "init"
					? "Setting up shadcn-svelte base configuration"
					: `Adding ${highlight(item.name)}`,
			// @ts-expect-error this is intentional since we don't want to return a string during `init`
			async task() {
				for (const file of item.files) {
					let filePath = registry.resolveItemFilePath(opts.config, item, file);

					// run transformers
					const content = await transformContent(file.content, filePath, opts.config);

					const dir = path.parse(filePath).dir;
					if (!existsSync(dir)) {
						await fs.mkdir(dir, { recursive: true });
					}

					if (!opts.config.typescript && filePath.endsWith(".ts")) {
						filePath = filePath.replace(".ts", ".js");
					}
					await fs.writeFile(filePath, content, "utf8");
				}

				if (item.cssVars) {
					cssVars = merge(cssVars, item.cssVars);
				}
				if (item.css) {
					css = merge(css, item.css);
				}

				if (item.name !== "init") {
					if (STYLE_TYPES.includes(item.type)) {
						const itemPath = path.relative(cwd, opts.config.resolvedPaths.tailwindCss);
						return `${highlight(item.name)} installed at ${color.gray(itemPath)}`;
					}
					const aliasDir = registry.getItemAliasDir(opts.config, item.type);
					const itemPath = path.relative(cwd, path.resolve(aliasDir, item.name));
					return `${highlight(item.name)} installed at ${color.gray(itemPath)}`;
				}
			},
		});
	}

	await p.tasks(tasks);

	if (Object.keys(cssVars).length || Object.keys(css).length) {
		const cssPath = opts.config.resolvedPaths.tailwindCss;
		const relative = path.relative(cwd, cssPath);

		if (!opts.overwrite) {
			const overwrite = await p.confirm({
				message: `A new ${highlight("style")} is ready to be installed. Existing CSS variables may be ${color.bold(color.red("overwritten"))} in ${highlight(relative)}. Continue?`,
				initialValue: false,
			});
			if (p.isCancel(overwrite)) cancel();

			opts.overwrite = overwrite;
		}

		await p.tasks([
			{
				title: "Updating stylesheet",
				enabled: opts.overwrite,
				async task() {
					const cssSource = await fs.readFile(cssPath, "utf8");

					const modifiedCss = transformCss(cssSource, { css, cssVars });
					await fs.writeFile(cssPath, modifiedCss, "utf8");

					return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
				},
			},
		]);
	}

	return {
		skippedDeps,
		dependencies,
		devDependencies,
	};
}
