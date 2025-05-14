import { registryItemSchema } from "@shadcn-svelte/registry";
import type { PageLoad } from "./$types.js";
import * as v from "valibot";
import { highlightCode } from "$lib/highlight-code.js";
export const prerender = true;

export const load: PageLoad = async () => {
	const registryJsonItems = import.meta.glob("../../../__registry__/json/chart-*.json");

	const promises: Promise<v.InferOutput<typeof registryItemSchema> | null>[] = [];

	for (const path in registryJsonItems) {
		const filename = path.split("/").pop()?.split(".")[0];
		if (filename) {
			promises.push(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				registryJsonItems[path]().then((m: any) => v.parse(registryItemSchema, m.default))
			);
		}
	}

	const rawChartData = await Promise.all(promises);

	const highlightPromises: Promise<
		v.InferOutput<typeof registryItemSchema> & { highlightedCode: string }
	>[] = [];

	for (const chart of rawChartData) {
		if (chart) {
			highlightPromises.push(
				highlightCode(chart.files?.[0]?.content ?? "").then((v) => ({
					...chart,
					highlightedCode: v,
				}))
			);
		}
	}

	const chartsWithHighlightedCode = await Promise.all(highlightPromises);
	return {
		chartData: chartsWithHighlightedCode,
	};
};
