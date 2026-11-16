import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const prerender = false;

export const load: PageLoad = ({ params, url }) => {
	const markdown = params.component.endsWith(".md");
	const component = params.component.replace(/\.md$/, "");
	const destination = component === "form" ? "/docs/forms" : "/docs/typeset";

	redirect(308, `${destination}${markdown ? ".md" : ""}${url.search}`);
};
