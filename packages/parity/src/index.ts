#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";
import * as commands from "./commands/index.js";
import { getPackageInfo } from "./utils/get-package-info.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const MINIMUM_MAJOR = 20;

const version = process.versions.node;
const major = Number.parseInt(version.split(".").at(0)!);

if (major < MINIMUM_MAJOR) {
	console.error(`Node.js v${version} is out of date and unsupported!`);
	console.error(`Please use Node.js v${MINIMUM_MAJOR} or higher.`);
	process.exit(1);
}

async function main() {
	const packageInfo = getPackageInfo();

	const program = new Command()
		.name("parity")
		.description("Compare shadcn-svelte registry classes against upstream shadcn/ui")
		.version(packageInfo.version || "0.0.0", "-v, --version", "display the version number")
		.showHelpAfterError()
		.showSuggestionAfterError()
		.addHelpText(
			"after",
			`
Examples:
  $ parity
  $ parity empty
  $ parity --check
  $ parity --ignored
  $ parity --ignored command
  $ parity variants --style mira
  $ parity variants mira/empty
  $ parity fix empty
  $ parity fix empty --dry-run
`
		);

	for (const cmd of Object.values(commands)) {
		program.addCommand(cmd, cmd.name() === "base" ? { isDefault: true } : undefined);
	}

	program.parse();
}

main();
