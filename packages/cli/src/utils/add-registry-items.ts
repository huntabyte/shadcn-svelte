import path from "node:path";
import { existsSync, promises as fs } from "node:fs";
import * as p from "@clack/prompts";
import merge from "deepmerge";
import color from "picocolors";
import * as registry from "./registry/index.js";
import { highlight } from "./colors.js";
import { shadcnSvelteTailwindCssImport } from "./css.js";
import { error } from "./errors.js";
import { getSupportedFontMarkers, type FontMarkerSource } from "./font-markers.js";
import { setupFonts, type Font } from "./fonts.js";
import { silentOutput } from "./node-utils.js";
import { cancel, prettifyList } from "./prompt-helpers.js";
import { transformCss } from "./transform-css.js";
import {
	transform,
	transformFont,
	transformImports,
	transformIcons,
	transformMenu,
	transformStripTypes,
} from "./transformers/index.js";
import type { ResolvedConfig } from "./config/index.js";

const STYLE_TYPES = ["registry:style", "registry:theme"];

export type ApplyOnly = "theme" | "font";

type AddRegistryItemsProps = {
	selectedItems: string[];
	config: ResolvedConfig;
	/**
	 * Whether to replace the items that already exist.
	 *
	 * `undefined` asks.
	 */
	overwrite?: boolean;
	/**
	 * Whether to update the stylesheet when it needs changes.
	 *
	 * It follows `overwrite` by default: `true` writes it, `false` keeps it, and `undefined` asks.
	 */
	stylesheet?: "write" | "keep" | "ask";
	deps: boolean;
	silent?: boolean;
	only?: ApplyOnly[];
	/**
	 * When `false`, throw instead of prompting to ask whether to overwrite.
	 *
	 * @default true
	 */
	interactive?: boolean;
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
	const fonts: Font[] = [];
	let cssVars = {};
	let css = {};

	const ALL_PARTS = ["theme", "font"] as const;
	// apply the given parts, or all parts if no parts are given
	const applyParts = opts.only?.length ? opts.only : ALL_PARTS;
	const shouldApplyTheme = applyParts.includes("theme");
	const shouldApplyFont = applyParts.includes("font");

	const registryIndex = await registry.getRegistryIndex(registryUrl);
	const resolvedItems = await registry.resolveRegistryItems({
		registryUrl,
		registryIndex,
		items: Array.from(selectedItems),
	});

	const itemsWithContent = await registry.fetchRegistryItems({
		baseUrl: registryUrl,
		items: resolvedItems,
	});

	if (itemsWithContent.length === 0) throw error("Selected items not found.");

	const fontMarkerSources: FontMarkerSource[] = [];
	for (const item of itemsWithContent) {
		if (item.cssVars) {
			fontMarkerSources.push({ cssVars: item.cssVars });
		}
		if (shouldApplyFont && item.type === "registry:font" && item.font) {
			fontMarkerSources.push({ fonts: [{ font: item.font }] });
		}
	}
	const registryFontMarkers = getSupportedFontMarkers(fontMarkerSources);

	// build a list of existing items
	const existingItems: string[] = [];

	for (const item of itemsWithContent) {
		selectedItems.add(item.name);
		for (const regDep of item.registryDependencies ?? []) {
			selectedItems.add(regDep);
		}

		const itemExists = item.files?.some((file) => {
			const filePath = registry.resolveItemFilePath(opts.config, item, file);
			return existsSync(filePath);
		});
		if (itemExists) {
			existingItems.push(item.name);
		}
	}

	// prompt if the user wants to overwrite ALL files or individually
	let overwrite = opts.overwrite;
	if (overwrite === undefined && existingItems.length > 0) {
		const prettyList = prettifyList(existingItems);
		if (opts.interactive === false) {
			throw error(
				`The following items already exist: ${prettyList}. Pass ${highlight("--overwrite")} to replace them, or ${highlight("--no-overwrite")} to keep them.`
			);
		}

		p.log.warn(
			`The following items ${color.bold(color.yellow("already exist"))}:\n${color.gray(prettyList)}`
		);

		const overwriteAll = await p.confirm({
			message: `Would you like to ${color.bold(color.red("overwrite"))} all existing files?`,
			active: "Yes, overwrite everything",
			inactive: "No, let me decide individually",
			initialValue: false,
		});

		if (p.isCancel(overwriteAll)) cancel();

		// otherwise it stays `undefined`, which asks about each item
		if (overwriteAll) overwrite = true;
	}

	const skippedItems: string[] = [];
	for (const item of itemsWithContent) {
		if (item.type === "registry:font" && !shouldApplyFont) continue;

		if (overwrite === false && existingItems.includes(item.name)) {
			skippedItems.push(item.name);
			continue;
		}

		// `theme`s and `style`s do the same thing, because why not?
		if (!STYLE_TYPES.includes(item.type)) {
			const aliasDir = registry.getItemAliasDir(opts.config, item.type);
			const itemPath = path.relative(cwd, path.resolve(aliasDir, item.name));

			if (overwrite === undefined && existingItems.includes(item.name)) {
				if (selectedItems.has(item.name)) {
					p.log.warn(`Item ${highlight(item.name)} already exists at ${color.gray(itemPath)}`);

					const overwriteItem = await p.confirm({
						message: `Would you like to ${color.bold(color.red("overwrite"))} your existing ${highlight(item.name)} ${item.type}?`,
					});
					if (p.isCancel(overwriteItem)) cancel();
					if (overwriteItem === false) continue;
				}
			}
		}

		if (opts.deps) {
			item.dependencies?.forEach((dep) => dependencies.add(dep));
			item.devDependencies?.forEach((dep) => devDependencies.add(dep));
		} else {
			item.dependencies?.forEach((dep) => skippedDeps.add(dep));
			item.devDependencies?.forEach((dep) => skippedDeps.add(dep));
		}

		if (item.type === "registry:font") {
			fonts.push({
				name: item.name,
				...item.font,
			});
		}

		if (shouldApplyTheme) {
			if (item.cssVars) {
				cssVars = merge(cssVars, item.cssVars);
			}
			if (item.css) {
				css = merge(css, item.css);
			}
		}

		tasks.push({
			title:
				item.name === "init"
					? "Setting up shadcn-svelte base configuration"
					: `Adding ${highlight(item.name)}`,
			// @ts-expect-error this is intentional since we don't want to return a string during `init`
			async task() {
				if (!STYLE_TYPES.includes(item.type)) {
					const aliasDir = registry.getItemAliasDir(opts.config, item.type);
					if (!existsSync(aliasDir)) {
						await fs.mkdir(aliasDir, { recursive: true });
					}
				}

				for (const file of item.files ?? []) {
					const filePath = registry.resolveItemFilePath(opts.config, item, file);

					const {
						content,
						dependencies: transformDependencies,
						devDependencies: transformDevDependencies,
						filePath: transformFilePath,
					} = await transform(
						{
							content: file.content,
							filePath: filePath,
							config: opts.config,
							supportedFontMarkers: registryFontMarkers,
						},
						[
							transformImports,
							transformIcons,
							transformMenu,
							transformFont,
							!opts.config.typescript && transformStripTypes,
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

				if (item.name !== "init") {
					if (STYLE_TYPES.includes(item.type)) {
						// a theme only changes the stylesheet
						if (skippedStylesheet) return `Skipped ${highlight(item.name)}`;
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

	const {
		css: fontsCss,
		cssVars: fontsCssVars,
		dependencies: fontsDependencies,
	} = setupFonts(fonts);

	css = merge(css, fontsCss);
	cssVars = merge(cssVars, fontsCssVars);
	fontsDependencies.forEach((dep) => devDependencies.add(dep));

	// decide whether to update the stylesheet before any file is written
	const cssPath = opts.config.resolvedPaths.tailwindCss;
	const relative = path.relative(cwd, cssPath);
	const hasCssChanges = Object.keys(cssVars).length > 0 || Object.keys(css).length > 0;
	if (hasCssChanges) css = merge(css, shadcnSvelteTailwindCssImport);

	let writeStylesheet = false;
	let skippedStylesheet = false;
	if (hasCssChanges) {
		const cssSource = await fs.readFile(cssPath, "utf8");
		const isModified = cssSource !== transformCss(cssSource, { css, cssVars });

		if (isModified) {
			// following `overwrite` includes the answer to "overwrite all existing files?"
			let stylesheet = opts.stylesheet;
			if (stylesheet === undefined) {
				if (overwrite === undefined) stylesheet = "ask";
				else stylesheet = overwrite === false ? "keep" : "write";
			}

			if (stylesheet === "ask") {
				if (opts.interactive === false) {
					throw error(
						`Updates to your ${highlight(relative)} are required. Pass ${highlight("--overwrite")} to update it, or ${highlight("--no-overwrite")} to leave it as is.`
					);
				}

				const update = await p.confirm({
					message: `Updates to your ${highlight(relative)} are required. Existing CSS variables may be ${color.bold(color.red("overwritten"))}. Continue?`,
					initialValue: true,
				});
				if (p.isCancel(update)) cancel();

				stylesheet = update ? "write" : "keep";
			}

			writeStylesheet = stylesheet === "write";
			skippedStylesheet = !writeStylesheet;
		}
	}

	const output = opts.silent ? silentOutput : process.stdout;

	await p.tasks(tasks, { output });

	if (writeStylesheet) {
		await p.tasks(
			[
				{
					title: "Updating stylesheet",
					async task() {
						// read it again in case one of the items' files changed it
						const cssSource = await fs.readFile(cssPath, "utf8");
						await fs.writeFile(cssPath, transformCss(cssSource, { css, cssVars }), "utf8");

						return `${highlight("Stylesheet")} updated at ${color.dim(relative)}`;
					},
				},
			],
			{ output }
		);
	}

	return {
		skippedDeps,
		dependencies,
		devDependencies,
		skippedItems,
		skippedStylesheet,
	};
}
