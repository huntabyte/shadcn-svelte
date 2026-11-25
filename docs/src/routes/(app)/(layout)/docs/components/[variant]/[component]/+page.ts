import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

// Component links from shadcn/ui can include any primitive library prefix.
export const prerender = false;

export const load: PageLoad = ({ params, url }) => {
	redirect(301, `/docs/components/${encodeURIComponent(params.component)}${url.search}`);
};
