import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolve the template directory.
 * - Published / built: `dist/template` (sibling of `dist/index.mjs`)
 * - Source / vitest: package-root `template/`
 */
function resolveTemplateRoot(): string {
	const here = path.dirname(fileURLToPath(import.meta.url));
	const candidates = [
		path.join(here, "template"), // dist/index.mjs -> dist/template
		path.join(here, "..", "template"), // src/*.ts -> template
		path.join(here, "..", "..", "template"), // src/utils/*.ts -> template
	];

	for (const root of candidates) {
		if (fs.existsSync(root)) return root;
	}

	throw new Error(`Template directory not found near ${here}`);
}

/**
 * Recursively collect files under `dir` as forward-slash paths relative to `dir`.
 */
function collectFiles(dir: string): string[] {
	const files = fs
		.readdirSync(dir, { recursive: true, withFileTypes: true })
		.filter((e) => e.isFile())
		.map((e) => path.relative(dir, path.join(e.parentPath, e.name)).split(path.sep).join("/"));
	return files;
}

let cachedRoot: string;
function templateRoot(): string {
	cachedRoot ??= resolveTemplateRoot();
	return cachedRoot;
}

/** Sorted template paths relative to the template root. */
export function listTemplatePaths(): string[] {
	const root = templateRoot();
	return collectFiles(root).sort();
}

/** Read a template file by its relative path key (e.g. `src/lib/utils.ts`). */
export function readTemplateFile(templatePath: string): string {
	const root = templateRoot();
	const absolute = path.join(root, ...templatePath.split("/"));
	return fs.readFileSync(absolute, "utf8");
}

/** Map a template path into the destination project, rewriting `$lib` / routes roots. */
export function resolveProjectPath(
	templatePath: string,
	directory: { lib: string; kitRoutes: string; src: string }
): string {
	if (templatePath === "registry.json") return "registry.json";
	if (templatePath === "src/app.css") return templatePath; // stylesheet handled separately
	if (templatePath.startsWith("src/lib/")) {
		return `${directory.lib}/${templatePath.slice("src/lib/".length)}`;
	}
	if (templatePath.startsWith("src/routes/")) {
		return `${directory.kitRoutes}/${templatePath.slice("src/routes/".length)}`;
	}

	throw new Error(`Unknown template path: ${templatePath}`);
}
