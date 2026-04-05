import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit";

const PERMANENT = 301;
const TEMPORARY = 302;

const staticPermanent: Record<string, string> = {
	"/docs/components/form": "/docs/forms",
	"/docs/components/radix/form": "/docs/forms",
	"/docs/components/base/form": "/docs/forms",
	"/components": "/docs/components",
	"/figma": "/docs/figma",
	"/sidebar": "/docs/components/sidebar",
	"/react-19": "/docs/react-19",
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

	// /docs/components/:name → /docs/components/radix/:name
	// (only when :name is not "radix", "base", or "form", and is a single segment)
	const componentMatch = pathname.match(/^\/docs\/components\/([^/]+)$/);
	if (componentMatch) {
		const name = componentMatch[1];
		if (name !== "radix" && name !== "base" && name !== "form") {
			redirect(TEMPORARY, `/docs/components/radix/${name}`);
		}
	}

	// /docs/components/:name.md → /docs/components/radix/:name.md
	const componentMdMatch = pathname.match(/^\/docs\/components\/([^/]+)\.md$/);
	if (componentMdMatch) {
		const name = componentMdMatch[1];
		if (name !== "radix" && name !== "base" && name !== "form") {
			redirect(TEMPORARY, `/docs/components/radix/${name}.md`);
		}
	}

	return resolve(event);
};
