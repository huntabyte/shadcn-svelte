import { registryItemSchema } from "@shadcn-svelte/registry";
import type { PageLoad } from "./$types.js";
import * as v from "valibot";
import { highlightCode } from "$lib/highlight-code.js";

export const prerender = true;

type CachedItem = v.InferOutput<typeof registryItemSchema> & { highlightedCode: string };
const registryCache = new Map<string, CachedItem>();

export const load: PageLoad = async () => {
	const registryJsonItems = import.meta.glob("../../../__registry__/json/chart-*.json");
	const promises: Promise<CachedItem | null>[] = [];

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (!filename) continue;
		if (registryCache.has(filename)) {
			promises.push(Promise.resolve(registryCache.get(filename)!));
		} else {
			promises.push(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				registryJsonItems[path]().then(async (m: any) => {
					const parsed = v.parse(registryItemSchema, m.default);
					const highlightedCode = await highlightCode(parsed.files?.[0]?.content ?? "");
					const item = { ...parsed, highlightedCode };
					registryCache.set(filename, item);
					return item;
				})
			);
		}
	}

	const charts = await Promise.all(promises);
	return {
		chartData: charts.filter((chart): chart is CachedItem => chart !== null),
	};
};
