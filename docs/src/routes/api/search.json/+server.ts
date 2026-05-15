import type { RequestHandler } from "@sveltejs/kit";
import search from "./search.json" with { type: "json" };

export const prerender = true;

export const GET: RequestHandler = async () => {
	return Response.json(search);
};
