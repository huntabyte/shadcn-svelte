import deepmerge from "deepmerge";
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
	baseUrl = url;
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
	} catch {
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
	} catch {
		throw error(`Failed to fetch tree from registry.`);
	}
}

export function getItemTargetPath(
	config: Config,
	item: Pick<v.InferOutput<typeof schemas.registryItemWithContentSchema>, "type">,
	override?: string
) {
	// Allow overrides for all items but ui.
	if (override && item.type !== "registry:ui") {
		return override;
	}

	const [parent, type] = item.type.split(":");
	if (!parent || !type) return null;

	if (!(parent in config.resolvedPaths)) {
		return null;
	}

	return path.join(config.resolvedPaths[parent as keyof typeof config.resolvedPaths], type);
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

				const json = await response.json();
				return json;
			})
		);

		return results;
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch registry from ${baseUrl}.`);
	}
}

export async function registryResolveItemsTree(names: string[], config: Config) {
	try {
		const index = await getRegistryIndex();
		if (!index) return null;

		// if we're resolving the index, we want it to go first.
		if (names.includes("index")) {
			names.unshift("index");
		}

		const registryDependencies: string[] = [];

		for (const name of names) {
			const itemRegistryDependencies = await resolveRegistryDependencies(name, config);
			registryDependencies.push(...itemRegistryDependencies);
		}
		console.log("REGISTRY DEPENDENCIES", registryDependencies);

		const uniqueRegistryDeps = Array.from(new Set(registryDependencies));
		const result = await fetchRegistry(uniqueRegistryDeps);
		const payload = v.parse(v.array(schemas.registryItemSchema), result);

		if (!payload) return null;

		return v.parse(schemas.registryResolvedItemsTreeSchema, {
			dependencies: deepmerge.all(payload.map((item) => item.dependencies ?? [])),
			files: deepmerge.all(payload.map((item) => item.files ?? [])),
		});
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error("Failed to resolve registry items tree.");
	}
}

async function resolveRegistryDependencies(url: string, config: Config): Promise<string[]> {
	const visited = new Set<string>();
	const payload = new Set<string>();

	async function resolveDependencies(itemUrl: string) {
		const url = getRegistryUrl(
			isUrl(itemUrl) ? itemUrl : `styles/${config.style}/${itemUrl}.json`
		);

		if (visited.has(url)) return;

		visited.add(url);

		try {
			const [result] = await fetchRegistry([url]);
			const item = v.parse(schemas.registryItemSchema, result);
			payload.add(url);

			if (item.registryDependencies) {
				for (const dep of item.registryDependencies) {
					await resolveDependencies(dep);
				}
			}
		} catch (e) {
			if (e instanceof CLIError) throw e;
			throw error(`Failed to resolve dependencies for ${itemUrl}`);
		}
	}

	await resolveDependencies(url);
	return Array.from(payload);
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
	if (type === "registry:block" || type === "registry:component") {
		return config.resolvedPaths.components;
	}
	if (type === "registry:hook") return config.resolvedPaths.hooks;
	// TODO - we put this in components for now but will move to the appropriate route location
	// depending on if using SvelteKit or whatever
	if (type === "registry:page") return config.resolvedPaths.cwd;
	return config.resolvedPaths.components;
}
