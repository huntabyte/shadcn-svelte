import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import { minimatch } from "minimatch";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { build } from "./scripts/build-registry.js";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		{
			name: "registry-builder",
			enforce: "pre",
			async watchChange(id) {
				if (!minimatch(id, "**/lib/registry/**")) return;
				this.info("Registry file updated. Rebuilding registry...");
				buildRegistry();
				this.info("Registry built.");
			},
			async buildStart() {
				this.info("Building registry...");
				buildRegistry();
				this.info("Registry built.");
			},
		},
	],
});

async function buildRegistry() {
	await build();
	execSync("pnpm shadcn-svelte registry build --output static/registry");
}
