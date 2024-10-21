import { fetch } from "node-fetch-native";
import { createProxy } from "node-fetch-native/proxy";
import path from "node:path";
import process from "node:process";
import * as v from "valibot";
import { error } from "../errors.js";
import type { Config } from "../get-config.js";
import { getEnvProxy } from "../get-env-proxy.js";
import * as schemas from "./schema.js";

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? "https://shadcn-svelte.com";

export type RegistryItem = v.InferOutput<typeof schemas.registryItemSchema>;

function getRegistryUrl(path: string) {
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
		{
			name: "slate",
			label: "Slate",
		},
		{
			name: "gray",
			label: "Gray",
		},
		{
			name: "zinc",
			label: "Zinc",
		},
		{
			name: "neutral",
			label: "Neutral",
		},
		{
			name: "stone",
			label: "Stone",
		},
	];
}

export function getStyles() {
	return [
		{
			name: "default",
			label: "Default",
		},
		{
			name: "new-york",
			label: "New York",
		},
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

export async function resolveTree(index: RegistryIndex, names: string[], includeRegDeps = true) {
	const tree: RegistryIndex = [];

	for (const name of names) {
		const entry = index.find((entry) => entry.name === name);

		if (!entry) {
			continue;
		}

		tree.push(entry);

		if (includeRegDeps && entry.registryDependencies) {
			const dependencies = await resolveTree(index, entry.registryDependencies);
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
	const proxyUrl = getEnvProxy();
	const proxy = proxyUrl ? createProxy({ url: proxyUrl }) : {};
	try {
		const results = await Promise.all(
			paths.map(async (path) => {
				const response = await fetch(`${baseUrl}/registry/${path}`, {
					...proxy,
				});
				return await response.json();
			})
		);

		return results;
	} catch {
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

		const uniqueRegistryDeps = Array.from(new Set(registryDependencies));
		const result = await fetchRegistry(uniqueRegistryDeps);
		const payload = v.parse(v.array(schemas.registryItemSchema), result);

		if (!payload) return null;

		return v.parse(schemas.registryResolvedItemsTreeSchema, {
			dependencies: payload.map((item) => item.dependencies ?? []),
			files: payload.map((item) => item.files ?? []),
		});
	} catch (err) {
		console.error(err);
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
		} catch {
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
