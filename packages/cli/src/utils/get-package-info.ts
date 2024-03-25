// Credit to @shadcn for the original code. It has been slightly modified to fit the needs of this project.

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { PackageJson } from "type-fest";

export function getPackageInfo() {
	const packageJsonPath = getPackageFilePath("../package.json");

	return readJSONSync(packageJsonPath) as PackageJson;
}

function getPackageFilePath(filePath: string) {
	let distPath = fileURLToPath(new URL(`.`, import.meta.url));

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

// we'll load the user's package.json and check if @sveltejs/kit is a dependency
export function isUsingSvelteKit(cwd: string): boolean {
	const packageJSON = loadProjectPackageInfo(cwd);
	const deps = { ...packageJSON.devDependencies, ...packageJSON.dependencies };
	return deps["@sveltejs/kit"] !== undefined;
}
