import { fileURLToPath } from "node:url";
import { getConfig } from "../../src/utils/get-config";

export function toPosixPath(p: string) {
	return p.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
}
export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// gets the config from a fixture directory
export async function getConf(fixtureDir: string) {
	return await getConfig(resolvePath(`../fixtures/${fixtureDir}`));
}
