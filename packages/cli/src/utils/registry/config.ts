import path from "node:path";
import { readFileSync } from "node:fs";
import { z } from "zod";
import { registryConfigSchema } from "../config/schema.js";
import { ConfigError } from "../errors.js";

const configSchema = z.object({
	style: z.string().optional(),
	registry: z.string().optional(),
	registries: registryConfigSchema.optional(),
});

function readConfigFile(cwd: string, filename: string, packageManifest = false) {
	try {
		const json = JSON.parse(readFileSync(path.join(cwd, filename), "utf8").replace(/^\uFEFF/, ""));
		return configSchema.parse(packageManifest ? { registries: json?.registries } : json);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
		throw new ConfigError(`Invalid registry configuration in ${filename}.`);
	}
}

export function getRegistryConfig(cwd: string, project = readConfigFile(cwd, "components.json")) {
	const manifest = readConfigFile(cwd, "package.json", true);
	return {
		style: project.style,
		registry: project.registry,
		registries: { ...manifest.registries, ...project.registries },
	};
}
