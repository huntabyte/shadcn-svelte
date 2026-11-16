import { Command } from "commander";
import { addRegistry } from "./add.js";
import { build } from "./build.js";
import { validate } from "./validate.js";

export const registry = new Command()
	.command("registry")
	.addCommand(addRegistry)
	.addCommand(build)
	.addCommand(validate);
