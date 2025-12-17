import type { HighlightedBlock } from "../../../api/block/[block]/+server.js";
import type { EntryGenerator, PageLoad } from "./$types.js";

const chartTypes = ["area", "bar", "line", "pie", "radar", "radial", "tooltip"] as const;
type ChartType = (typeof chartTypes)[number];

export const prerender = true;

export const entries: EntryGenerator = () => {
	return chartTypes.map((type) => ({ t: type }));
};

export const load: PageLoad = async ({ params, data, fetch }) => {
	const loadItems = data.charts.map(async (chart) => {
		const res = await fetch(`/api/block/${chart}`);
		const item = (await res.json()) as HighlightedBlock;
		return item;
	});

	return {
		charts: await Promise.all(loadItems),
		type: params.t as ChartType,
	};
};
