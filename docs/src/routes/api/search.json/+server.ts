import type { RequestHandler } from "@sveltejs/kit";
import { buildSearchData } from "../../../../scripts/build-search-data.js";

export const prerender = true;

export const GET: RequestHandler = async () => {
	return Response.json(await buildSearchData());
};
