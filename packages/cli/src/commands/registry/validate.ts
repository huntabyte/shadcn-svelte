import pc from "picocolors";
import { Command } from "commander";
import { CLIError } from "../../utils/errors.js";
import { resolveGitHubRegistrySource } from "../../utils/registry/address.js";
import { validateGitHubRegistrySource } from "../../utils/registry/github.js";

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

		const result = await validateGitHubRegistrySource(source);
		if (!result.valid) {
			console.error(pc.red("Registry validation failed."));
			for (const diagnostic of result.diagnostics) {
				console.error(
					`- ${diagnostic.itemName ? `${diagnostic.itemName}: ` : ""}${diagnostic.message}`
				);
				if (diagnostic.suggestion) console.error(`  ${diagnostic.suggestion}`);
			}
			process.exitCode = 1;
			return;
		}

		console.log(pc.green("Registry is valid."));
		console.log(
			`Checked ${result.registryFiles} ${result.registryFiles === 1 ? "registry file" : "registry files"} and ${result.items} ${result.items === 1 ? "item" : "items"}.`
		);
	});
