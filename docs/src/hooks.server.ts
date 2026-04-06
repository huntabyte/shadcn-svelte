import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit";

const PERMANENT = 301;
const TEMPORARY = 302;

const staticPermanent: Record<string, string> = {
	"/docs/components/form": "/docs/forms",
	"/components": "/docs/components",
	"/figma": "/docs/figma",
	"/sidebar": "/docs/components/sidebar",
	"/charts": "/charts/area",
	"/skills": "/docs/skills",
	"/cli": "/docs/cli",
	"/themes": "/create",
};

const staticTemporary: Record<string, string> = {
	"/mcp": "/docs/mcp",
	"/directory": "/docs/directory",
	"/new": "/docs/new",
};

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (staticPermanent[pathname]) {
		redirect(PERMANENT, staticPermanent[pathname]);
	}

	if (staticTemporary[pathname]) {
		redirect(TEMPORARY, staticTemporary[pathname]);
	}

	// /docs/primitives/:path* → /docs/components/:path*
	if (pathname.startsWith("/docs/primitives/")) {
		redirect(PERMANENT, "/docs/components/" + pathname.slice("/docs/primitives/".length));
	}

	// /view/styles/:style/:name → /view/:name
	const viewStylesMatch = pathname.match(/^\/view\/styles\/[^/]+\/([^/]+)$/);
	if (viewStylesMatch) {
		redirect(PERMANENT, `/view/${viewStylesMatch[1]}`);
	}

	// /docs/:path*.mdx → /docs/:path*.md
	if (pathname.startsWith("/docs/") && pathname.endsWith(".mdx")) {
		redirect(PERMANENT, pathname.slice(0, -4) + ".md");
	}

	return resolve(event);
};
