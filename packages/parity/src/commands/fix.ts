import { Command } from "commander";
import { runParity } from "../compare.js";
import { handleError } from "../utils/errors.js";
import { applySharedOptions, toRunOptions } from "../utils/options.js";

export const fix = applySharedOptions(
	new Command()
		.command("fix")
		.description("Patch base UI source to match radix base")
		.argument("<item>", "component to patch")
		.option("--dry-run", "print patches without writing files", false)
).action(async (item: string, opts) => {
	try {
		await runParity(toRunOptions("fix", item, opts));
	} catch (e) {
		handleError(e);
	}
});
