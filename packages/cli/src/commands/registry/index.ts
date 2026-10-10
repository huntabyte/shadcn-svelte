import { Command } from "commander";
import { build } from "./build.js";
import { validate } from "./validate.js";

export const registry = new Command().command("registry").addCommand(build).addCommand(validate);
