#!/usr/bin/env node
// Lists installed UI component barrels that no showcase source imports.
// Usage: node showcase-coverage.mjs <ui-dir> <showcase-dir...>
import { readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { basename, extname, join, relative, resolve, sep } from "node:path";

const [uiArg, ...roots] = process.argv.slice(2);

if (!uiArg || roots.length === 0) {
	console.error("Usage: node showcase-coverage.mjs <ui-dir> <showcase-dir...>");
	process.exit(1);
}

const uiDir = realpathSync(resolve(uiArg));
const components = readdirSync(uiDir, { withFileTypes: true })
	.filter(
		(entry) =>
			entry.isDirectory() &&
			readdirSync(join(uiDir, entry.name)).some((file) => /^index\.[cm]?[jt]s$/.test(file))
	)
	.map((entry) => entry.name)
	.sort();

const visited = new Set();
const ignored = new Set(["node_modules", ".git", ".svelte-kit", "dist", "build"]);
const imports = new Set();

function walk(path) {
	const canonical = realpathSync(path);
	const fromUi = relative(uiDir, canonical);
	if (
		fromUi === "" ||
		(!fromUi.startsWith(`..${sep}`) && fromUi !== ".." && !fromUi.startsWith(sep)) ||
		visited.has(canonical)
	) {
		return;
	}
	visited.add(canonical);

	if (statSync(canonical).isDirectory()) {
		for (const entry of readdirSync(canonical)) {
			if (!ignored.has(entry)) walk(join(canonical, entry));
		}
		return;
	}
	if (!/\.(svelte|[cm]?[jt]sx?)$/.test(extname(canonical))) return;

	const source = readFileSync(canonical, "utf8");
	// Match static imports/re-exports and literal dynamic imports, including
	// multiline named imports and Svelte script blocks.
	const pattern =
		/\b(?:import\s+(?:[^;"']*?\s+from\s*)?|export\s+[^;"']*?\s+from\s*|import\s*\(\s*)["']([^"']+)["']/g;
	for (const match of source.matchAll(pattern)) imports.add(match[1]);
}

for (const root of roots) walk(resolve(root));

const missing = components.filter(
	(name) =>
		![...imports].some((specifier) => {
			const parts = specifier.replaceAll("\\", "/").split("/");
			return (
				parts.at(-1) === name ||
				(parts.at(-2) === name &&
					(/^index\.[cm]?[jt]s$/.test(basename(specifier)) || /\.svelte$/.test(specifier)))
			);
		})
);

console.log(`${components.length - missing.length}/${components.length} components imported.`);
if (missing.length > 0) {
	console.log(`Missing: ${missing.join(", ")}`);
	process.exit(1);
}
