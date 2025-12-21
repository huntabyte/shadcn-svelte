import path from "node:path";
import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import { isUrl, resolveURL } from "../utils.js";
import { CLIError, error } from "../errors.js";
import {
	BASE_COLORS,
	type ResolvedConfig,
	type DesignSystemConfig,
	designSystemConfigSchema,
	type StyleName,
} from "../get-config.js";
import { getEnvProxy } from "../get-env-proxy.js";
import { OFFICIAL_REGISTRY_URL } from "../../constants.js";
import * as schemas from "@shadcn-svelte/registry";
import { parse as parseCss } from "postcss";

export function getRegistryUrl(config: ResolvedConfig) {
	const url = process.env.COMPONENTS_REGISTRY_URL ?? config.registry;
	return url;
}

export async function getRegistryIndex(registryUrl: string) {
	try {
		const url = resolveURL(registryUrl, "index.json");
		const [result] = await fetchRegistry([url]);
		return schemas.registryIndexSchema.parse(result);
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch components from registry.`, e);
	}
}

export function getBaseColors() {
	return BASE_COLORS.map((color) => ({
		name: color,
		label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
	}));
}

export async function getDesignSystem(designSystemUrl: string): Promise<DesignSystemConfig> {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};

	try {
		const response = await fetch(designSystemUrl, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
			...proxy,
		});

		if (!response.ok) {
			throw error(
				`Failed to fetch design system from ${designSystemUrl}: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const result = designSystemConfigSchema.safeParse(data);
		if (!result.success) {
			throw error(`Invalid design system config: ${result.error.message}`);
		}

		return result.data;
	} catch (e) {
		throw error(`Failed to fetch design system from ${designSystemUrl}`, e);
	}
}

export async function getRegistryTheme(baseUrl: string, theme: string) {
	try {
		const url = resolveURL(baseUrl, `colors/${theme}.json`);
		const [result] = await fetchRegistry([url]);

		return schemas.registryBaseColorSchema.parse(result);
	} catch (e) {
		throw error(`Failed to fetch theme: ${theme} from registry.`, e);
	}
}

export async function getRegistryStyle(
	baseUrl: string,
	style: StyleName
): Promise<Record<string, string>> {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};

	const url = resolveURL(baseUrl, `styles/${style}.css`);

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
			...proxy,
		});

		if (!response.ok) {
			throw error(
				`Failed to fetch style from ${url}: ${response.status} ${response.statusText}`
			);
		}

		const css = await response.text();

		return parseStyleCss(css);
	} catch (e) {
		throw error(`Failed to fetch style from ${url}`, e);
	}
}

/** Parses a style CSS file and extracts the @apply styles for each class */
export function parseStyleCss(css: string): Record<string, string> {
	const ast = parseCss(css);
	const styles: Record<string, string> = {};

	ast.walkRules((rule) => {
		// Extract class name from selector (e.g., ".cn-accordion-item" -> "cn-accordion-item")
		const selector = rule.selector;
		if (!selector.startsWith(".cn-")) return;

		const className = selector.slice(1); // Remove leading "."

		// Find @apply rules within this rule
		rule.walkAtRules("apply", (atRule) => {
			const applyValue = atRule.params.trim();
			if (applyValue) {
				// If there are multiple @apply rules, concatenate them
				if (styles[className]) {
					styles[className] += ` ${applyValue}`;
				} else {
					styles[className] = applyValue;
				}
			}
		});
	});

	return styles;
}

type ResolveRegistryItemsProps = {
	registryUrl: string;
	registryIndex: schemas.RegistryIndex;
	items: string[];
	parentUrl?: URL;
};

type ResolvedRegistryItem = schemas.RegistryItem | schemas.RegistryIndexItem;
export async function resolveRegistryItems({
	registryUrl,
	registryIndex,
	items,
	parentUrl,
}: ResolveRegistryItemsProps): Promise<ResolvedRegistryItem[]> {
	const resolvedItems: ResolvedRegistryItem[] = [];

	for (const item of items) {
		let remoteUrl: URL | undefined;
		let resolvedItem: ResolvedRegistryItem | undefined = registryIndex.find(
			(entry) => entry.name === item
		);

		/**
		 * The `item` doesn't exist in the registry's `index`, so it can be one of two things:
		 * 1. a remote registry item (URL)
		 * 2. a `local:registryDep` of a _remote_  item (relative path from that item to the dep)
		 */
		if (!resolvedItem) {
			const isRelative = item.startsWith("./") || item.startsWith("../");
			if (isUrl(item) || (parentUrl && isRelative)) {
				remoteUrl = new URL(item, parentUrl);
				const [result] = await fetchRegistry([remoteUrl]);
				resolvedItem = schemas.registryItemSchema.parse(result);
			} else {
				// diff error messages depending on whether we're resolving from the user's registry or a remote URL
				if (parentUrl) {
					throw error(
						`Registry item '${item}' does not exist in the remote registry at '${parentUrl.origin}', nor is it a valid URL or relative path.`
					);
				}

				let message = `Registry item '${item}' does not exist in the registry at '${registryUrl}'.`;
				if (registryUrl !== OFFICIAL_REGISTRY_URL) {
					message += `\n\nIf you're trying to use shadcn-svelte components, ensure your 'registry' property in components.json is set to '${OFFICIAL_REGISTRY_URL}'.`;
				}
				throw error(message);
			}
		}

		resolvedItems.push(resolvedItem);

		if (resolvedItem.registryDependencies?.length) {
			const registryDeps = await resolveRegistryItems({
				registryUrl,
				registryIndex,
				items: resolvedItem.registryDependencies,
				parentUrl: remoteUrl,
			});
			resolvedItems.push(...registryDeps);
		}
	}

	// dedupes tree
	return resolvedItems.filter(
		(component, index, self) => self.findIndex((c) => c.name === component.name) === index
	);
}

type FetchTreeProps = { baseUrl: string; items: ResolvedRegistryItem[] };
export async function fetchRegistryItems({
	baseUrl,
	items,
}: FetchTreeProps): Promise<schemas.RegistryItem[]> {
	const itemsWithContent = items.filter((item) => !("relativeUrl" in item));
	const itemsToFetch = items.filter((item) => "relativeUrl" in item);

	try {
		const itemUrls = itemsToFetch.map((item) => resolveURL(baseUrl, item.relativeUrl));
		const result = (await fetchRegistry(itemUrls)).concat(itemsWithContent);

		return schemas.registryItemSchema.array().parse(result);
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch tree from registry.`, e);
	}
}

async function fetchRegistry(urls: Array<URL | string>): Promise<unknown[]> {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};

	const loaders = urls.map(async (url) => {
		const response = await fetch(url, { ...proxy });
		if (!response.ok) {
			throw error(
				`Failed to fetch registry from ${url}: ${response.status} ${response.statusText}`
			);
		}

		try {
			return await response.json();
		} catch (e) {
			throw error(`Error parsing json response from ${url}: Error ${e}`);
		}
	});

	try {
		const results = await Promise.all(loaders);
		return results;
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch registry.`, e);
	}
}

export function getItemAliasDir(config: ResolvedConfig, type: schemas.RegistryItemType) {
	if (type === "registry:ui") return config.resolvedPaths.ui;
	if (type === "registry:lib") return config.resolvedPaths.lib;
	if (type === "registry:hook") return config.resolvedPaths.hooks;
	if (type === "registry:file") return config.resolvedPaths.cwd;

	if (type === "registry:style" || type === "registry:theme") {
		return path.basename(config.resolvedPaths.tailwindCss);
	}

	if (type === "registry:block" || type === "registry:component") {
		return config.resolvedPaths.components;
	}

	if (type === "registry:page") {
		if (config.sveltekit) return path.resolve(config.resolvedPaths.cwd, "src", "routes");

		// we'll fallback to components alias
		return config.resolvedPaths.components;
	}

	throw new Error(`TODO: unhandled item type ${type}`);
}

export function resolveItemFilePath(
	config: ResolvedConfig,
	item: schemas.RegistryItem,
	file: schemas.RegistryItemFile
): string {
	// resolves relative to the root (cwd)
	if (file.target.startsWith("~/")) {
		return path.resolve(config.resolvedPaths.cwd, file.target.replace("~/", ""));
	}

	if (item.name === "utils") {
		const utils = config.resolvedPaths.utils;
		if (utils.match(/.*\.(ts|js)$/)) return utils;
		else return `${utils}.ts`;
	}

	let aliasDir;
	if (file.type === "registry:file") {
		// resolves relative to the item-type's alias
		aliasDir = getItemAliasDir(config, item.type);
	} else {
		// resolves relative to the file-type's alias
		aliasDir = getItemAliasDir(config, file.type);
	}

	return path.resolve(aliasDir, file.target);
}
