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

	if (!url.href.endsWith("/")) {
		url = new URL(url);
		url.href += "/";
	}
	return url;
}

export function resolveURL(base: URL | string, path: string): URL {
	const url = normalizeURL(base);
	return new URL(path, url);
}

export function extractFileNameFromPath(path: string): string {
	const parts = path.split("/");
	const fileName = parts[parts.length - 1];
	// TODO: should this throw be handled differently?
	if (!fileName) throw new Error(`Invalid file path: ${path}`);
	return fileName;
}
