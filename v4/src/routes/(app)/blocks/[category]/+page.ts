import {
	registryItemSchema,
	type RegistryItem,
	type RegistryItemFile,
} from "@shadcn-svelte/registry";
import type { PageLoad } from "./$types.js";
import { highlightCode } from "$lib/highlight-code.js";
import { transformBlockPath, transformImportPaths } from "$lib/registry/registry-utils.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import { isBlock } from "$lib/blocks.js";

export const prerender = true;

type Item = Omit<RegistryItem, "files"> & {
	files: Array<
		RegistryItemFile & {
			highlightedContent: Promise<string>;
			target: string;
		}
	>;
};

type Lang = "svelte" | "ts" | "json";

let registryJsonItems: Record<string, () => Promise<unknown>>;

async function loadItem(path: string): Promise<Item> {
	const { default: mod } = (await registryJsonItems[path]()) as { default: unknown };
	const item = registryItemSchema.parse(mod);
	const description = blockMeta[item.name as keyof typeof blockMeta]?.description;
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

export const load: PageLoad = async ({ params }) => {
	const category = params.category;

	if (category === "sidebar") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/sidebar-*.json");
	} else if (category === "dashboard") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/dashboard-*.json");
	} else if (category === "login" || category === "authentication") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/login-*.json");
	}

	const promises: Promise<Item>[] = [];

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (!filename || !isBlock(filename)) continue;

		const processedItem = loadItem(path);
		promises.push(processedItem);
	}

	const result = await Promise.all(promises);

	return {
		blocks: result.filter((block): block is Item => block !== null),
	};
};
