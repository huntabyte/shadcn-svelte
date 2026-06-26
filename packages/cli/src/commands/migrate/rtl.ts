import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import { Command } from "commander";
import color from "picocolors";
import { z } from "zod";
import { error } from "../../utils/errors.js";
import * as cliConfig from "../../utils/config/index.js";
import { cancel, handleError, intro } from "../../utils/prompt-helpers.js";
import * as p from "@clack/prompts";
import { transform, transformRtl } from "../../utils/transformers/index.js";
import { highlight } from "../../utils/colors.js";

const migrateRtlOptionsSchema = z.object({
	cwd: z.string(),
	yes: z.boolean(),
});

type MigrateRtlOptions = z.infer<typeof migrateRtlOptionsSchema>;

const MIGRATABLE_EXTENSIONS = new Set([".svelte"]);

export const rtl = new Command()
	.command("rtl")
	.description("migrate components to RTL-compatible classes")
	.argument("[path]", "path or component name to migrate")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-y, --yes", "skip confirmation prompt", false)
	.action(async (target, opts) => {
		intro();

		try {
			const options = migrateRtlOptionsSchema.parse(opts);
			const cwd = path.resolve(options.cwd);

			if (!existsSync(cwd)) {
				throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
			}

			const config = await cliConfig.getConfig(cwd);
			if (!config) {
				throw error(
					`Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
				);
			}

			await runMigrateRtl(cwd, config, options, target);

			p.outro(`${color.green("Success!")} RTL migration completed.`);
		} catch (e) {
			handleError(e);
		}
	});

export async function runMigrateRtl(
	cwd: string,
	config: cliConfig.ResolvedConfig,
	options: MigrateRtlOptions,
	target?: string
) {
	const targetPath = resolveTargetPath(cwd, config, target);

	if (!existsSync(targetPath)) {
		throw error(`The path ${color.cyan(targetPath)} does not exist. Please try again.`);
	}

	const files = await getSvelteFiles(targetPath);
	if (files.length === 0) {
		p.log.warn(`No Svelte files found at ${color.cyan(path.relative(cwd, targetPath))}.`);
		return;
	}

	if (options.yes === false) {
		const proceed = await p.confirm({
			message: `Ready to migrate ${highlight(path.relative(cwd, targetPath) || ".")} to RTL-compatible classes? ${color.gray("(Make sure you have committed your changes before proceeding!)")}`,
			initialValue: true,
		});

		if (p.isCancel(proceed) || proceed === false) cancel();
	}

	const tasks: p.Task[] = [
		{
			title: `Migrating ${highlight(path.relative(cwd, targetPath) || ".")}`,
			async task() {
				let changed = 0;
				const rtlConfig = { ...config, rtl: true };

				for (const filePath of files) {
					const source = await fs.readFile(filePath, "utf8");
					const result = await transform(
						{ content: source, filePath, config: rtlConfig },
						[transformRtl]
					);

					if (result.content === source) continue;

					await fs.writeFile(filePath, result.content, "utf8");
					changed++;
				}

				return `${changed} ${changed === 1 ? "file" : "files"} migrated`;
			},
		},
	];

	await p.tasks(tasks);
}

function resolveTargetPath(
	cwd: string,
	config: cliConfig.ResolvedConfig,
	target: string | undefined
) {
	if (!target) {
		return config.resolvedPaths.ui;
	}

	const cwdRelative = path.resolve(cwd, target);
	if (existsSync(cwdRelative)) {
		return cwdRelative;
	}

	return path.resolve(config.resolvedPaths.ui, target);
}

async function getSvelteFiles(targetPath: string) {
	const stat = await fs.stat(targetPath);
	if (stat.isFile()) {
		return MIGRATABLE_EXTENSIONS.has(path.extname(targetPath)) ? [targetPath] : [];
	}

	const files: string[] = [];
	await collectSvelteFiles(targetPath, files);
	return files.sort((a, b) => a.localeCompare(b));
}

async function collectSvelteFiles(dir: string, files: string[]) {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.name === "node_modules" || entry.name === ".svelte-kit") continue;

		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await collectSvelteFiles(entryPath, files);
			continue;
		}

		if (entry.isFile() && MIGRATABLE_EXTENSIONS.has(path.extname(entry.name))) {
			files.push(entryPath);
		}
	}
}
