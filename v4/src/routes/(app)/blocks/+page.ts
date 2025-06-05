import {
	registryItemSchema,
	type RegistryItem,
	type RegistryItemFile,
} from "@shadcn-svelte/registry";
import type { PageLoad } from "./$types.js";
import { createHighlighter, highlightCode } from "$lib/highlight-code.js";
import { transformBlockPath, transformImportPaths } from "$lib/registry/registry-utils.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";

// export const prerender = true;

type CachedItem = Omit<RegistryItem, "files"> & {
	files: (RegistryItemFile & {
		highlightedContent: Promise<string>;
		target: string;
	})[];
};

const FEATURED_BLOCKS = ["dashboard-01", "sidebar-07", "sidebar-03", "login-03", "login-04"];

export const load: PageLoad = async () => {
	await createHighlighter();
	const registryJsonItems = import.meta.glob([
		"../../../__registry__/json/dashboard-*.json",
		"../../../__registry__/json/sidebar-*.json",
		"../../../__registry__/json/login-*.json",
	]);
	const promises: Promise<CachedItem | null>[] = [];

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (!filename) continue;
		if (!FEATURED_BLOCKS.includes(filename)) continue;

		promises.push(
			registryJsonItems[path]().then(async (m: unknown) => {
				const res = registryItemSchema.parse((m as { default: unknown }).default);
				const files = await Promise.all(
					res.files.map(async (v) => {
						let lang: "svelte" | "ts" | "json" = "svelte";
						if (v.target && v.target.endsWith(".ts")) {
							lang = "ts";
						} else if (v.target && v.target.endsWith(".json")) {
							lang = "json";
						}

						const highlightedContent = highlightCode(
							transformImportPaths(v.content),
							lang
						);
						const target = v.target ? transformBlockPath(v.target, v.type) : "";
						return {
							...v,
							highlightedContent,
							target,
						};
					})
				);

				const description = blockMeta?.[res.name as keyof typeof blockMeta]?.description;

				const processedItem = {
					...res,
					files: files,
					description,
				};
				return processedItem;
			})
		);
	}

	const result = await Promise.all(promises);

	return {
		blocks: result
			.filter((block): block is CachedItem => block !== null)
			.sort((a, b) => {
				const aIndex = FEATURED_BLOCKS.indexOf(a.name);
				const bIndex = FEATURED_BLOCKS.indexOf(b.name);
				return aIndex - bIndex;
			}),
	};
};
