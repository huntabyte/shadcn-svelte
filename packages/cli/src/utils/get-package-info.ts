// Credit to @shadcn for the original code. It has been slightly modified to fit the needs of this project.

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

export function getPackageInfo() {
	const packageJsonPath = getPackageFilePath("../package.json");

	return fs.readJSONSync(packageJsonPath) as PackageJson;
}

function getPackageFilePath(filePath: string) {
	let distPath = fileURLToPath(new URL(`.`, import.meta.url));

	return path.resolve(distPath, filePath);
}
