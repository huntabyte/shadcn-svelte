import type { EntryGenerator, PageLoad } from "./$types.js";
import { registryCategories } from "$lib/registry/registry-categories.js";
import type { Component } from "svelte";
import { error } from "@sveltejs/kit";
import type { HighlightedBlock } from "../../../../api/block/[block]/+server.js";

export const prerender = true;

export const entries: EntryGenerator = () =>
	registryCategories.filter((c) => !c.hidden).map(({ slug }) => ({ category: slug }));

type Item = HighlightedBlock & {
	component?: Promise<Component>;
};

const calendarComponents = import.meta.glob("/src/lib/registry/blocks/calendar-*.svelte", {
	import: "default",
});

export const load: PageLoad = async ({ params, data, fetch }) => {
	const category = params.category;

	let loadItems;

	if (category === "sidebar") {
		loadItems = data.sidebars.map(async (block) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as Item;
		});
	} else if (category === "dashboard") {
		loadItems = data.dashboards.map(async (block) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as Item;
		});
	} else if (category === "login") {
		loadItems = data.logins.map(async (block) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as Item;
		});
	} else if (category === "calendar") {
		loadItems = data.calendars.map(async (block) => {
			const resp = await fetch(`/api/block/${block}`);
			const item = (await resp.json()) as Item;
			const path = `/src/lib/registry/blocks/${block}.svelte`;
			item.component = calendarComponents[path]() as Promise<Component>;
			return item;
		});
	} else if (category === "otp") {
		loadItems = data.otps.map(async (block) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as Item;
		});
	} else if (category === "sign-up") {
		loadItems = data.signUps.map(async (block) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as Item;
		});
	} else {
		error(404);
	}

	const blocks = await Promise.all(loadItems);

	return { blocks };
};
