import * as fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { parseExpressionAt } from "acorn";
import { Minimatch } from "minimatch";
import { transformDirection } from "../../utils/transformers/transform-rtl.js";

const excluded = new Set([
	"node_modules",
	".git",
	".svelte-kit",
	".generated",
	"dist",
	"build",
	".agents",
	".codex",
]);
const isSource = (file: string) =>
	/\.(svelte|[cm]?[jt]s)$/.test(file) && !/\.d\.[cm]?ts$/.test(file);
export type MigrationEdit = { file: string; before: string; after: string; mode: number };
export type RtlMigrationPlan = {
	cwd: string;
	files: string[];
	edits: MigrationEdit[];
	review: string[];
	skipped: string[];
};

function inside(root: string, file: string) {
	const relative = path.relative(root, file);
	return (
		relative === "" ||
		(!path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`))
	);
}

async function safePath(root: string, file: string) {
	if (!inside(root, file)) throw new Error(`Path is outside the project: ${file}`);
	let current = root;
	for (const segment of path.relative(root, file).split(path.sep).filter(Boolean)) {
		if (excluded.has(segment)) throw new Error(`Excluded directory: ${file}`);
		current = path.join(current, segment);
		const stat = await fs.lstat(current);
		if (stat.isSymbolicLink()) throw new Error(`Refusing symlink: ${current}`);
	}
	if (!inside(root, await fs.realpath(file))) throw new Error(`Path escapes the project: ${file}`);
}

function relativeTarget(cwd: string, root: string, target: string) {
	if (!path.isAbsolute(target)) {
		if (target.split(/[\\/]/).includes(".."))
			throw new Error("Migration paths cannot contain '..'.");
		return target.replaceAll(path.sep, "/");
	}
	for (const base of [cwd, root]) {
		if (inside(base, target)) return path.relative(base, target).replaceAll(path.sep, "/");
	}
	throw new Error(`Path is outside the project: ${target}`);
}

/** Changes only the root rtl value, preserving other configuration text. */
export function enableRtl(text: string) {
	const config: unknown = JSON.parse(text);
	if (!config || typeof config !== "object" || Array.isArray(config))
		throw new Error("components.json must contain an object.");
	if ("rtl" in config && typeof config.rtl !== "boolean")
		throw new Error("components.json rtl must be a boolean.");
	const object = parseExpressionAt(text, text.search(/\S/), { ecmaVersion: "latest" });
	if (object.type !== "ObjectExpression") throw new Error("Invalid components.json.");
	const rtlProperties = object.properties.filter(
		(property) =>
			property.type === "Property" &&
			property.key.type === "Literal" &&
			property.key.value === "rtl"
	);
	if (rtlProperties.length > 1) throw new Error("components.json contains duplicate rtl keys.");
	if ("rtl" in config && config.rtl === true) return text;
	const rtl = rtlProperties[0];
	if (rtl?.type === "Property")
		return text.slice(0, rtl.value.start) + "true" + text.slice(rtl.value.end);
	const last = object.properties.at(-1);
	const end = last?.end ?? object.start + 1;
	if (!text.includes("\n"))
		return text.slice(0, end) + (last ? ", " : "") + '"rtl": true' + text.slice(end);
	const eol = text.includes("\r\n") ? "\r\n" : "\n";
	const indent = text.match(/\n([\t ]+)"/)?.[1] ?? "\t";
	const closeIndent =
		text.slice(text.lastIndexOf("\n", object.end - 1) + 1, object.end - 1).match(/^[\t ]*/)?.[0] ??
		"";
	return (
		text.slice(0, end) +
		(last ? "," : "") +
		eol +
		indent +
		'"rtl": true' +
		eol +
		closeIndent +
		text.slice(object.end - 1)
	);
}

export async function planRtlMigration(options: {
	cwd: string;
	target?: string;
	uiPath?: string;
}): Promise<RtlMigrationPlan> {
	const cwd = await fs.realpath(options.cwd);
	const configFile = path.join(cwd, "components.json");
	await safePath(cwd, configFile);
	const beforeConfig = await fs.readFile(configFile, "utf8");
	const afterConfig = enableRtl(beforeConfig);
	const target = options.target ?? options.uiPath;
	if (target === undefined)
		throw new Error("Could not resolve the UI directory. Provide a path or glob.");
	const relative = relativeTarget(path.resolve(options.cwd), cwd, target);
	const matcher = new Minimatch(relative, { dot: true });
	const files: string[] = [];
	const skipped: string[] = [];
	async function walk(directory: string) {
		for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
			if (excluded.has(entry.name)) continue;
			const file = path.join(directory, entry.name);
			if (entry.isSymbolicLink()) {
				skipped.push(path.relative(cwd, file));
				continue;
			}
			if (entry.isDirectory()) await walk(file);
			else if (entry.isFile() && isSource(file)) files.push(file);
		}
	}
	if (matcher.hasMagic()) {
		await walk(cwd);
		files.splice(
			0,
			files.length,
			...files.filter((file) => matcher.match(path.relative(cwd, file).replaceAll(path.sep, "/")))
		);
	} else {
		const file = path.resolve(cwd, relative);
		await safePath(cwd, file);
		const stat = await fs.lstat(file);
		if (stat.isDirectory()) await walk(file);
		else if (stat.isFile() && isSource(file)) files.push(file);
		else throw new Error(`Unsupported migration target: ${target}`);
	}
	const unique = [...new Set(files)].sort();
	if (!unique.length)
		throw new Error(`No Svelte/JavaScript/TypeScript source files found: ${target}`);
	const edits: MigrationEdit[] = [];
	for (const file of unique) {
		await safePath(cwd, file);
		const before = await fs.readFile(file, "utf8");
		let after: string;
		try {
			after = transformDirection(before, file);
		} catch (cause) {
			throw new Error(`Could not parse ${path.relative(cwd, file)}. No files were changed.`, {
				cause,
			});
		}
		if (before !== after) edits.push({ file, before, after, mode: (await fs.stat(file)).mode });
	}
	if (beforeConfig !== afterConfig)
		edits.push({
			file: configFile,
			before: beforeConfig,
			after: afterConfig,
			mode: (await fs.stat(configFile)).mode,
		});
	return {
		cwd,
		files: unique,
		edits,
		skipped,
		review: unique
			.filter((file) =>
				/(?:^|[\\/])(?:calendar|range-calendar|pagination|sidebar)(?:[\\/.-])/.test(
					path.relative(cwd, file)
				)
			)
			.map((file) => path.relative(cwd, file)),
	};
}

async function stageText(file: string, content: string, mode: number) {
	const temp = `${file}.shadcn-rtl-${randomUUID()}.tmp`;
	// Only clean up a staging file after our exclusive open succeeds.
	const handle = await fs.open(temp, "wx", mode & 0o777);
	try {
		await handle.writeFile(content, "utf8");
		await handle.chmod(mode & 0o777);
		await handle.close();
		return temp;
	} catch (cause) {
		await handle.close().catch(() => {});
		await fs.rm(temp, { force: true }).catch(() => {});
		throw cause;
	}
}

/** Stage all writes and check for concurrent edits before replacing any file. */
export async function applyRtlMigration(
	plan: RtlMigrationPlan,
	operations: Pick<typeof fs, "rename"> = fs
) {
	const staged: { edit: MigrationEdit; temp: string }[] = [];
	const committed: MigrationEdit[] = [];
	try {
		for (const edit of plan.edits) {
			await safePath(plan.cwd, edit.file);
			const temp = await stageText(edit.file, edit.after, edit.mode);
			staged.push({ edit, temp });
		}
		// Check the complete plan before the first replacement, including components.json.
		for (const { edit } of staged) {
			await safePath(plan.cwd, edit.file);
			if ((await fs.readFile(edit.file, "utf8")) !== edit.before)
				throw new Error(`File changed during migration: ${edit.file}`);
		}
		for (const { edit, temp } of staged) {
			await safePath(plan.cwd, edit.file);
			if ((await fs.readFile(edit.file, "utf8")) !== edit.before)
				throw new Error(`File changed during migration: ${edit.file}`);
			await operations.rename(temp, edit.file);
			committed.push(edit);
		}
	} catch (cause) {
		const failed: string[] = [];
		for (const edit of committed.reverse()) {
			let rollback: string | undefined;
			try {
				await safePath(plan.cwd, edit.file);
				if ((await fs.readFile(edit.file, "utf8")) !== edit.after) {
					failed.push(edit.file);
					continue;
				}
				rollback = await stageText(edit.file, edit.before, edit.mode);
				await fs.rename(rollback, edit.file);
			} catch {
				failed.push(edit.file);
			} finally {
				if (rollback) await fs.rm(rollback, { force: true }).catch(() => {});
			}
		}
		throw new Error(
			failed.length
				? `Migration failed; review files that could not be restored: ${failed.join(", ")}`
				: "Migration aborted. Previous replacements were restored.",
			{ cause }
		);
	} finally {
		await Promise.all(staged.map(({ temp }) => fs.rm(temp, { force: true }).catch(() => {})));
	}
}
