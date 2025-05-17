import color from "chalk";
import { Command } from "commander";
import { handleError } from "../utils/errors.js";
import { intro } from "../utils/prompt-helpers.js";

const highlight = (msg: string) => color.bold.cyan(msg);

export const update = new Command()
	.command("update", { hidden: true })
	.description("update components to your project")
	.action(() => {
		intro();
		handleError(
			`The ${highlight("update")} command is no longer available in this version of the CLI.\n\nUse ${highlight("npx shadcn-svelte@latest update")} instead to access this command.`
		);
	});
