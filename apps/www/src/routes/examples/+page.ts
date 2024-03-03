import type { PageLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async () => {
	redirect(302, "/examples/mail");
};
