import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type PackageJson = { name?: string; version?: string };

export function getPackageInfo(): PackageJson {
	const distPath = fileURLToPath(new URL(".", import.meta.url));
	const packageJsonPath = path.resolve(distPath, "../package.json");
	return JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
}
