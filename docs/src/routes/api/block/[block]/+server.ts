import path from "node:path";
import { z } from "zod";
import { json } from "@sveltejs/kit";
import { registryItemSchema } from "@shadcn-svelte/registry";
import { highlightCode } from "$lib/highlight-code.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import {
	transformBlockPath,
	transformDesignSystem,
	transformImportPaths,
} from "$lib/registry/registry-utils.js";
import type { RequestHandler } from "./$types.js";
import {
	DEFAULT_CONFIG,
	getIconLibrary,
	getStyle,
	type IconLibraryName,
	type StyleName,
} from "$lib/registry/config.js";

export interface HighlightedBlock {
	name: string;
	description?: string;
	meta?: Record<string, unknown>;
	type: string;
	files: HighlightedFile[];
}

export interface HighlightedFile {
	type:
		| "registry:file"
		| "registry:page"
		| "registry:ui"
		| "registry:component"
		| "registry:lib"
		| "registry:hook"
		| "registry:theme"
		| "registry:style";
	target: string;
	highlightedContent: string;
}

const highlightedBlockSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	meta: z.record(z.string(), z.unknown()).optional(),
	type: z.string(),
	files: z.array(
		z.object({
			type: z.enum([
				"registry:file",
				"registry:page",
				"registry:ui",
				"registry:component",
				"registry:lib",
				"registry:hook",
				"registry:theme",
				"registry:style",
			]),
			target: z.string(),
			highlightedContent: z.string(),
		})
	),
});

async function loadItem(
	block: string,
	{ designSystem }: { designSystem: { style: StyleName; iconLibrary: IconLibraryName } }
): Promise<HighlightedBlock> {
	const { default: mod } = await import(`../../../../__registry__/json/${block}.json`);
	const item = registryItemSchema.parse(mod);
	const meta = blockMeta[item.name as keyof typeof blockMeta];
	const files = item.files?.map(async (file) => {
		const lang = path.extname(file.target).slice(1);

		file.content = transformImportPaths(file.content);
		file.content = await transformDesignSystem(file.content, file.target, designSystem);
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
		files: files ? await Promise.all(files) : [],
		description: meta?.description,
		meta,
	});
}

export const GET: RequestHandler = async ({ params, url }) => {
	const style = url.searchParams.get("style");
	const iconLibrary = url.searchParams.get("iconLibrary");

	const { block } = params;
	const item = await loadItem(block, {
		designSystem: {
			style: getStyle((style ?? "") as StyleName)?.name ?? DEFAULT_CONFIG.style,
			iconLibrary:
				getIconLibrary((iconLibrary ?? "") as IconLibraryName)?.name ??
				DEFAULT_CONFIG.iconLibrary,
		},
	});
	return json(item);
};

export const prerender = true;
