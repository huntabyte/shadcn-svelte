import path from "node:path";

type PathAliases = { paths: Record<string, string[]>; pathsBasePath: string };
export function resolveImport(importPath: string, config: PathAliases) {
	for (let [alias, paths] of Object.entries(config.paths)) {
		alias = stripGlob(alias);
		const aliasPath = paths[0] && stripGlob(paths[0]);
		if (!importPath.startsWith(alias) || aliasPath === undefined) continue;

		const relativePath = importPath.replace(alias, aliasPath);
		const resolvedPath = path.resolve(config.pathsBasePath, ...relativePath.split("/"));
		return resolvedPath;
	}
}

function stripGlob(alias: string): string {
	if (alias.endsWith("/*")) return alias.slice(0, -2);
	return alias;
}
