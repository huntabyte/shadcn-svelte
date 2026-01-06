import path from "node:path";
import type { PageServerLoad, EntryGenerator } from "./$types.js";

const chartTypes = ["area", "bar", "line", "pie", "radar", "radial", "tooltip"] as const;

const charts = import.meta.glob("/src/__registry__/json/chart-*.json");
export const prerender = true;

export const entries: EntryGenerator = () => {
	return chartTypes.map((type) => ({ t: type }));
};

export const load: PageServerLoad = async () => {
	return {
		charts: getChartNames(charts),
	};
};

function getChartNames(glob: Record<string, unknown>) {
	return Object.keys(glob).map((n) => path.parse(n).name);
}
