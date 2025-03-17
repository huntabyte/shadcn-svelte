import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import path from "node:path";
import * as v from "valibot";
import { CLIError, error } from "../errors.js";
import type { Config } from "../get-config.js";
import { getEnvProxy } from "../get-env-proxy.js";
import * as schemas from "./schema.js";

let baseUrl: string | undefined;

export type RegistryItem = v.InferOutput<typeof schemas.registryItemSchema>;

export function setRegistry(url: string) {
	// temp workaround to circumvent some caching issues with CF between subdomain / root domain
	// this will be removed once we have a proper solution and or we merge with main
	if (url === "https://next.shadcn-svelte.com/registry") {
		baseUrl = "https://huntabyte-next.shadcn-svelte.pages.dev/registry";
	} else {
		baseUrl = url;
	}
}

function getRegistryUrl(path: string) {
	if (!baseUrl) throw new Error("Registry URL not set");

	if (isUrl(path)) {
		const url = new URL(path);
		return url.toString();
	}
	return `${baseUrl}/${path}`;
}

export async function getRegistryIndex() {
	try {
		const [result] = await fetchRegistry(["index.json"]);

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

export function getStyles() {
	return [
		{ name: "default", label: "Default" },
		{ name: "new-york", label: "New York" },
	];
}

export async function getRegistryBaseColor(baseColor: string) {
	try {
		const [result] = await fetchRegistry([`colors/${baseColor}.json`]);

		return v.parse(schemas.registryBaseColorSchema, result);
	} catch {
		throw error(`Failed to fetch base color from registry.`);
	}
}

type RegistryIndex = v.InferOutput<typeof schemas.registryIndexSchema>;

type ResolveTreeProps = {
	index: RegistryIndex;
	names: string[];
	includeRegDeps?: boolean;
	config: Config;
};

export async function resolveTree({
	index,
	names,
	includeRegDeps = true,
	config,
}: ResolveTreeProps) {
	const tree: RegistryIndex = [];

	for (const name of names) {
		let entry = index.find((entry) => entry.name === name);

		if (!entry) {
			// attempt to find entry elsewhere in the registry
			const trueStyle = config.typescript ? config.style : `${config.style}-js`;
			const [item] = await fetchRegistry([`styles/${trueStyle}/${name}.json`]);
			if (item) entry = item;
			if (!entry) continue;
		}

		tree.push(entry);

		if (includeRegDeps && entry.registryDependencies) {
			const dependencies = await resolveTree({
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

export async function fetchTree(config: Config, tree: RegistryIndex) {
	try {
		const trueStyle = config.typescript ? config.style : `${config.style}-js`;
		const paths = tree.map((item) => `styles/${trueStyle}/${item.name}.json`);
		const result = await fetchRegistry(paths);

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

async function fetchRegistry(paths: string[]) {
	if (!baseUrl) throw new Error("Registry URL not set");

	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};
	try {
		const results = await Promise.all(
			paths.map(async (path) => {
				const url = getRegistryUrl(path);

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

function isUrl(path: string) {
	try {
		new URL(path);
		return true;
	} catch {
		return false;
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
