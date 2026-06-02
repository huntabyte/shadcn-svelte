import { Command } from "commander";
import pc from "picocolors";
import { resolveGitHubRegistrySource } from "../../utils/registry/address.js";
import {
	fetchGitHubRegistryCatalog,
	fetchGitHubRegistryItem,
} from "../../utils/registry/github.js";
import { CLIError } from "../../utils/errors.js";

export const validate = new Command()
	.name("validate")
	.description("validate a shadcn-svelte registry")
	.argument("[registry]", "GitHub registry source to validate, e.g. owner/repo or owner/repo#ref")
	.action(async (registry?: string) => {
		if (!registry) {
			throw new CLIError(
				"A GitHub registry source is required. Expected owner/repo or owner/repo#ref."
			);
		}

		const source = resolveGitHubRegistrySource(registry);
		if (!source) {
			throw new CLIError(
				`Invalid GitHub registry source '${registry}'. Expected owner/repo or owner/repo#ref.`
			);
		}

		const catalog = await fetchGitHubRegistryCatalog(source);
		const diagnostics: string[] = [];

		for (const item of catalog.items) {
			try {
				await fetchGitHubRegistryItem({ scheme: "github", ...source, item: item.name });
			} catch (e) {
				diagnostics.push(
					`${item.name}: ${e instanceof Error ? e.message : "Unknown validation error."}`
				);
			}
		}

		if (diagnostics.length) {
			console.error(pc.red("Registry validation failed."));
			for (const diagnostic of diagnostics) console.error(`- ${diagnostic}`);
			process.exitCode = 1;
			return;
		}

		console.log(pc.green("Registry is valid."));
		console.log(
			`Checked 1 registry file and ${catalog.items.length} ${catalog.items.length === 1 ? "item" : "items"}.`
		);
	});
