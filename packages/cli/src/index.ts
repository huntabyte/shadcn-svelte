#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";
import * as commands from "./commands/index.js";
import { getCLIPackageInfo } from "./utils/get-package-info.js";

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
	const packageInfo = getCLIPackageInfo();

	const program = new Command()
		.name("shadcn-svelte")
		.description("Add shadcn-svelte components to your project")
		.version(packageInfo.version || "0.0.0", "-v, --version", "display the version number");

	// register commands
	for (const cmd of Object.values(commands)) {
		program.addCommand(cmd);
	}

	program.parse();
}

main();
