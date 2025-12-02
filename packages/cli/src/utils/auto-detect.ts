import fs from "node:fs";
import path from "node:path";
import * as p from "@clack/prompts";
import * as find from "empathic/find";
import ignore, { type Ignore } from "ignore";
import { AGENTS, detect, getUserAgent, type Agent, type AgentName } from "package-manager-detector";
import { cancel } from "./prompt-helpers.js";

const STYLESHEETS = ["app.css", "main.css", "globals.css", "global.css", "layout.css"];

// commonly ignored
const IGNORE = ["node_modules", ".git", ".svelte-kit"];

/**
 * Returns the auto-detected filepaths for the global css file and the typescript config.
 */
export function detectConfigs(cwd: string, config?: { relative: boolean }) {
	let cssPath: string | undefined;
	const paths = findFiles(cwd);
	for (const filepath of paths) {
		const filename = path.basename(filepath);
		if (STYLESHEETS.includes(filename)) {
			cssPath = config?.relative ? path.relative(cwd, filepath) : filepath;
			break;
		}
	}

	const tsconfigPath = findTSConfig(cwd);
	const resolvedTsconfigPath =
		tsconfigPath && config?.relative ? path.relative(cwd, tsconfigPath) : tsconfigPath;

	return {
		cssPath,
		tsconfigPath: resolvedTsconfigPath,
	};
}

/**
 * Walks down the directory tree, returning file paths that are _not_ ignored from their respective `.gitignore`'s
 */
function findFiles(dirPath: string) {
	return walkDir(dirPath, []);
}

function walkDir(dirPath: string, ignores: { dirPath: string; ig: Ignore }[]): string[] {
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
		if (file.isDirectory()) paths.push(...walkDir(filepath, ignores));
	}

	return paths;
}

/**
 * Returns the absolute path to the nearest typescript config file.
 */
function findTSConfig(cwd: string): string | undefined {
	for (const type of ["tsconfig.json", "jsconfig.json"] as const) {
		const path = find.up(type, { cwd });
		if (path) return path;
	}
}

const AGENT_NAMES = AGENTS.filter((agent) => !agent.includes("@")) as AgentName[];
type Options = Array<{ value: Agent | undefined; label: Agent | "None" }>;
export async function detectPM(cwd: string, prompt: boolean): Promise<Agent | undefined> {
	const agent = (await detect({ cwd }))?.agent;

	// prompt for package manager
	if (!agent && prompt) {
		const options: Options = AGENT_NAMES.map((pm) => ({ value: pm, label: pm }));
		options.unshift({ label: "None", value: undefined });

		const userAgent = getUserAgent() ?? undefined; // replaces `null` for `undefined`
		const pm = await p.select({
			options,
			initialValue: userAgent,
			message: "Which package manager do you want to use?",
		});
		if (p.isCancel(pm)) {
			cancel();
		}

		return pm;
	}

	return agent;
}
