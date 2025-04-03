import * as v from "valibot";

const URLSchema = v.pipe(v.string(), v.url());

export function isUrl(path: string) {
	const result = v.safeParse(URLSchema, path);
	return result.success;
}

/** Returns the base url and the last segment of the pathname of the given URL. Expects a valid URL. */
export function urlSplitLastPathSegment(url: URL): [string, string] {
	// strips any trailing slashes
	if (url.href.endsWith("/")) {
		url.href = url.href.slice(0, -1);
	}

	const href = url.href;
	const lastIndex = href.lastIndexOf("/");
	const base = href.slice(0, lastIndex);
	const lastSegment = href.slice(lastIndex + 1);

	return [base, lastSegment];
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
