// !! BROWSER SAFE !!

import { z } from "zod";

export function isUrl(path: string) {
	const result = z.url().safeParse(path);
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

/** Converts a `Set` into an array if its size is greater than 0. Otherwise, `undefined` is returned. */
export function toArray<T>(set: Set<T>): Array<T> | undefined {
	if (set.size > 0) {
		return Array.from(set);
	}
	return undefined;
}

export function pascalToKebab(str: string): string {
	return str
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/([a-zA-Z])(\d)/g, "$1-$2")
		.replace(/(\d)([a-zA-Z])/g, "$1-$2")
		.toLowerCase();
}

export function kebabToPascal(str: string): string {
	return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Type safe version of `Object.entries`.
 *
 * @param obj
 * @returns
 */
export function entries<T extends Record<string, unknown>>(obj: T): [keyof T, T[keyof T]][] {
	return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Type safe version of `Object.keys`.
 *
 * @param obj
 * @returns
 */
export function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[];
}
