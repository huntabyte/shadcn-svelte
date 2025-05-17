import color from "chalk";
import { Command } from "commander";
import { handleError } from "../utils/errors.js";
import { intro } from "../utils/prompt-helpers.js";

const highlight = (...args: unknown[]) => color.bold.cyan(...args);

export const add = new Command()
	.command("add", { hidden: true })
	.description("add components to your project")
	.action(() => {
		intro();
		handleError(
			`The ${highlight("add")} command is no longer available in this version of the CLI.\n\nUse ${highlight("npx shadcn-svelte@latest add")} instead to access this command.`
		);
	});
