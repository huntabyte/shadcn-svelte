import { Command } from "commander";
import { rtl } from "./rtl.js";

export const migrate = new Command()
	.command("migrate")
	.description("migrate your project")
	.addCommand(rtl);
