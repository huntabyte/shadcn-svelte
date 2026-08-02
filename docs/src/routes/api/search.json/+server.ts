import searchData from "./search.json" with { type: "json" };
import type { RequestHandler } from "@sveltejs/kit";

export const prerender = true;

export const GET: RequestHandler = async () => {
	return Response.json(searchData);
};
