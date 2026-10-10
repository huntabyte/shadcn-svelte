import stylesheet from "$lib/styles/typeset.css?raw";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = () => {
	return new Response(stylesheet, {
		headers: {
			"content-type": "text/css; charset=utf-8",
			"cache-control": "no-store",
		},
	});
};
