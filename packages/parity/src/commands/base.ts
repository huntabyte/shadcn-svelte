import { Command } from "commander";
import { runParity } from "../compare.js";
import { handleError } from "../utils/errors.js";
import { applySharedOptions, toRunOptions } from "../utils/options.js";

export const base = applySharedOptions(
	new Command()
		.command("base")
		.description("Compare UI source (cn-* before injection) to radix base")
		.argument("[item]", "component to compare")
).action(async (item: string | undefined, opts) => {
	try {
		await runParity(toRunOptions("base", item, opts));
	} catch (e) {
		handleError(e);
	}
});
