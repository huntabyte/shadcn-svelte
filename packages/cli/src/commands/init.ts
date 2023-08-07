import { existsSync, promises as fs } from "fs";
import path from "path";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";
import { getPackageManager } from "../utils/get-package-manager";
import { logger } from "../utils/logger";
import { addAliases } from "../utils/set-config";
import { STYLES, TAILWIND_CONFIG, UTILS } from "../utils/templates";

const PROJECT_DEPENDENCIES = [
	"tailwindcss-animate",
	"class-variance-authority",
	"clsx",
	"tailwind-merge",
	"lucide-svelte"
];

export const init = new Command()
	.command("init")
	.description("Configure your SvelteKit project.")
	.option("-y, --yes", "Skip confirmation prompt.")
	.action(async (options) => {
		const packageManager = getPackageManager();

		logger.warn(
			"IMPORTANT: Svelte v4 is not supported yet by some of our dependencies (lucide-svelte & radix-svelte). Please use Svelte v3 for now. We expect this issue to be resolved very soon. Apologies for the inconvenience."
		);
		logger.warn(
			"This command assumes a SvelteKit project with TypeScript and Tailwind CSS."
		);
		logger.warn(
			"If you don't have these, follow the manual steps at https://shadcn-svelte.com/docs/installation."
		);
		logger.warn("");

		if (!options.yes) {
			const { proceed } = await prompts({
				type: "confirm",
				name: "proceed",
				message:
					"Running this command will install dependencies and overwrite your existing tailwind.config.[cjs|js] & svelte.config.js. Proceed?",
				initial: true
			});

			if (!proceed) {
				process.exitCode = 0;
				return;
			}
		}

		// Install dependencies.
		const dependenciesSpinner = ora(`Installing dependencies...`).start();
		await execa(packageManager, [
			packageManager === "npm" ? "install" : "add",
			...PROJECT_DEPENDENCIES
		]);
		dependenciesSpinner.succeed();

		// Update styles
		let stylesDestination = "./src/app.postcss";

		const stylesSpinner = ora(
			`Adding styles with CSS variables...`
		).start();
		await fs.writeFile(stylesDestination, STYLES, "utf8");
		stylesSpinner.succeed();

		// Ensure lib directory exists.
		const libDir = "./src/lib";
		if (!existsSync(path.resolve(libDir))) {
			await fs.mkdir(path.resolve(libDir), { recursive: true });
		}

		// Create lib/utils.ts
		const utilsDestination = "./src/lib/utils.ts";

		const utilsSpinner = ora(`Adding utils...`).start();
		await fs.writeFile(utilsDestination, UTILS, "utf8");
		utilsSpinner.succeed();

		// Update tailwind.config.js
		const tailwindDestination = "./tailwind.config.js";
		const tailwindSpinner = ora(`Updating tailwind.config.js...`).start();
		await fs.writeFile(tailwindDestination, TAILWIND_CONFIG, "utf8");
		// Delete tailwind.config.cjs if present
		await fs.unlink("./tailwind.config.cjs").catch((e) => e); // throws when it DNE
		tailwindSpinner.succeed();

		// Update svelte.config.js
		const svelteConfigSpinner = ora(`Updating svelte.config.js...`).start();

		await addAliases();
		svelteConfigSpinner.succeed();
	});
