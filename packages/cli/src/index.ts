#!/usr/bin/env node
// Credit to @shadcn for the original code. It has been slightly modified to fit the needs of this project.
import { Command } from "commander";
import { add, init, update } from "./commands";
import { getPackageInfo } from "./utils/get-package-info";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
	const packageInfo = getPackageInfo();

	const program = new Command()
		.name("shadcn-svelte")
		.description("Add shadcn-svelte components to your project")
		.version(
			packageInfo.version || "1.0.0",
			"-v, --version",
			"display the version number"
		);

	program.addCommand(init).addCommand(add).addCommand(update);

	program.parse();
}

main();
