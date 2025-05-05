import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "chalk";
import { Command } from "commander";
import * as v from "valibot";
import { ConfigError, error, handleError } from "../../utils/errors.js";
import * as cliConfig from "../../utils/get-config.js";
import { cancel, intro } from "../../utils/prompt-helpers.js";
import * as p from "../../utils/prompts.js";
import { registrySchema } from "@shadcn-svelte/registry";

const highlight = (...args: unknown[]) => color.bold.cyan(...args);

const buildOptionsSchema = v.object({
	registry: v.string(),
	cwd: v.string(),
	output: v.string(),
});

type BuildOptions = v.InferOutput<typeof buildOptionsSchema>;

export const build = new Command()
	.command("build")
	.description("build components for a shadcn registry")
	.argument("[registry]", "path to registry.json file", "./registry.json")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-o, --output", "destination directory for json files", "./static/r")
	.action(async (registryPath, opts) => {
		try {
			intro();
			const options = v.parse(buildOptionsSchema, { registry: registryPath, ...opts });

			// resolve paths
			const cwd = path.resolve(options.cwd);
			const output = path.resolve(options.cwd, options.output);
			const registry = path.resolve(options.cwd, options.registry);

			// validate options
			for (const [option, path] of Object.entries({ cwd, registry })) {
				if (!existsSync(path)) {
					throw error(`The '${option}' path ${color.cyan(path)} does not exist.`);
				}
			}

			const config = await cliConfig.getConfig(cwd);
			if (!config) {
				throw new ConfigError(
					`Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
				);
			}

			await runBuild({ cwd, output, registry });

			p.outro(`${color.green("Success!")} Registry build completed.`);
		} catch (error) {
			handleError(error);
		}
	});

async function runBuild(options: BuildOptions) {
	const registryData = await fs.readFile(options.registry, "utf8");
	const registry = v.parse(registrySchema, registryData);

	// write to output
	if (!existsSync(options.output)) {
		await fs.mkdir(options.output, { recursive: true });
	}
}
