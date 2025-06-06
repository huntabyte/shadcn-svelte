import {
	registryItemSchema,
	type RegistryItem,
	type RegistryItemFile,
} from "@shadcn-svelte/registry";
import type { PageLoad } from "./$types.js";
import { highlightCode } from "$lib/highlight-code.js";
import { transformBlockPath, transformImportPaths } from "$lib/registry/registry-utils.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";

export const prerender = true;

type Item = Omit<RegistryItem, "files"> & {
	files: (RegistryItemFile & {
		highlightedContent: Promise<string>;
		target: string;
	})[];
};

type Lang = "svelte" | "ts" | "json";

const registryJsonItems = import.meta.glob([
	"../../../__registry__/json/dashboard-*.json",
	"../../../__registry__/json/sidebar-*.json",
	"../../../__registry__/json/login-*.json",
]);

const FEATURED_BLOCKS = ["dashboard-01", "sidebar-07", "sidebar-03", "login-03", "login-04"];

async function loadItem(path: string): Promise<Item> {
	const { default: mod } = (await registryJsonItems[path]()) as { default: unknown };
	const item = registryItemSchema.parse(mod);
	const description = blockMeta[item.name as keyof typeof blockMeta].description;
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

	return { ...item, files: files, description };
}

export const load: PageLoad = async () => {
	const promises: Promise<Item>[] = [];

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (!filename || !FEATURED_BLOCKS.includes(filename)) continue;

		const processedItem = loadItem(path);
		promises.push(processedItem);
	}

	const result = await Promise.all(promises);

	return {
		blocks: result.sort(
			(a, b) => FEATURED_BLOCKS.indexOf(a.name) - FEATURED_BLOCKS.indexOf(b.name)
		),
	};
};
