import color from "picocolors";
import { z } from "zod";
import { error } from "./errors.js";
import { InvalidArgumentError } from "commander";

export function isUrl(path: string) {
	const result = z.url().safeParse(path);
	return result.success;
}

export function parseUrl(value: string): URL {
	try {
		return new URL(value);
	} catch {
		throw new InvalidArgumentError("Invalid URL format.");
	}
}

export const highlight = (str: string) => color.bold(color.cyan(str));

export const stripTrailingSlash = (s: string) => (s.endsWith("/") ? s.slice(0, -1) : s);

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
	let name: string | undefined = dep;
	let version: string | undefined = "latest";

	if (dep.startsWith("@")) {
		if (dep.includes("@", 1)) {
			[, name, version] = dep.split(/(.*)(?:@)(.*)/);
		}
	} else {
		if (dep.includes("@", 1)) {
			[name, version] = dep.split("@");
		}
	}

	if (!name || !version) throw error(`Failed to parse dependency: ${dep}`);

	return { name, version };
}

/** Converts a `Set` into an array if its size is greater than 0. Otherwise, `undefined` is returned. */
export function toArray<T>(set: Set<T>): Array<T> | undefined {
	if (set.size > 0) {
		return Array.from(set);
	}
	return undefined;
}

/**
 * A highly naive implementation of deep partialification. Unfortunately the latest version of zod doesn't support this at this time. If there ever comes a time where it does let's replace this method ASAP.
 *
 * @see https://github.com/colinhacks/zod/issues/2854
 *
 * @param schema
 * @returns
 */
export function naiveDeepPartialify(schema: z.ZodObject): z.ZodObject {
	const newShape: Record<string, z.ZodType> = {};

	Object.entries(schema.shape).forEach(([key, value]) => {
		if (value instanceof z.ZodObject) {
			newShape[key] = naiveDeepPartialify(value).optional();
		} else {
			newShape[key] = z.optional(value);
		}
	});

	return z.object(newShape);
}
