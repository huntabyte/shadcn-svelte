import fs from "node:fs";
import path from "node:path";
import ignore, { type Ignore } from "ignore";
import { type TsConfigResult, getTsconfig } from "get-tsconfig";
import { detect } from "package-manager-detector";
import { AGENTS, type Agent } from "package-manager-detector";
import * as p from "./prompts.js";
import { cancel } from "./prompt-helpers.js";

const STYLESHEETS = [
	"app.css",
	"app.pcss",
	"app.postcss",
	"main.css",
	"main.pcss",
	"main.postcss",
	"globals.css",
	"globals.pcss",
	"globals.postcss",
];
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

export type DetectLanguageResult = {
	config: TsConfigResult;
	type: "jsconfig.json" | "tsconfig.json";
};

export function detectLanguage(cwd: string): DetectLanguageResult | undefined {
	const rootPath = path.resolve(cwd, "package.json");
	const tsConfig = getTsconfig(rootPath, "tsconfig.json");
	if (tsConfig !== null) return { type: "tsconfig.json", config: tsConfig };

	const jsConfig = getTsconfig(rootPath, "jsconfig.json");
	if (jsConfig !== null) return { type: "jsconfig.json", config: jsConfig };
}

type Options = Array<{ value: Agent | undefined; label: Agent | "None" }>;
export async function detectPM(cwd: string, prompt: boolean): Promise<Agent | undefined> {
	const detectResult = await detect({ cwd });

	let agent: Agent | undefined;
	if (detectResult != null) {
		agent = detectResult.agent;
	} else if (detectResult == null && prompt) {
		// prompt for package manager
		const options: Options = AGENTS.filter((agent) => !agent.includes("@")).map((pm) => ({
			value: pm,
			label: pm,
		}));
		options.unshift({ label: "None", value: undefined });

		const res = await p.select({
			message: "Which package manager do you want to use?",
			options,
		});
		if (p.isCancel(res)) cancel();

		agent = res;
	}

	return agent;
}
