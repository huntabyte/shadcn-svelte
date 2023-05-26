import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async () => {
	throw redirect(303, "/docs/components");
};
