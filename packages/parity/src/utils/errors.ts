import process from "node:process";
import color from "picocolors";

export function error(msg: string, cause?: unknown) {
	return new CLIError(msg, { cause });
}

export class CLIError extends Error {
	name = "CLI Error";
}

export function handleError(err: unknown): never {
	if (err instanceof CLIError) {
		console.error(color.red(err.message));
		process.exit(1);
	}

	if (err instanceof Error) {
		console.error(color.red(err.stack ?? err.message));
		process.exit(1);
	}

	console.error(color.red("Something went wrong. Please try again."));
	process.exit(1);
}
