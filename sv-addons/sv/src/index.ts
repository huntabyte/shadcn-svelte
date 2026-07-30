import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { defineAddon, defineAddonOptions } from "sv";
import { color, resolveCommandArray, type AgentName } from "./sv-utils.js";

const options = defineAddonOptions().build();

export default defineAddon({
	id: "shadcn-svelte",
	shortDescription: "shadcn-svelte UI components",
	homepage: "https://shadcn-svelte.com",
	options,

	setup: ({ dependsOn }) => {
		dependsOn("tailwindcss");
	},

	run: async ({ sv, file, cwd, packageManager }) => {
		// ensureDependenciesInstalled(cwd, packageManager);
		// ensureStylesheet(cwd, file.stylesheet);

		// Interactive CLI: init first, then add components.
		await sv.execute(["shadcn-svelte@latest", "init"], "inherit");
		await sv.execute(["shadcn-svelte@latest", "add"], "inherit");
	},

	nextSteps: ({ packageManager }) => {
		return [
			`Add more components with ${color.command(`${packageManager} shadcn-svelte@latest add <component>`)}`,
			`Docs: ${color.website("https://shadcn-svelte.com/docs")}`,
		];
	},
});

/**
 * `shadcn-svelte init` runs `svelte-kit sync`, which requires installed dependencies.
 * During `sv create --add`, install happens after addons, so we install first.
 */
function ensureDependenciesInstalled(cwd: string, packageManager: AgentName) {
	const [command, ...args] = resolveCommandArray(packageManager, "install", []);
	execFileSync(command, args, { cwd, stdio: "inherit" });
}

/**
 * Prefer the workspace stylesheet (usually created by the official tailwindcss add-on).
 * Ensure one exists so interactive `init` can default to a real path.
 */
function ensureStylesheet(cwd: string, preferred: string) {
	const absolute = path.resolve(cwd, preferred);
	if (fs.existsSync(absolute)) return;

	const fallbacks = ["src/routes/layout.css", "src/app.css", "src/app.pcss"];
	for (const candidate of fallbacks) {
		if (fs.existsSync(path.resolve(cwd, candidate))) return;
	}

	fs.mkdirSync(path.dirname(absolute), { recursive: true });
	fs.writeFileSync(absolute, '@import "tailwindcss";\n');
}
