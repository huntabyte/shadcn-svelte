#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";
import { add, init, update } from "./commands";
import { getPackageInfo } from "./utils/get-package-info.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const currentVersion = process.versions.node;
const currentMajorVersion = Number.parseInt(currentVersion.split(".")[0]!, 10);
const minimumMajorVersion = 18;

if (currentMajorVersion < minimumMajorVersion) {
	console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
	console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
	process.exit(1);
}

async function main() {
	console.clear();

	const packageInfo = getPackageInfo();

	const program = new Command()
		.name("shadcn-svelte")
		.description("Add shadcn-svelte components to your project")
		.version(packageInfo.version || "0.0.0", "-v, --version", "display the version number");

	program.addCommand(init).addCommand(add).addCommand(update);

	program.parse();
}

main();
