import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { PackageJson } from "type-fest";

export function getPackageInfo() {
	const packageJsonPath = getPackageFilePath("../package.json");
	return readJSONSync(packageJsonPath) as PackageJson;
}

function getPackageFilePath(filePath: string) {
	const distPath = fileURLToPath(new URL(`.`, import.meta.url));

	return path.resolve(distPath, filePath);
}

export function loadProjectPackageInfo(cwd: string) {
	const packageJsonPath = path.resolve(cwd, "package.json");
	return readJSONSync(packageJsonPath) as PackageJson;
}

function readJSONSync(path: string): unknown {
	const content = fs.readFileSync(path, { encoding: "utf8" });
	return JSON.parse(content);
}
