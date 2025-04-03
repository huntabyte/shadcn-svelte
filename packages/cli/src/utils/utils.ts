import * as v from "valibot";

const URLSchema = v.pipe(v.string(), v.url());

export function isUrl(path: string) {
	const result = v.safeParse(URLSchema, path);
	return result.success;
}

/** Adds a trailing slash to the end of the URL, if missing. */
export function normalizeURL(url: URL | string): URL {
	if (!(url instanceof URL)) {
		url = new URL(url);
	}

	if (!url.href.endsWith("/")) {
		url = new URL(url);
		url.href += "/";
	}
	return url;
}
