import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import type { PackageJson } from "type-fest";

export function getCLIPackageInfo(): PackageJson {
	const packageJsonPath = getPackageFilePath("../package.json");
	return readJSONSync(packageJsonPath) as PackageJson;
}

function getPackageFilePath(filePath: string) {
	const distPath = fileURLToPath(new URL(`.`, import.meta.url));

	return path.resolve(distPath, filePath);
}

export function getProjectPackageInfo(cwd: string) {
	const packageJsonPath = path.resolve(cwd, "package.json");
	return readJSONSync(packageJsonPath) as PackageJson;
}

function readJSONSync(path: string): unknown {
	const content = fs.readFileSync(path, { encoding: "utf8" });
	return JSON.parse(content);
}

export function getDependencyPackageInfo(cwd: string, depName: string) {
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

	return { pkg: JSON.parse(json) as PackageJson, path: pkgPath };
}
