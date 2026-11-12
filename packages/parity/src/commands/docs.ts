import path from "node:path";
import { Command } from "commander";
import { runDocsParity } from "../docs.ts";
import { handleError } from "../utils/errors.ts";

export const docs = new Command()
	.command("docs")
	.description("Compare docs UI class contracts to upstream shadcn/ui")
	.argument("[surface]", "docs surface to compare")
	.option("-c, --check", "exit 1 if any docs UI contract differs", false)
	.option("--docs <path>", "path to the docs app")
	.option("--upstream <path>", "path to a local shadcn/ui checkout")
	.option("--refresh", "ignore cached upstream files and fetch them again", false)
	.option("--verbose", "print differing class tokens", false)
	.action(async (surface: string | undefined, opts) => {
		try {
			await runDocsParity({
				surface,
				root: opts.docs ? path.resolve(opts.docs) : undefined,
				upstream: opts.upstream ? path.resolve(opts.upstream) : undefined,
				check: opts.check,
				refresh: opts.refresh,
				verbose: opts.verbose,
			});
		} catch (error) {
			handleError(error);
		}
	});
