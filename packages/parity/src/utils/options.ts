import path from "node:path";
import { existsSync } from "node:fs";
import color from "picocolors";
import { Command, Option } from "commander";
import { z } from "zod";
import { error } from "./errors.js";
import { parseItemArg, type ParityRunOptions } from "../compare.js";

export const sharedOptionsSchema = z.object({
	check: z.boolean().default(false),
	verbose: z.boolean().default(false),
	ignored: z.boolean().default(false),
	includeSkipped: z.boolean().default(false),
	docs: z.string().optional(),
	excludeRuntimeEquivalent: z.boolean().default(true),
});

export function applySharedOptions(cmd: Command) {
	return cmd
		.option("-c, --check", "exit 1 if remaining class diffs > 0", false)
		.option("--verbose", "include equivalent, ignored, framework, and allowlist pairs", false)
		.option("--ignored", "show ignored pairs with comments, reasons, and class diffs", false)
		.option("--include-skipped", "include calendar, range-calendar, chart, and select", false)
		.option("--docs <path>", "path to the docs app")
		.addOption(
			new Option(
				"--no-exclude-runtime-equivalent",
				"report Bits vs Radix runtime-equivalent token diffs"
			)
		);
}

export function resolveItem(raw: string | undefined, styleOpt?: string) {
	const parsed = parseItemArg(raw);
	if (styleOpt && parsed.style && styleOpt !== parsed.style) {
		throw error(`Conflicting styles: --style ${styleOpt} vs ${color.cyan(raw ?? "")}`);
	}
	return { item: parsed.item, style: styleOpt ?? parsed.style };
}

export function toRunOptions(
	command: ParityRunOptions["command"],
	itemArg: string | undefined,
	opts: z.input<typeof sharedOptionsSchema> & { style?: string; dryRun?: boolean }
): ParityRunOptions {
	const options = sharedOptionsSchema.parse(opts);
	const parsed = resolveItem(itemArg, opts.style);

	if (options.docs) {
		const docsPath = path.resolve(options.docs);
		if (!existsSync(docsPath)) {
			throw error(`The path ${color.cyan(docsPath)} does not exist. Please try again.`);
		}
		options.docs = docsPath;
	}

	return {
		command,
		item: parsed.item,
		style: parsed.style,
		check: options.check,
		verbose: options.verbose,
		ignored: options.ignored,
		includeSkipped: options.includeSkipped,
		dryRun: Boolean(opts.dryRun),
		excludeRuntimeEquivalent: options.excludeRuntimeEquivalent,
		root: options.docs,
	};
}
