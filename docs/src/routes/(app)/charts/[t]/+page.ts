import { highlightCode } from "$lib/highlight-code.js";
import { registryItemSchema, type RegistryItem } from "@shadcn-svelte/registry";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

const chartTypes = ["area", "bar", "line", "pie", "radar", "radial", "tooltip"] as const;
type ChartType = (typeof chartTypes)[number];

export const prerender = true;

type CachedItem = RegistryItem & { highlightedCode: Promise<string> };
const registryCache = new Map<string, CachedItem>();

export const load: PageLoad = async ({ params }) => {
	if (!chartTypes.includes(params.t as ChartType)) {
		error(404, "Not found.");
	}
	const registryJsonItems = import.meta.glob("../../../../__registry__/json/chart-*.json");
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
					const parsed = registryItemSchema.parse(m.default);
					const highlightedCode = highlightCode(parsed.files?.[0]?.content ?? "");
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
		type: params.t as ChartType,
	};
};
