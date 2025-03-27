import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import path from "node:path";
import * as v from "valibot";
import { CLIError, error } from "../errors.js";
import type { Config } from "../get-config.js";
import { getEnvProxy } from "../get-env-proxy.js";
import * as schemas from "./schema.js";

export function getRegistryUrl(config: Config) {
	let url = process.env.COMPONENTS_REGISTRY_URL;

	if (url) return url;

	url = config.registry;

	// temp workaround to circumvent some caching issues with CF between subdomain / root domain
	// this will be removed once we have a proper solution and or we merge with main
	if (url === "https://next.shadcn-svelte.com/registry") {
		return "https://huntabyte-next.shadcn-svelte.pages.dev/registry";
	}

	return url;
}

export type RegistryItem = v.InferOutput<typeof schemas.registryItemSchema>;

/** Concurrently loads all of the registry indexes */
export async function getRegistryIndexes(registryUrls: string[]) {
	const result = new Map<string, RegistryIndex>();

	const loadRegistry = async (registryUrl: string) => {
		const index = await getRegistryIndex(registryUrl);

		result.set(registryUrl, index);
	};

	await Promise.all(registryUrls.map((url) => loadRegistry(url)));

	return result;
}

export async function getRegistryIndex(baseUrl: string) {
	try {
		const [result] = await fetchRegistry(baseUrl, ["index.json"]);

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
		const [result] = await fetchRegistry(baseUrl, [`colors/${baseColor}.json`]);

		return v.parse(schemas.registryBaseColorSchema, result);
	} catch (err) {
		throw error(`Failed to fetch base color from registry. Error: ${err}`);
	}
}

type RegistryIndex = v.InferOutput<typeof schemas.registryIndexSchema>;

type ResolveTreeProps = {
	baseUrl: string;
	index: RegistryIndex;
	names: string[];
	includeRegDeps?: boolean;
	config: Config;
};

export async function resolveTree({
	index,
	baseUrl,
	names,
	includeRegDeps = true,
	config,
}: ResolveTreeProps) {
	const tree: RegistryIndex = [];

	for (const name of names) {
		let entry = index.find((entry) => entry.name === name);

		if (!entry) {
			const [item] = await fetchRegistry(baseUrl, [`${name}.json`]);
			if (item) entry = item;
			if (!entry) continue;
		}

		tree.push(entry);

		if (includeRegDeps && entry.registryDependencies) {
			const dependencies = await resolveTree({
				baseUrl,
				index,
				names: entry.registryDependencies,
				config,
			});
			tree.push(...dependencies);
		}
	}

	return tree.filter(
		(component, index, self) => self.findIndex((c) => c.name === component.name) === index
	);
}

export async function fetchTree(baseUrl: string, tree: RegistryIndex) {
	try {
		const paths = tree.map((item) => `${item.name}.json`);
		const result = await fetchRegistry(baseUrl, paths);

		return v.parse(schemas.registryWithContentSchema, result);
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch tree from registry.`);
	}
}

export function getItemTargetPath(
	config: Config,
	item: v.InferOutput<typeof schemas.registryItemWithContentSchema>,
	override?: string
) {
	// Allow overrides for all items but ui.
	if (override && item.type !== "registry:ui") {
		return override;
	}

	const [, type] = item.type.split(":");
	if (!type || !(type in config.resolvedPaths)) return null;

	return path.join(config.resolvedPaths[type as keyof typeof config.resolvedPaths]);
}

async function fetchRegistry(baseUrl: string, paths: string[]) {
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};
	try {
		const results = await Promise.all(
			paths.map(async (path) => {
				const url = `${baseUrl}/${path}`;

				const response = await fetch(url, {
					...proxy,
				});

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
			})
		);

		return results;
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch registry from ${baseUrl}. Error: ${e}`);
	}
}

export function getRegistryItemTargetPath(
	config: Config,
	type: schemas.RegistryItemType,
	override?: string
) {
	if (override) return override;

	if (type === "registry:ui") return config.resolvedPaths.ui;
	if (type === "registry:block" || type === "registry:component" || type === "registry:page") {
		return config.resolvedPaths.components;
	}
	if (type === "registry:hook") return config.resolvedPaths.hooks;
	// TODO - we put this in components for now but will move to the appropriate route location
	// depending on if using SvelteKit or whatever
	return config.resolvedPaths.components;
}
