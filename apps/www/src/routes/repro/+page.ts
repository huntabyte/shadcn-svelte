import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = async () => {
	redirect(302, "https://stackblitz.com/github/huntabyte/shadcn-repro-template");
};
