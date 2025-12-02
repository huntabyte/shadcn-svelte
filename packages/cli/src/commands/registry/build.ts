import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "picocolors";
import { z } from "zod/v4";
import { Command } from "commander";
import * as schema from "@shadcn-svelte/registry";
import * as p from "@clack/prompts";
import { intro } from "../../utils/prompt-helpers.js";
import { error, handleError } from "../../utils/errors.js";
import { parseDependency, toArray } from "../../utils/utils.js";
import { ALIAS_DEFAULTS, ALIASES, SITE_BASE_URL } from "../../constants.js";
import { getFileDependencies, resolveProjectDeps } from "./deps-resolver.js";

// TODO: perhaps a `--mini` flag to remove spacing?
const SPACER = "\t";

const buildOptionsSchema = z.object({
	registry: z.string(),
	cwd: z.string(),
	output: z.string(),
});

type BuildOptions = z.infer<typeof buildOptionsSchema>;

export const build = new Command()
	.command("build")
	.description("build components for a shadcn-svelte registry")
	.argument("[registry]", "path to registry.json file", "./registry.json")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-o, --output <path>", "destination directory for json files", "./static/r")
	.action(async (registryPath, opts) => {
		try {
			intro();
			const options = buildOptionsSchema.parse({ registry: registryPath, ...opts });

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

			await runBuild({ cwd, output, registry });

			p.outro(`${color.green("Success!")} Registry build completed.`);
		} catch (e) {
			handleError(e);
		}
	});

async function runBuild(options: BuildOptions) {
	const spinner = p.spinner();

	spinner.start(`Parsing registry schema`);
	const registryJson = await fs.readFile(options.registry, "utf8");
	const registry = schema.registrySchema.parse(JSON.parse(registryJson));
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

	// Write registry index: `registry/index.json`
	tasks.push({
		title: "Building registry index",
		async task() {
			const indexPath = path.resolve(options.output, "index.json");
			const parsedIndex = schema.registryIndexSchema.parse(registryIndex);

			await fs.writeFile(indexPath, JSON.stringify(parsedIndex, null, SPACER), "utf8");

			const relative = path.relative(options.cwd, indexPath);
			return `Registry index written to ${color.dim(relative)}`;
		},
	});

	// Write registry items: `registry/[item].json`
	tasks.push({
		title: "Building registry items",
		async task(message) {
			const projectDeps = resolveProjectDeps(options.cwd);

			// apply overrides
			if (registry.overrideDependencies) {
				type Dependencies = (typeof projectDeps)["dependencies"];
				const overrideDep = (override: string, deps: Dependencies) => {
					const { name } = parseDependency(override);
					const versioned = deps.versions[name];
					if (versioned) {
						const peers = deps.deps[versioned];
						delete deps.deps[versioned];

						deps.versions[name] = override;
						deps.deps[override] = peers ?? [];
					}
				};
				for (const override of registry.overrideDependencies) {
					overrideDep(override, projectDeps.dependencies);
					overrideDep(override, projectDeps.devDependencies);
				}
			}

			for (const item of registry.items) {
				message(`Building item ${color.cyan(item.name)}`);
				const singleFile = item.files.length === 1;
				const nested: schema.RegistryItemFileType[] = [
					"registry:page",
					"registry:ui",
					"registry:file",
				];
				const toResolve = item.files.map(async (file) => {
					let content = await fs.readFile(file.path, "utf8");
					content = transformAliases((registry.aliases ??= {}), content);

					const name = path.basename(file.path);

					let target;
					if (singleFile) target = name;
					else if (nested.includes(file.type)) target = `${item.name}/${name}`;
					else target = name;

					return { content, name, target, ...file };
				});
				const files = await Promise.all(toResolve);

				const dependencies = new Set(item.dependencies);
				const devDependencies = new Set(item.devDependencies);

				const registryDependencies = new Set(item.registryDependencies.map(transformLocal));

				const predefinedDeps = dependencies.size > 0 && devDependencies.size > 0;
				if (!predefinedDeps) {
					for (const file of files) {
						const fileDeps = await getFileDependencies({
							...projectDeps,
							filename: file.name,
							source: file.content,
						});

						// don't add detected deps if they're already predefined
						if (!item.dependencies)
							fileDeps.dependencies?.forEach((dep) => {
								// type def packages should be inserted into dev deps
								if (dep.startsWith("@types/")) devDependencies.add(dep);
								else dependencies.add(dep);
							});
						if (!item.devDependencies)
							fileDeps.devDependencies?.forEach((dep) => devDependencies.add(dep));
					}
				}

				const parsedItem = schema.registryItemSchema.parse(
					{
						...item,
						$schema: `${SITE_BASE_URL}/schema/registry-item.json`,
						registryDependencies: toArray(registryDependencies),
						dependencies: toArray(dependencies),
						devDependencies: toArray(devDependencies),
						files,
					},
					// maintains the schema defined property order
					{ jitless: true }
				);

				const outputPath = path.resolve(options.output, `${item.name}.json`);

				await fs.writeFile(outputPath, JSON.stringify(parsedItem, null, SPACER), "utf8");
			}

			const relative = path.relative(options.cwd, options.output);
			return `Registry items written to ${color.dim(relative)}`;
		},
	});

	await p.tasks(tasks);
}

/**
 * Transforms registryDependencies that start with `local:` into a path
 * relative to the current registry-item's json file.
 *
 * ```
 * "local:stepper"
 *```
 * transforms into:
 * ```
 * "./stepper.json"
 * ```
 */
export function transformLocal(registryDep: string) {
	if (registryDep.startsWith("local:")) {
		const LOCAL_REGEX = /^local:(.*)/;
		return registryDep.replace(LOCAL_REGEX, "./$1.json");
	}
	return registryDep;
}

/**
 * Transforms registry import aliases into a standardized format.
 *
 * ```
 * import Button from "$lib/registry/ui/button/index.js"
 * ```
 * transforms into:
 * ```
 * import Button from "$UI$/button/index.js"
 * ```
 */
export function transformAliases(
	aliases: NonNullable<schema.Registry["aliases"]>,
	content: string
) {
	for (const alias of ALIASES) {
		const defaults = ALIAS_DEFAULTS[alias];
		const path = (aliases[alias] ??= defaults.defaultPath);
		content = content.replaceAll(path, defaults.placeholder);
	}

	return content;
}
