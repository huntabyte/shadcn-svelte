import path from "node:path";

export function resolveImport(
	importPath: string,
	config: { paths: Record<string, string[]>; absoluteBaseUrl: string }
) {
	for (let [alias, paths] of Object.entries(config.paths)) {
		alias = stripGlob(alias);
		const aliasPath: string | undefined = paths[0] && stripGlob(paths[0]);
		if (!importPath.startsWith(alias) || aliasPath === undefined) continue;

		const relativePath = importPath.replace(alias, aliasPath);
		const resolvedPath = path.resolve(config.absoluteBaseUrl, ...relativePath.split("/"));
		return resolvedPath;
	}
}

function stripGlob(alias: string): string {
	if (alias.endsWith("/*")) return alias.slice(0, -2);
	return alias;
}
