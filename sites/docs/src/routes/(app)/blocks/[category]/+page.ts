import { registryItemSchema, type RegistryItemFile } from "@shadcn-svelte/registry";
import type { PageLoad } from "./$types.js";
import * as v from "valibot";
import { highlightCode } from "$lib/highlight-code.js";
import { transformBlockPath, transformImportPaths } from "$lib/registry/registry-utils.js";
import { isBlock } from "$lib/blocks.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";

export const prerender = true;

type CachedItem = Omit<v.InferOutput<typeof registryItemSchema>, "files"> & {
	files: (RegistryItemFile & {
		highlightedContent: string;
		target: string;
	})[];
};

export const load: PageLoad = async ({ params }) => {
	const category = params.category;

	let registryJsonItems: Record<string, () => Promise<unknown>> = {};

	// remove the items that don't match the category from the object.

	if (category === "sidebar") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/sidebar-*.json");
	} else if (category === "dashboard") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/dashboard-*.json");
	} else if (category === "login" || category === "authentication") {
		registryJsonItems = import.meta.glob("../../../../__registry__/json/login-*.json");
	}

	const promises: Promise<CachedItem | null>[] = [];

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (!filename) continue;
		if (!isBlock(filename)) continue;

		promises.push(
			registryJsonItems[path]().then(async (m: unknown) => {
				const res = v.parse(registryItemSchema, (m as { default: unknown }).default);
				const files = await Promise.all(
					res.files.map(async (v) => {
						let lang: "svelte" | "ts" | "json" = "svelte";
						if (v.target && v.target.endsWith(".ts")) {
							lang = "ts";
						} else if (v.target && v.target.endsWith(".json")) {
							lang = "json";
						}

						const highlightedContent = await highlightCode(
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
		blocks: result.filter((block): block is CachedItem => block !== null),
	};
};
