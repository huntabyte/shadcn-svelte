import { Command } from "commander";
import { build } from "./build.js";

export const registry = new Command().command("registry").addCommand(build);
