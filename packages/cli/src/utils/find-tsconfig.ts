// Sourced from tsconfck v2

import { promises as fs } from "fs";
import path from "path";

/**
 * find the closest tsconfig.json file
 *
 * @param {string} filename - path to file to find tsconfig for (absolute or relative to cwd)
 * @param {TSConfckFindOptions} options - options
 * @returns {Promise<string>} absolute path to closest tsconfig.json
 */
export async function find(filename: string, options?: TSConfckFindOptions) {
	let dir = path.dirname(path.resolve(filename));
	const root = options?.root ? path.resolve(options.root) : null;
	while (dir) {
		const tsconfig = await tsconfigInDir(dir, options);
		if (tsconfig) {
			return tsconfig;
		} else {
			if (root === dir) {
				break;
			}
			const parent = path.dirname(dir);
			if (parent === dir) {
				break;
			} else {
				dir = parent;
			}
		}
	}
	throw new Error(`no tsconfig file found for ${filename}`);
}

// Modified to also search for jsconfig.json
async function tsconfigInDir(
	dir: string,
	options?: TSConfckFindOptions
): Promise<string | void> {
	const tsconfig = path.join(dir, "tsconfig.json");
	const jsconfig = path.join(dir, "jsconfig.json");

	if (options?.tsConfigPaths) {
		return options.tsConfigPaths.has(tsconfig) ? tsconfig : undefined;
	}
	try {
		const stat = await fs.stat(tsconfig);
		if (stat.isFile() || stat.isFIFO()) {
			return tsconfig;
		}
	} catch (e: any) {
		// ignore does not exist error
		if (e.code !== "ENOENT") {
			throw e;
		}
	}

	try {
		let stat = await fs.stat(jsconfig);
		if (stat.isFile() || stat.isFIFO()) {
			return jsconfig;
		}
	} catch (e: any) {
		// ignore does not exist error
		if (e.code !== "ENOENT") {
			throw e;
		}
	}
}

export interface TSConfckFindOptions {
	/**
	 * Set of known tsconfig file locations to use instead of scanning the file system
	 *
	 * This is better for performance in projects like vite where find is called frequently but tsconfig locations rarely change
	 * You can use `findAll` to build this
	 */
	tsConfigPaths?: Set<string>;

	/**
	 * project root dir, does not continue scanning outside of this directory.
	 *
	 * Improves performance but may lead to different results from native typescript when no tsconfig is found inside root
	 */
	root?: string;
}
