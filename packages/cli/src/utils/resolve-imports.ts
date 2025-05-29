import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { type TsConfigResult, createPathsMatcher } from "get-tsconfig";
import * as resolve from "resolve.exports";
import { getDependencyPackageInfo, getProjectPackageInfo } from "./get-package-info.js";
import type { PackageJson } from "type-fest";

const NOOP = "/noop.js";

type ResolveImportOpts = {
	importPath: string;
	tsconfig: TsConfigResult;
	cwd: string;
};

/**
 * Returns the absolute path for a given `components.json` import alias.
 */
export function resolveImportAlias(opts: ResolveImportOpts): string | undefined {
	const matcher = createPathsMatcher(opts.tsconfig);

	// resolves the path if it's defined in the tsconfig
	const resolvedPath = matcher?.(opts.importPath)?.[0];
	if (resolvedPath) return resolvedPath;

	// resolves the path if it's in the project's import map
	const pkg = getProjectPackageInfo(opts.cwd);
	if (opts.importPath.startsWith("#")) {
		const pkgPath = path.resolve(opts.cwd, "package.json");
		const resolvedPath = resolveAlias(pkg, pkgPath, opts.importPath);
		if (resolvedPath) return resolvedPath;
	}

	// resolves the path if it's a workspace package
	const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
	for (const depName of deps) {
		if (!opts.importPath.startsWith(depName)) continue;

		const depInfo = getDependencyPackageInfo(opts.cwd, depName);
		if (!depInfo) continue;

		const resolvedPath = resolveAlias(depInfo.pkg, depInfo.path, opts.importPath);
		if (resolvedPath) return resolvedPath;
	}
}

function resolveAlias(pkg: PackageJson, pkgPath: string, aliasedPath: string) {
	try {
		const relativePath = resolve.resolve(pkg, aliasedPath + NOOP)?.[0];
		if (relativePath) {
			const fileUrl = pathToFileURL(pkgPath);
			const resolvedPath = new URL(relativePath.slice(0, -NOOP.length), fileUrl).href;
			return fileURLToPath(resolvedPath);
		}
	} catch {
		return undefined;
	}
}
