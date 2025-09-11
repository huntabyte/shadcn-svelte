import path from "node:path";
import process from "node:process";
import { existsSync, promises as fs } from "node:fs";
import color from "picocolors";
import { Command } from "commander";
import { z } from "zod";
import * as p from "@clack/prompts";
import { diffLines, type Change } from "diff";
import * as schemas from "@shadcn-svelte/registry";
import * as registry from "../../utils/registry/index.js";
import { transformContent } from "../../utils/transformers.js";
import * as cliConfig from "../../utils/get-config.js";
import { ConfigError, error, handleError } from "../../utils/errors.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";

const diffOptionsSchema = z.object({
	component: z.string().optional(),
	yes: z.boolean().default(false),
	cwd: z.string(),
	proxy: z.string().optional(),
});
type DiffOptions = z.infer<typeof diffOptionsSchema>;

function componentExists(config: cliConfig.ResolvedConfig, name: string) {
	const uiDir = path.join(config.resolvedPaths.components, "ui");

	// Ex.  src/lib/components/ui/button/…
	if (existsSync(path.join(uiDir, name))) return true;
	if (existsSync(path.join(uiDir, `${name}.svelte`))) return true;

	// Ex.  src/lib/components/button/…
	if (existsSync(path.join(config.resolvedPaths.components, name))) return true;
	if (existsSync(path.join(config.resolvedPaths.components, `${name}.svelte`))) return true;

	return false;
}

export const diff = new Command()
	.name("diff")
	.description("check for updates against the registry")
	.argument("[component]", "the component name")
	.option("-y, --yes", "skip confirmation prompt.", false)
	.option("-c, --cwd <cwd>", "working directory (default: current dir).", process.cwd())
	.option("--proxy <proxy>", "fetch registry through a proxy", getEnvProxy())
	.action(async (name, opts) => {
		try {
			const options: DiffOptions = diffOptionsSchema.parse({ component: name, ...opts });
			if (options.proxy !== undefined) process.env.HTTP_PROXY = options.proxy;

			/* ------------------------------------------------------------------ */
			/* Load local configuration                                           */
			/* ------------------------------------------------------------------ */
			const cwd = path.resolve(options.cwd);
			if (!existsSync(cwd)) throw error(`The path ${color.cyan(cwd)} does not exist.`);

			const config = await cliConfig.getConfig(cwd);
			if (!config)
				throw new ConfigError(
					`Run ${color.green("init")} to create components.json first.`
				);

			/* ------------------------------------------------------------------ */
			/* Fetch registry index                                               */
			/* ------------------------------------------------------------------ */
			const registryUrl = registry.getRegistryUrl(config);
			const registryIndex = await registry.getRegistryIndex(registryUrl);

			/* ------------------------------------------------------------------ */
			/* 1) No component arg  →  scan all installed                         */
			/* ------------------------------------------------------------------ */
			if (!options.component) {
				const installed = registryIndex
					.filter((item) => componentExists(config, item.name))
					.map((item) => item.name);

				if (!installed.length) {
					p.log.info("No installed components found.");
					return;
				}

				const updates = [];
				for (const name of installed) {
					const changes = await diffComponent(name, config, registryUrl, registryIndex);
					if (changes.length) updates.push({ name, changes });
				}

				if (!updates.length) {
					p.log.info("No updates found.");
					return;
				}

				p.log.info("The following components have updates:");
				for (const u of updates) {
					p.log.info(`- ${u.name}`);
					for (const ch of u.changes) p.log.info(`  - ${ch.filePath}`);
				}
				console.log();
				p.log.info(`Run ${color.green("diff <component>")} to see each patch.`);
				return;
			}

			/* ------------------------------------------------------------------ */
			/* 2) Single component diff                                           */
			/* ------------------------------------------------------------------ */
			const componentEntry = registryIndex.find((i) => i.name === options.component);
			if (!componentEntry) {
				p.log.error(`Component ${color.green(options.component)} not found in registry.`);
				return;
			}

			const changes = await diffComponent(
				componentEntry.name,
				config,
				registryUrl,
				registryIndex
			);
			if (!changes.length) {
				p.log.info(`No updates found for ${options.component}.`);
				return;
			}

			for (const ch of changes) {
				p.log.info(`- ${ch.filePath}`);
				printDiff(ch.patch);
			}
		} catch (err) {
			handleError(err);
		}
	});

/* ============================================================================
 * INTERNALS
 * ========================================================================== */
async function diffComponent(
	componentName: string,
	config: cliConfig.ResolvedConfig,
	registryUrl: string,
	registryIndex: schemas.RegistryIndex
) {
	/* Resolve & download the remote item (plus its deps) */
	const resolved = await registry.resolveRegistryItems({
		registryIndex,
		items: [componentName],
	});
	const remoteItems = await registry.fetchRegistryItems({
		baseUrl: registryUrl,
		items: resolved,
	});
	const remote = remoteItems.find((i) => i.name === componentName);
	if (!remote) return [];

	const changes = [];

	for (const file of remote.files ?? []) {
		const filePath = registry.resolveItemFilePath(config, remote, file);

		if (!existsSync(filePath)) continue; // local file missing → ignore

		const localContent = await fs.readFile(filePath, "utf8");
		if (typeof file === "string" || !file.content) continue;

		const filename = file.target;
		const remoteContent = await transformContent(file.content, filename, config);

		const patch = diffLines(remoteContent as string, localContent);
		if (patch.length > 1) changes.push({ filePath, patch });
	}

	return changes;
}

function printDiff(diff: Change[]) {
	diff.forEach((part) => {
		if (!part) return;
		if (part.added) return process.stdout.write(color.green(part.value));
		if (part.removed) return process.stdout.write(color.red(part.value));
		process.stdout.write(part.value);
	});
}
