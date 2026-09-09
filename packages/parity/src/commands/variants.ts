import { Command } from "commander";
import { PRESET_STYLES } from "shadcn-svelte/preset";
import { runParity } from "../compare.js";
import { handleError } from "../utils/errors.js";
import { applySharedOptions, toRunOptions } from "../utils/options.js";

export const variants = applySharedOptions(
	new Command()
		.command("variants")
		.description("Compare generated style registries after cn-* inlining")
		.argument("[item]", "component to compare; style/item selects a single variant")
		.option("-s, --style <style>", `generated style (${PRESET_STYLES.join(", ")})`)
).action(async (item: string | undefined, opts) => {
	try {
		await runParity(toRunOptions("variants", item, opts));
	} catch (e) {
		handleError(e);
	}
});
