import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "chalk";
import { Command } from "commander";
import * as v from "valibot";
import * as schema from "@shadcn-svelte/registry";
import * as p from "@clack/prompts";
import { intro } from "../../utils/prompt-helpers.js";
import { parseDependency, toArray } from "../../utils/utils.js";
import { error, handleError } from "../../utils/errors.js";
import { getFileDependencies, resolveProjectDeps } from "./deps-resolver.js";
import { SITE_BASE_URL } from "../../constants.js";
import { ALIAS_PLACEHOLDERS, ALIASES } from "../../utils/transformers.js";

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

			await runBuild({ cwd, output, registry });

			p.outro(`${color.green("Success!")} Registry build completed.`);
		} catch (error) {
			handleError(error);
		}
	});

async function runBuild(options: BuildOptions) {
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

			const transformAliases = (content: string) => {
				registry.aliases ??= {};
				for (const alias of ALIASES) {
					registry.aliases[alias] ??= `$lib/registry/${alias}`;
					const placeholder = ALIAS_PLACEHOLDERS[alias];
					content = content.replaceAll(registry.aliases[alias], placeholder);
				}

				return content;
			};

			for (const item of registry.items) {
				message(`Building item ${color.cyan(item.name)}`);
				const singleFile = item.files.length === 1;

				const toResolve = item.files.map(async (file) => {
					let content = await fs.readFile(file.path, "utf8");
					content = transformAliases(content);

					const name = path.basename(file.path);
					const target = singleFile ? name : `${item.name}/${name}`;

					return { content, type: file.type, name, target };
				});
				const files = await Promise.all(toResolve);

				const dependencies = new Set(item.dependencies);
				const devDependencies = new Set(item.devDependencies);
				const registryDependencies = new Set(item.registryDependencies);

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

				const resolved = {
					...item,
					$schema: `${SITE_BASE_URL}/schema/registry-item.json`,
					registryDependencies: toArray(registryDependencies),
					dependencies: toArray(dependencies),
					devDependencies: toArray(devDependencies),
					files,
				};

				const parsedItem = v.parse(schema.registryItemSchema, resolved);

				const outputPath = path.resolve(options.output, `${item.name}.json`);

				await fs.writeFile(outputPath, JSON.stringify(parsedItem, null, SPACER), "utf8");
			}

			const relative = path.relative(options.cwd, options.output);
			return `Registry items written to ${color.dim(relative)}`;
		},
	});

	await p.tasks(tasks);
}
