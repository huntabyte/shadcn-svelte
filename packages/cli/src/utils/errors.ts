import process from "node:process";
import * as p from "@clack/prompts";

export function handleError(error: unknown) {
	// provide a newline gap
	p.log.message();

	if (typeof error === "string") {
		p.cancel(error);
		process.exit(1);
	}

	if (error instanceof CLIError || error instanceof ConfigError) {
		p.cancel(`[${error.name}]: ${error.message}`);
		process.exit(1);
	}

	// unexpected error
	if (error instanceof Error) {
		p.cancel(error.stack);
		process.exit(1);
	}

	p.cancel("Something went wrong. Please try again.");
	process.exit(1);
}

export function error(msg: string) {
	return new CLIError(msg);
}

export class CLIError extends Error {
	name = "CLI Error";
}

export class ConfigError extends Error {
	name = "Config Error";
}
