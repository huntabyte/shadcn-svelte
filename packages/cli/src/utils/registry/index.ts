import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import path from "node:path";
import * as v from "valibot";
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
		return v.parse(schemas.registryIndexSchema, result);
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

		return v.parse(schemas.registryBaseColorSchema, result);
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
			resolvedItem = v.parse(schemas.registryItemSchema, result);
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

		return v.parse(v.array(schemas.registryItemSchema), result);
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

	if (type === "registry:block" || type === "registry:component") {
		return config.resolvedPaths.components;
	}
	if (type === "registry:file" || type === "registry:page") {
		return config.resolvedPaths.cwd;
	}

	throw new Error(`TODO: unhandled item type ${type}`);
}

export function resolveItemFilePath(
	config: Config,
	item: schemas.RegistryItem,
	file: schemas.RegistryItemFile
): string {
	const aliasDir = getItemAliasDir(config, item.type);
	if (file.target) {
		// resolves relative to the root (cwd)
		if (file.target.startsWith("~/")) {
			return path.resolve(config.resolvedPaths.cwd, file.target.replace("~/", ""));
		}
		// resolves relative to the item's dir
		return path.resolve(aliasDir, file.target);
	}

	// inserted as grouped files
	if (
		file.type === "registry:ui" ||
		file.type === "registry:component" ||
		file.type === "registry:block"
	) {
		// resolves to `[alias]/[registry-item]/[file]`
		return path.resolve(aliasDir, item.name, file.name);
	}

	// inserted as single files
	if (file.type === "registry:hook" || file.type === "registry:lib") {
		// resolves to `[alias]/[filename]`
		return path.resolve(aliasDir, file.name);
	}

	// TODO: keep going
	throw new Error(`TODO: unhandled file type ${file.type}`);
}
