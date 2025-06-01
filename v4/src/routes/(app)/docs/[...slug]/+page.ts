import { getDoc } from "$lib/docs.js";
import {
	registryItemSchema,
	type RegistryItem,
	type RegistryItemFile,
} from "@shadcn-svelte/registry";
import type { EntryGenerator } from "./$types.js";
import { highlightCode } from "$lib/highlight-code.js";
import { transformImportPaths } from "$lib/registry/registry-utils.js";

export async function load({ params }) {
	const [doc, viewerData] = await Promise.all([
		getDoc(params.slug),
		getComponentViewerData(params.slug.replaceAll("components/", "")),
	]);

	return {
		...doc,
		viewerData,
	};
}

export const entries: EntryGenerator = () => {
	console.info("Prerendering /docs");
	const modules = import.meta.glob("/content/**/*.md");
	const entries = [];

	for (const path of Object.keys(modules)) {
		const slug = path.replace("/content/", "").replace(".md", "").replace("/index", "");
		entries.push({ slug });
	}

	return entries;
};

type CachedItem = Omit<RegistryItem, "files"> & {
	files: (RegistryItemFile & {
		highlightedContent: string;
		target: string;
	})[];
};

async function getComponentViewerData(componentName: string) {
	const registryJsonItems = import.meta.glob("../../../../__registry__/json/*.json");
	let promise: Promise<CachedItem | null> | null = null;

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (!filename) continue;
		if (filename !== componentName) continue;

		promise = registryJsonItems[path]().then(async (m: unknown) => {
			const res = registryItemSchema.parse((m as { default: unknown }).default);
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
					const target = v.target;
					return {
						...v,
						highlightedContent,
						target,
					};
				})
			);

			const processedItem = {
				...res,
				files: files,
			};
			return processedItem;
		});
	}

	return await promise;
}
