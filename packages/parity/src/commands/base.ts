import { Command } from "commander";
import { runParity } from "../compare.ts";
import { handleError } from "../utils/errors.ts";
import { applySharedOptions, toRunOptions } from "../utils/options.ts";

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
