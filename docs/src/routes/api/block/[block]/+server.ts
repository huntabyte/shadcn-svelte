import path from "node:path";
import { json } from "@sveltejs/kit";
import {
	registryItemSchema,
	type RegistryItem,
	type RegistryItemFile,
} from "@shadcn-svelte/registry";
import { highlightCode } from "$lib/highlight-code.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import { transformBlockPath, transformImportPaths } from "$lib/registry/registry-utils.js";
import type { RequestHandler } from "./$types.js";

// TODO: remove unnecessary fields from this object
type Item = Omit<RegistryItem, "files"> & {
	files: (RegistryItemFile & {
		highlightedContent: string;
		target: string;
	})[];
};

async function loadItem(block: string): Promise<Item> {
	const { default: mod } = await import(`../../../../__registry__/json/${block}.json`);
	const item = registryItemSchema.parse(mod);
	const meta = blockMeta[item.name as keyof typeof blockMeta];
	const files = item.files.map(async (file) => {
		const lang = path.extname(file.target).slice(1);

		file.content = transformImportPaths(file.content);
		const highlightedContent = await highlightCode(file.content, lang);
		const target = file.target ? transformBlockPath(file.target, file.type) : "";
		return { ...file, highlightedContent, target };
	});

	return { ...item, files: await Promise.all(files), description: meta?.description, meta };
}

export const GET: RequestHandler = async ({ params }) => {
	const { block } = params;
	const item = await loadItem(block);
	return json(item);
};

export const prerender = true;
