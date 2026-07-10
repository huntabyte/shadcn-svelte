import type { RequestHandler } from "./$types";
import stylesheet from "$lib/styles/typeset.css?raw";

export const GET: RequestHandler = () => {
	return new Response(stylesheet, {
		headers: {
			"content-type": "text/css; charset=utf-8",
			"cache-control": "no-store",
		},
	});
};
