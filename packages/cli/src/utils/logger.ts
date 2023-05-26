// Credit to @shadcn for the original code. It has been slightly modified to fit the needs of this project.

import chalk from "chalk";

export const logger = {
	error(...args: unknown[]) {
		console.log(chalk.red(...args));
	},
	warn(...args: unknown[]) {
		console.log(chalk.yellow(...args));
	},
	info(...args: unknown[]) {
		console.log(chalk.cyan(...args));
	},
	success(...args: unknown[]) {
		console.log(chalk.green(...args));
	}
};
