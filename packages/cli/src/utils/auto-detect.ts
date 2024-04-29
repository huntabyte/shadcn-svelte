import fs from "node:fs";
import path from "node:path";
import ignore, { type Ignore } from "ignore";

const STYLESHEETS = ["app.css", "app.pcss", "app.postcss", "main.css", "main.pcss", "main.postcss"];
const TAILWIND_CONFIGS = [
	"tailwind.config.js",
	"tailwind.config.cjs",
	"tailwind.config.mjs",
	"tailwind.config.ts",
];

// commonly ignored
const IGNORE = ["node_modules", ".git", ".svelte-kit"];

export function detectConfigs(cwd: string, config?: { relative: boolean }) {
	let tailwindPath, cssPath;
	const paths = findFiles(cwd);
	for (const filepath of paths) {
		const filename = path.parse(filepath).base;
		if (cssPath === undefined && STYLESHEETS.includes(filename)) {
			cssPath = config?.relative ? path.relative(cwd, filepath) : filepath;
		}
		if (tailwindPath === undefined && TAILWIND_CONFIGS.includes(filename)) {
			tailwindPath = config?.relative ? path.relative(cwd, filepath) : filepath;
		}
	}
	return { tailwindPath, cssPath };
}

/**
 * Walks down the directory tree, returning file paths that are _not_ ignored from their respective `.gitignore`'s
 */
function findFiles(dirPath: string) {
	return find(dirPath, []);
}

function find(dirPath: string, ignores: { dirPath: string; ig: Ignore }[]): string[] {
	const paths: string[] = [];
	const files = fs.readdirSync(dirPath, { withFileTypes: true });
	const ignorePath = path.join(dirPath, ".gitignore");
	if (fs.existsSync(ignorePath)) {
		const gitignore = fs.readFileSync(ignorePath, { encoding: "utf8" });
		const ig = ignore().add(gitignore);
		ignores.push({ dirPath, ig });
	}

	for (const file of files) {
		const filepath = path.join(dirPath, file.name);
		// ignore any of the common suspects
		if (IGNORE.some((name) => dirPath.includes(name))) continue;

		// check if file is ignored
		const ignored = ignores.some((parent) => {
			// make the path relative to the parent
			const relative = path.relative(parent.dirPath, filepath);
			if (ignore.isPathValid(relative) === false) return false;

			return parent.ig.ignores(relative);
		});
		if (ignored) continue;

		if (file.isFile()) paths.push(filepath);
		if (file.isDirectory()) paths.push(...find(filepath, ignores));
	}

	return paths;
}
