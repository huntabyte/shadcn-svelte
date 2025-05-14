import { registryItemSchema } from "@shadcn-svelte/registry";
import * as v from "valibot";
import { highlightCode } from "./highlight-code.js";

const registryJsonItems = import.meta.glob("../__registry__/json/*.json");
const cachedRegistryItems = new Map<string, v.InferOutput<typeof registryItemSchema>>();
const cachedHighlightedCode = new Map<string, string>();

async function getRawRegistryItem(
	name: string
): Promise<v.InferOutput<typeof registryItemSchema> | null> {
	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (filename === name) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return await registryJsonItems[path]().then((m: any) =>
				v.parse(registryItemSchema, m.default)
			);
		}
	}
	return null;
}

export async function getRegistryItem(name: string) {
	const cachedItem = cachedRegistryItems.get(name);
	if (cachedItem) return cachedItem;
	const result = await getRawRegistryItem(name);
	if (!result) return null;
	cachedRegistryItems.set(name, result);
	return result;
}

export async function getHighlightedCode(name: string) {
	const cachedCode = cachedHighlightedCode.get(name);
	if (cachedCode) return cachedCode;
	const item = await getRegistryItem(name);
	if (!item) return null;
	const firstFile = item.files[0];
	if (!firstFile) return null;
	const highlightedCode = await highlightCode(firstFile.content);
	cachedHighlightedCode.set(name, highlightedCode);
	return highlightedCode;
}
