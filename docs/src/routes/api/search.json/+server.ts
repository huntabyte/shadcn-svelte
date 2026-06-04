import type { RequestHandler } from "@sveltejs/kit";
import search from "./search.json?raw";

export const prerender = true;

export const GET: RequestHandler = async () => {
	return new Response(search, {
		headers: {
			"content-type": "application/json",
		},
	});
};
