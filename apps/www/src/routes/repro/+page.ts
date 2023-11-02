import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	throw redirect(
		302,
		"https://stackblitz.com/github/huntabyte/shadcn-repro-template"
	);
};
