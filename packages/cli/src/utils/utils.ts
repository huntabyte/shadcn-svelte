import * as v from "valibot";

const URLSchema = v.pipe(v.string(), v.url());

export function isUrl(path: string) {
	const result = v.safeParse(URLSchema, path);
	return result.success;
}

/** Adds a trailing slash to the end of the URL, if missing. */
function normalizeURL(url: URL | string): URL {
	if (!(url instanceof URL)) {
		url = new URL(url);
	}

	if (!url.pathname.endsWith("/")) {
		url = new URL(url);
		url.pathname = url.pathname + "/";
	}
	return url;
}

export function resolveURL(base: URL | string, path: string): URL {
	const url = normalizeURL(base);
	return new URL(path, url);
}

export function parseDependency(dep: string) {
	let name = dep;
	let version = "latest";
	if (dep.startsWith("@")) {
		if (dep.includes("@", 1)) {
			// @ts-expect-error should always be true
			[, name, version] = dep.split(/(.*)(?:@)(.*)/);
		}
	} else {
		if (dep.includes("@", 1)) {
			// @ts-expect-error should always be true
			[name, version] = dep.split("@");
		}
	}
	return { name, version };
}
