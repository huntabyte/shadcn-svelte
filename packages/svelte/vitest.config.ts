import path from "node:path";
import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { configDefaults, defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			$lib: path.resolve(dirname, "src/lib"),
		},
		conditions: ["browser"],
	},
	test: {
		environment: "jsdom",
		exclude: [
			...configDefaults.exclude,
			"**/node_modules/**",
			"**/*.browser.test.*",
			"**/.svelte-kit/**",
		],
		testTimeout: 8000,
	},
});
