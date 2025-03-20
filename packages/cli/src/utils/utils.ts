export function isUrl(path: string) {
	try {
		new URL(path);
		return true;
	} catch {
		return false;
	}
}

/** Returns the base url and the last segment of the pathname of the given url. Expects a valid URL. */
export function urlSplitLastPathSegment(url: URL): [string, string] {
	const lastIndex = url.toString().lastIndexOf('/');

	const urlString = url.toString();

	return [urlString.slice(0, lastIndex), urlString.slice(lastIndex + 1)];
}