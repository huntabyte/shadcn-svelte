import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import color from "chalk";
import { z } from "zod/v4";
import { error } from "./errors.js";
import type { PackageJson } from "type-fest";

export function isUrl(path: string) {
	const result = z.url().safeParse(path);
	return result.success;
}

export const highlight = (...args: unknown[]) => color.bold.cyan(...args);

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

export function resolveDependencyPkg(cwd: string, depName: string): PackageJson | undefined {
	const require = createRequire(path.resolve(cwd, "noop.js"));

	const paths = require.resolve.paths(depName);
	if (!paths) return;

	let pkgPath: string | undefined;
	for (const nodeModulesPath of paths) {
		const check = path.join(nodeModulesPath, depName, "package.json");
		if (fs.existsSync(check)) {
			pkgPath = check;
			break;
		}
	}

	if (!pkgPath) return;

	const json = fs.readFileSync(pkgPath, "utf8");
	return JSON.parse(json);
}

/** Converts a `Set` into an array if its size is greater than 0. Otherwise, `undefined` is returned. */
export function toArray<T>(set: Set<T>): Array<T> | undefined {
	if (set.size > 0) {
		return Array.from(set);
	}
	return undefined;
}
