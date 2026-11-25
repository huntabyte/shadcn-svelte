import path from "node:path";
import { existsSync } from "node:fs";
import { config } from "@dotenvx/dotenvx";
import { error } from "./errors.js";

/** Load project credentials without changing the environment of another project. */
export function loadEnvFiles(cwd: string) {
	const env: Record<string, string> = {};
	for (const [key, value] of Object.entries(process.env)) {
		if (value !== undefined) env[key] = value;
	}
	for (const file of [".env.local", ".env.development.local", ".env.development", ".env"]) {
		const filePath = path.join(cwd, file);
		if (!existsSync(filePath)) continue;

		const result = config({ path: filePath, overload: false, quiet: true, processEnv: env });
		if (result.error) throw error(`Failed to load environment variables from ${file}.`);
	}
	return env;
}
