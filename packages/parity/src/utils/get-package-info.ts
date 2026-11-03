import fs from "node:fs";
import path from "node:path";

type PackageJson = { name?: string; version?: string };

export function getPackageInfo(): PackageJson {
	const packageJsonPath = path.resolve(import.meta.dirname, "../../package.json");
	return JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
}
