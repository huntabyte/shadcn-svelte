import path from "node:path";
import process from "node:process";
import { lstat } from "node:fs/promises";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { planRtlMigration, applyRtlMigration } from "./rtl.js";
import { loadConfig, resolveTSConfig } from "../../utils/config/index.js";
import { intro, handleError } from "../../utils/prompt-helpers.js";
import { resolveImportAlias } from "../../utils/resolve-imports.js";

export const migrate = new Command("migrate").description("migrate copied components");
migrate.addCommand(
	new Command("rtl")
		.description("migrate copied Svelte components to RTL")
		.argument("[path]", "file, directory, or quoted glob (defaults to configured UI directory)")
		.option("-c, --cwd <path>", "the working directory", process.cwd())
		.option("-y, --yes", "skip confirmation prompt", false)
		.option("--dry-run", "preview the plan without changing files", false)
		.action(
			async (
				target: string | undefined,
				options: { cwd: string; yes: boolean; dryRun: boolean }
			) => {
				intro();
				try {
					const cwd = path.resolve(options.cwd);
					let uiPath: string | undefined;
					if (target === undefined) {
						if ((await lstat(path.join(cwd, "components.json"))).isSymbolicLink())
							throw new Error("Refusing symlink: components.json");
						const config = loadConfig(cwd);
						if (!config)
							throw new Error("components.json is missing. Initialize the project first.");
						const tsconfig = resolveTSConfig(cwd, config);
						uiPath = resolveImportAlias({ cwd, importPath: config.aliases.ui, tsconfig });
					}
					const plan = await planRtlMigration({ cwd, target, uiPath });
					p.log.info(
						`${options.dryRun ? "Would update" : "Planned updates:"} ${plan.edits.length} file(s).`
					);
					for (const edit of plan.edits) p.log.message(`  ${path.relative(plan.cwd, edit.file)}`);
					if (plan.skipped.length) p.log.warn(`Skipped symlinks: ${plan.skipped.join(", ")}`);
					if (plan.review.length)
						p.log.warn(
							`Review copied Calendar, Pagination and Sidebar behavior after migration:\n${plan.review.join("\n")}\nhttps://shadcn-svelte.com/docs/rtl#manual-migration-optional`
						);
					if (options.dryRun || !plan.edits.length) {
						p.outro(options.dryRun ? "Dry run complete. No files changed." : "No changes needed.");
						return;
					}
					if (!options.yes) {
						if (!process.stdin.isTTY)
							throw new Error(
								"Use --dry-run to preview, or --yes to migrate without an interactive prompt."
							);
						const confirmation = await p.confirm({
							message: "Apply this RTL migration?",
							initialValue: false,
						});
						if (p.isCancel(confirmation) || !confirmation) {
							p.outro("Migration cancelled. No files changed.");
							return;
						}
					}
					await applyRtlMigration(plan);
					p.outro("RTL migration complete. Review the changes before committing.");
				} catch (cause) {
					handleError(cause);
				}
			}
		)
);
