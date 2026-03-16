import { redirect } from "@sveltejs/kit";

export function GET({ url }) {
	redirect(303, `/create/home${url.search}`);
}
