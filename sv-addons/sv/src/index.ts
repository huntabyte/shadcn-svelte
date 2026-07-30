import { execFileSync } from "node:child_process";
import { defineAddon, defineAddonOptions } from "sv";
import { color, resolveCommandArray, type AgentName, fileExists } from "./sv-utils.js";

const options = defineAddonOptions().build();

export default defineAddon({
	id: "@shadcn-svelte",
	shortDescription: "shadcn-svelte UI components",
	homepage: "https://shadcn-svelte.com",
	options,

	setup: ({ dependsOn }) => {
		dependsOn("tailwindcss");
	},

	run: async ({ sv, cwd, packageManager }) => {
		const isSvelteKitInstalled = fileExists(cwd, "node_modules/@sveltejs/kit");
		if (!isSvelteKitInstalled) {
			installDependencies(cwd, packageManager);
		}

		const isSvelteKitSynced = fileExists(cwd, ".svelte-kit");
		if (!isSvelteKitSynced) {
			syncSvelteKit(cwd, packageManager);
		}

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
function installDependencies(cwd: string, packageManager: AgentName) {
	const [command, ...args] = resolveCommandArray(packageManager, "install", []);
	execFileSync(command, args, { cwd, stdio: "pipe" });
}

function syncSvelteKit(cwd: string, packageManager: AgentName) {
	const [command, ...args] = resolveCommandArray(packageManager, "execute-local", [
		"svelte-kit",
		"sync",
	]);
	execFileSync(command, args, { cwd, stdio: "pipe" });
}
