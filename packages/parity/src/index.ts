#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";
import * as commands from "./commands/index.ts";
import { getPackageInfo } from "./utils/get-package-info.ts";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

// This CLI runs straight from TypeScript source via Node's built-in type
// stripping, which is enabled by default since Node 22.18 / 23.6.
const MINIMUM_VERSION: [number, number] = [22, 18];

const version = process.versions.node;
const [major = 0, minor = 0] = version.split(".").map((part) => Number.parseInt(part));

if (major < MINIMUM_VERSION[0] || (major === MINIMUM_VERSION[0] && minor < MINIMUM_VERSION[1])) {
	console.error(`Node.js v${version} is out of date and unsupported!`);
	console.error(`Please use Node.js v${MINIMUM_VERSION.join(".")} or higher.`);
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
