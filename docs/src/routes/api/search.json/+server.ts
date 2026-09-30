import type { RequestHandler } from "@sveltejs/kit";

export const prerender = true;

const searchDataModules = import.meta.glob("./search.json", {
	eager: true,
	import: "default",
});
const searchData = searchDataModules["./search.json"] ?? [];

export const GET: RequestHandler = async () => {
	return Response.json(searchData);
};
