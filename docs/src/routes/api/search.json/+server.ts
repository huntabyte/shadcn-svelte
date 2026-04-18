import { readFileSync } from "node:fs";
import type { RequestHandler } from "@sveltejs/kit";

export const prerender = true;

export const GET: RequestHandler = async () => {
	const search = JSON.parse(readFileSync(new URL("./search.json", import.meta.url), "utf-8"));
	return Response.json(search);
};
