// !! BROWSER SAFE !!

export function error(msg: string, cause?: unknown) {
	return new CLIError(msg, { cause });
}

export class CLIError extends Error {
	name = "CLI Error";
}

export class ConfigError extends Error {
	name = "Config Error";
}
