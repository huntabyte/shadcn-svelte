import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "chalk";
import { Command } from "commander";
import * as v from "valibot";
import * as schema from "@shadcn-svelte/registry";
import { ConfigError, error, handleError } from "../../utils/errors.js";
import { intro } from "../../utils/prompt-helpers.js";
import * as p from "../../utils/prompts.js";
import * as cliConfig from "../../utils/get-config.js";
import { getFileDependencies, resolveProjectDeps } from "./deps-resolver.js";
import { getRegistryIndex, getRegistryUrl } from "../../utils/registry/index.js";

// TODO: perhaps a `--mini` flag to remove spacing?
const SPACER = "\t";

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
	.option("-o, --output <path>", "destination directory for json files", "./static/r")
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
					`Configuration file is missing. Please run ${color.green("init")} to create a ${color.bold.cyan("components.json")} file.`
				);
			}

			await runBuild({ cwd, output, registry, config });

			p.outro(`${color.green("Success!")} Registry build completed.`);
		} catch (error) {
			handleError(error);
		}
	});

async function runBuild(options: BuildOptions & { config: cliConfig.Config }) {
	const spinner = p.spinner();

	spinner.start(`Parsing registry schema`);
	const registryJson = await fs.readFile(options.registry, "utf8");
	const registry = v.parse(schema.registrySchema, JSON.parse(registryJson));
	spinner.stop(
		`Parsed registry schema at ${color.dim(path.relative(options.cwd, options.registry))}`
	);

	const registryIndex: schema.RegistryIndex = registry.items.map((item) => {
		return { ...item, relativeUrl: `${item.name}.json` };
	});

	// write to output
	if (!existsSync(options.output)) {
		await fs.mkdir(options.output, { recursive: true });
	}

	const tasks: p.Task[] = [];
	const ogRegistryIndex = await getRegistryIndex(getRegistryUrl(options.config));

	// Write registry index: `registry/index.json`
	tasks.push({
		title: "Building registry index",
		async task() {
			const indexPath = path.resolve(options.output, "index.json");
			const parsedIndex = v.parse(schema.registryIndexSchema, registryIndex);

			await fs.writeFile(indexPath, JSON.stringify(parsedIndex, null, SPACER), "utf8");

			const relative = path.relative(options.cwd, indexPath);
			return `Registry index written to ${color.dim(relative)}`;
		},
	});

	// Write registry items: `registry/[item].json`
	tasks.push({
		title: "Building registry items",
		async task(message) {
			const projectDeps = await resolveProjectDeps(options.config);

			for (const item of registry.items) {
				message(`Building item ${color.cyan(item.name)}`);
				const singleFile = item.files.length === 1;

				const toResolve = item.files.map(async (file) => {
					const content = await fs.readFile(file.path, "utf8");
					const name = path.basename(file.path);
					const target = singleFile ? name : `${item.name}/${name}`;

					return { content, type: file.type, name, target };
				});
				const files = await Promise.all(toResolve);

				const dependencies = new Set(item.dependencies);
				const devDependencies = new Set(item.devDependencies);
				const registryDependencies = new Set();

				for (const file of files) {
					const fileDeps = await getFileDependencies({
						...projectDeps,
						filename: file.name,
						source: file.content,
						config: options.config,
						registryDependencies: item.registryDependencies,
						output: options.output,
						registryIndex: ogRegistryIndex,
						registry,
					});

					fileDeps.dependencies?.forEach((dep) => dependencies.add(dep));
					fileDeps.devDependencies?.forEach((dep) => devDependencies.add(dep));
					fileDeps.registryDependencies?.forEach((dep) => registryDependencies.add(dep));
				}

				const resolved = {
					...item,
					registryDependencies: toArray(registryDependencies),
					dependencies: toArray(dependencies),
					devDependencies: toArray(devDependencies),
					files,
				};

				const parsedItem = v.parse(schema.registryItemSchema, resolved);
				parsedItem["$schema"] ??= "https://shadcn-svelte.com/schema/registry-item.json";

				const outputPath = path.resolve(options.output, `${item.name}.json`);

				await fs.writeFile(outputPath, JSON.stringify(parsedItem, null, SPACER), "utf8");
			}

			const relative = path.relative(options.cwd, options.output);
			return `Registry items written to ${color.dim(relative)}`;
		},
	});

	await p.tasks(tasks);
}

/** Converts a `Set` into an array if its size is greater than 0. Otherwise, `undefined` is returned. */
function toArray<T>(set: Set<T>): Array<T> | undefined {
	if (set.size > 0) {
		return Array.from(set);
	}
	return undefined;
}
