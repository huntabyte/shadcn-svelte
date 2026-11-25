import { CLIError } from "../errors.js";

export const RegistryErrorCode = {
	FETCH_ERROR: "FETCH_ERROR",
	UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type RegistryErrorCode = (typeof RegistryErrorCode)[keyof typeof RegistryErrorCode];

export class RegistryError extends CLIError {
	readonly code: RegistryErrorCode;
	readonly statusCode?: number;
	readonly context?: Record<string, unknown>;
	readonly suggestion?: string;
	readonly timestamp = new Date();

	constructor(
		message: string,
		options: {
			code?: RegistryErrorCode;
			statusCode?: number;
			cause?: unknown;
			context?: Record<string, unknown>;
			suggestion?: string;
		} = {}
	) {
		super(message, { cause: options.cause });
		this.name = "RegistryError";
		this.code = options.code ?? RegistryErrorCode.UNKNOWN_ERROR;
		this.statusCode = options.statusCode;
		this.context = options.context;
		this.suggestion = options.suggestion;
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			code: this.code,
			statusCode: this.statusCode,
			context: this.context,
			suggestion: this.suggestion,
			timestamp: this.timestamp,
			stack: this.stack,
		};
	}
}

export class RegistrySourceFileError extends RegistryError {
	readonly filePath: string;

	constructor(
		filePath: string,
		cause?: unknown,
		options: {
			message?: string;
			context?: Record<string, unknown>;
			suggestion?: string;
		} = {}
	) {
		super(options.message ?? `Failed to read registry source file: ${filePath}`, {
			code: RegistryErrorCode.FETCH_ERROR,
			cause,
			context: { filePath, ...options.context },
			suggestion: options.suggestion ?? "Check if the source file exists and is accessible.",
		});
		this.name = "RegistrySourceFileError";
		this.filePath = filePath;
	}
}
