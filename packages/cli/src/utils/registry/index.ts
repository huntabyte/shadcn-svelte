import path from "node:path";
import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import { isUrl, resolveURL } from "../utils.js";
import { CLIError, error } from "../errors.js";
import type { Config } from "../get-config.js";
import { getEnvProxy } from "../get-env-proxy.js";
import * as schemas from "@shadcn-svelte/registry";

export function getRegistryUrl(config: Config) {
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
		throw error(`Failed to fetch components from registry.`);
	}
}

export function getBaseColors() {
	return [
		{ name: "slate", label: "Slate" },
		{ name: "gray", label: "Gray" },
		{ name: "zinc", label: "Zinc" },
		{ name: "neutral", label: "Neutral" },
		{ name: "stone", label: "Stone" },
	];
}

export async function getRegistryBaseColor(baseUrl: string, baseColor: string) {
	try {
		const url = resolveURL(baseUrl, `colors/${baseColor}.json`);
		const [result] = await fetchRegistry([url]);

		return schemas.registryBaseColorSchema.parse(result);
	} catch (err) {
		throw error(
			`Failed to fetch base color from registry. ${err instanceof Error ? err.message : err}`
		);
	}
}

type ResolveRegistryItemsProps = {
	baseUrl: string;
	registryIndex: schemas.RegistryIndex;
	items: string[];
	includeRegDeps?: boolean;
};

type ResolvedRegistryItem = schemas.RegistryItem | schemas.RegistryIndexItem;
export async function resolveRegistryItems({
	registryIndex,
	baseUrl,
	items,
	includeRegDeps = true,
}: ResolveRegistryItemsProps): Promise<ResolvedRegistryItem[]> {
	const resolvedItems: ResolvedRegistryItem[] = [];

	for (const item of items) {
		let resolvedItem: ResolvedRegistryItem | undefined = registryIndex.find(
			(entry) => entry.name === item
		);

		// the `item` doesn't exist in the `index`, so it _must_ be a remote item (in other words, it's a URL)
		if (!resolvedItem) {
			const url = item;
			if (!isUrl(url)) {
				throw error(
					`Component item '${item}' does not exist in the registry, nor is it a valid URL.`
				);
			}

			const [result] = await fetchRegistry([url]);
			resolvedItem = schemas.registryItemSchema.parse(result);
		}

		resolvedItems.push(resolvedItem);

		if (includeRegDeps && resolvedItem.registryDependencies?.length) {
			const registryDeps = await resolveRegistryItems({
				baseUrl,
				registryIndex: registryIndex,
				items: resolvedItem.registryDependencies,
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
		throw error(`Failed to fetch tree from registry.`);
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
		throw error(`Failed to fetch registry. ${e instanceof Error ? `Error: ${e.message}` : e}`);
	}
}

export function getItemAliasDir(config: Config, type: schemas.RegistryItemType, override?: string) {
	if (override) return override;

	if (type === "registry:ui") return config.resolvedPaths.ui;
	if (type === "registry:lib") return config.resolvedPaths.lib;
	if (type === "registry:hook") return config.resolvedPaths.hooks;
	if (type === "registry:file") return config.resolvedPaths.cwd;

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
	config: Config,
	item: schemas.RegistryItem,
	file: schemas.RegistryItemFile
): string {
	// resolves relative to the root (cwd)
	if (file.target.startsWith("~/")) {
		return path.resolve(config.resolvedPaths.cwd, file.target.replace("~/", ""));
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
