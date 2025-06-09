import path from "node:path";
import { registryCategories } from "$lib/registry/registry-categories.js";
import type { EntryGenerator, PageServerLoad } from "./$types.js";

const sidebars = import.meta.glob("/src/__registry__/json/sidebar-*.json");
const dashboards = import.meta.glob("/src/__registry__/json/dashboard-*.json");
const logins = import.meta.glob("/src/__registry__/json/login-*.json");
const calendars = import.meta.glob("/src/__registry__/json/calendar-*.json");

export const prerender = true;

export const entries: EntryGenerator = () =>
	registryCategories.filter((c) => !c.hidden).map(({ slug }) => ({ category: slug }));

export const load: PageServerLoad = async () => {
	return {
		calendars: getBlockNames(calendars),
		dashboards: getBlockNames(dashboards),
		logins: getBlockNames(logins),
		sidebars: getBlockNames(sidebars),
	};
};

function getBlockNames(glob: Record<string, unknown>) {
	return Object.keys(glob).map((n) => path.parse(n).name);
}
