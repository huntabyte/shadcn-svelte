import { fileURLToPath } from "url";
import { getConfig, getRawConfig } from "../../src/utils/get-config";

export function toPosixPath(p: string) {
	return p.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
}
export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// gets the raw config from a fixture directory
export async function getRaw(fixtureDir: string) {
	const resolvedPath = resolvePath(`../fixtures/${fixtureDir}`);
	console.log("RESOLVED PATH", resolvedPath);
	return await getRawConfig(resolvePath(`../fixtures/${fixtureDir}`));
}
// gets the config from a fixture directory
export async function getConf(fixtureDir: string) {
	return await getConfig(resolvePath(`../fixtures/${fixtureDir}`));
}
