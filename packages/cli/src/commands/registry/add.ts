import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { Command } from "commander";
import {
	registryConfigItemSchema,
	registryConfigSchema,
	type RegistryConfig,
} from "../../utils/config/schema.js";
import { error } from "../../utils/errors.js";
import { handleError } from "../../utils/prompt-helpers.js";

export const addRegistry = new Command("add")
	.description("configure registry namespaces with explicit URL templates")
	.argument("<registries...>", "registry mappings in @namespace=URL format")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-f, --force", "replace existing mappings")
	.action(async (mappings: string[], { cwd, force }) => {
		try {
			const additions: RegistryConfig = {};
			for (const mapping of mappings) {
				const separator = mapping.indexOf("=");
				const namespace = mapping.slice(0, separator);
				if (separator < 0 || !/^@[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/.test(namespace)) {
					throw error("Provide each registry as @namespace=https://example.com/r/{name}.json.");
				}
				additions[namespace] = registryConfigItemSchema.parse(mapping.slice(separator + 1));
			}

			let configPath = path.resolve(cwd, "components.json");
			let raw: string;
			try {
				raw = await readFile(configPath, "utf8");
			} catch (err) {
				if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
				configPath = path.resolve(cwd, "package.json");
				raw = await readFile(configPath, "utf8");
			}

			const manifest: unknown = JSON.parse(raw.replace(/^\uFEFF/, ""));
			if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
				throw error(`Expected a configuration object in ${path.basename(configPath)}.`);
			}
			const existing = registryConfigSchema.parse(
				"registries" in manifest ? (manifest.registries ?? {}) : {}
			);
			for (const [name, url] of Object.entries(additions)) {
				if (existing[name] && existing[name] !== url && !force) {
					throw error(`Registry '${name}' is already configured. Pass --force to replace it.`);
				}
			}
			await writeFile(
				configPath,
				JSON.stringify(
					{ ...manifest, registries: { ...existing, ...additions } },
					null,
					raw.match(/\n([\t ]+)"/)?.[1] ?? "\t"
				) + "\n"
			);
			console.log(
				`Configured ${Object.keys(additions).join(", ")} in ${path.basename(configPath)}.`
			);
		} catch (err) {
			handleError(err);
		}
	});
