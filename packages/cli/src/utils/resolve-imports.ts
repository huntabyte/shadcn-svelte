import type { ConfigLoaderSuccessResult } from "tsconfig-paths";
import { createMatchPath } from "tsconfig-paths";

export async function resolveImport(
	importPath: string,
	config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) {
	const matchPath = createMatchPath(config.absoluteBaseUrl, config.paths);
	return matchPath(importPath, undefined, () => true, [".ts", ".svelte", ".js"]);
}
