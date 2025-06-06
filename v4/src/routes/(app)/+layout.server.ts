import { z } from "zod";
import { FALLBACK_STAR_COUNT } from "$lib/constants.js";
import { USER_CONFIG_COOKIE_NAME, userConfigSchema } from "$lib/user-config.svelte.js";
import type { LayoutServerLoad } from "./$types.js";

const githubRepoSchema = z
	.object({
		repo: z.object({
			stars: z.number(),
		}),
	})
	.transform((data) => data.repo.stars);

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const sidebarState = cookies.get("sidebar_state") === "true" ? true : false;

	async function getGithubStarCount() {
		try {
			const res = await fetch("https://ungh.cc/repos/huntabyte/shadcn-svelte");
			const data = await res.json();
			return githubRepoSchema.parse(data);
		} catch (error) {
			console.error(error);
			return FALLBACK_STAR_COUNT;
		}
	}

	const userConfigCookie = cookies.get(USER_CONFIG_COOKIE_NAME);
	const parsedUserConfig = userConfigCookie ? JSON.parse(userConfigCookie) : {};
	const userConfig = userConfigSchema.parse(parsedUserConfig);

	return {
		sidebarState,
		stars: await getGithubStarCount(),
		userConfig,
	};
};
