import { redirect } from "@sveltejs/kit";

export function load({ url }) {
	redirect(303, `/create/preview${url.search}`);
}
