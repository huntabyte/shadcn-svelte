import { getChangelogPages } from "$lib/docs.js";
import type { PageLoad } from "./$types.js";

export const prerender = true;

const NUMBER_OF_LATEST_PAGES = 2;

export const load: PageLoad = async () => {
	const pages = await getChangelogPages();

	return {
		latestPages: pages.slice(0, NUMBER_OF_LATEST_PAGES),
		olderPages: pages.slice(NUMBER_OF_LATEST_PAGES),
	};
};
