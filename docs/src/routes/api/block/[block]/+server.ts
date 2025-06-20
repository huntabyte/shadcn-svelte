import path from "node:path";
import { z } from "zod/v4";
import { json } from "@sveltejs/kit";
import { registryItemFileSchema, registryItemSchema } from "@shadcn-svelte/registry";
import { highlightCode } from "$lib/highlight-code.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import { transformBlockPath, transformImportPaths } from "$lib/registry/registry-utils.js";
import type { RequestHandler } from "./$types.js";

export type HighlightedBlock = z.output<typeof highlightedBlockSchema>;

const highlightedBlockSchema = registryItemSchema
	.pick({ name: true, description: true, meta: true, type: true })
	.extend({
		files: z.array(
			registryItemFileSchema.omit({ content: true }).extend({
				highlightedContent: z.string(),
			})
		),
	});

async function loadItem(block: string): Promise<HighlightedBlock> {
	const { default: mod } = await import(`../../../../__registry__/json/${block}.json`);
	const item = registryItemSchema.parse(mod);
	const meta = blockMeta[item.name as keyof typeof blockMeta];
	const files = item.files.map(async (file) => {
		const lang = path.extname(file.target).slice(1);

		file.content = transformImportPaths(file.content);
		const highlightedContent = await highlightCode(file.content, lang);
		let target;
		if (item.type === "registry:ui") {
			target = file.target;
		} else {
			target = transformBlockPath(file.target, file.type);
		}
		return { ...file, highlightedContent, target };
	});

	return highlightedBlockSchema.parse({
		...item,
		files: await Promise.all(files),
		description: meta?.description,
		meta,
	});
}

export const GET: RequestHandler = async ({ params }) => {
	const { block } = params;
	const item = await loadItem(block);
	return json(item);
};

export const prerender = true;
