import {
	registryItemSchema,
	type RegistryItem,
	type RegistryItemFile,
} from "@shadcn-svelte/registry";
import type { EntryGenerator, PageLoad } from "./$types.js";
import { highlightCode } from "$lib/highlight-code.js";
import { transformBlockPath, transformImportPaths } from "$lib/registry/registry-utils.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import { isBlock } from "$lib/blocks.js";
import { registryCategories } from "$lib/registry/registry-categories.js";
import type { Component } from "svelte";

export const prerender = true;

export const entries: EntryGenerator = () =>
	registryCategories.filter((c) => !c.hidden).map(({ slug }) => ({ category: slug }));

type Item = Omit<RegistryItem, "files"> & {
	files: Array<
		RegistryItemFile & {
			highlightedContent: Promise<string>;
			target: string;
		}
	>;
} & {
	component?: Component;
};

type Lang = "svelte" | "ts" | "json";

let registryJsonItems: Record<string, () => Promise<unknown>>;
let components: Record<string, () => Promise<unknown>>;

function getComponentPath(filename: string) {
	return `../../../../lib/registry/blocks/${filename}.svelte`;
}

async function loadItem(path: string, componentPath?: string): Promise<Item> {
	let jsonMod: { default: unknown };
	let componentMod: { default: Component | undefined } = { default: undefined };

	if (componentPath && components[componentPath]) {
		[jsonMod, componentMod] = await Promise.all([
			registryJsonItems[path]() as Promise<{ default: unknown }>,
			components[componentPath]() as Promise<{ default: Component }>,
		]);
	} else {
		jsonMod = (await registryJsonItems[path]()) as { default: unknown };
	}

	const item = registryItemSchema.parse(jsonMod.default);
	const meta = blockMeta[item.name as keyof typeof blockMeta];
	const files = item.files.map((file) => {
		let lang: Lang = "svelte";
		if (file.target.endsWith(".ts")) {
			lang = "ts";
		} else if (file.target.endsWith(".json")) {
			lang = "json";
		}

		const highlightedContent = highlightCode(transformImportPaths(file.content), lang);
		const target = file.target ? transformBlockPath(file.target, file.type) : "";
		return { ...file, highlightedContent, target };
	});

	return {
		...item,
		files: files,
		description: meta?.description,
		meta,
		component: componentMod.default,
	};
}

export const load: PageLoad = async ({ params }) => {
	const category = params.category;

	if (category === "sidebar") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/sidebar-*.json");
	} else if (category === "dashboard") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/dashboard-*.json");
	} else if (category === "login" || category === "authentication") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/login-*.json");
	} else if (category === "calendar") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/calendar-*.json");
		components = import.meta.glob("../../../../lib/registry/blocks/calendar-*.svelte");
	}

	const promises: Promise<Item>[] = [];

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (!filename || !isBlock(filename)) continue;

		const processedItem = loadItem(
			path,
			category === "calendar" ? getComponentPath(filename) : undefined
		);
		promises.push(processedItem);
	}

	const result = await Promise.all(promises);

	return {
		blocks: result.filter((block): block is Item => block !== null),
	};
};
