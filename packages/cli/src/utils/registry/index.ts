import path from "node:path";
import process from "node:process";
import * as v from "valibot";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
import { error } from "../errors.js";
import { getEnvProxy } from "../get-env-proxy.js";
import type { Config } from "../get-config.js";
import * as schemas from "./schema.js";

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? "https://shadcn-svelte.com";

export type RegistryItem = v.Output<typeof schemas.registryItemSchema>;

export async function getRegistryIndex() {
	try {
		const [result] = await fetchRegistry(["index.json"]);

		return v.parse(schemas.registryIndexSchema, result);
	} catch (e) {
		throw error(`Failed to fetch components from registry.`);
	}
}

export async function getRegistryStyles() {
	try {
		const [result] = await fetchRegistry(["styles/index.json"]);

		return v.parse(schemas.stylesSchema, result);
	} catch (e) {
		throw error(`Failed to fetch styles from registry.`);
	}
}

export async function getRegistryBaseColors() {
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

export async function getRegistryBaseColor(baseColor: string) {
	try {
		const [result] = await fetchRegistry([`colors/${baseColor}.json`]);

		return v.parse(schemas.registryBaseColorSchema, result);
	} catch (e) {
		throw error(`Failed to fetch base color from registry.`);
	}
}

type RegistryIndex = v.Output<typeof schemas.registryIndexSchema>;
export async function resolveTree(index: RegistryIndex, names: string[]) {
	const tree: RegistryIndex = [];

	for (const name of names) {
		const entry = index.find((entry) => entry.name === name);

		if (!entry) {
			continue;
		}

		tree.push(entry);

		if (entry.registryDependencies) {
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
	} catch (e) {
		throw error(`Failed to fetch tree from registry.`);
	}
}

export function getItemTargetPath(
	config: Config,
	item: Pick<v.Output<typeof schemas.registryItemWithContentSchema>, "type">,
	override?: string
) {
	// Allow overrides for all items but ui.
	if (override && item.type !== "components:ui") {
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
	const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;
	try {
		const results = await Promise.all(
			paths.map(async (path) => {
				const response = await fetch(`${baseUrl}/registry/${path}`, { agent });
				return await response.json();
			})
		);

		return results;
	} catch (e) {
		throw error(`Failed to fetch registry from ${baseUrl}.`);
	}
}
