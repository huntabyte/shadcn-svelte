import path from "node:path";
import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			$lib: path.resolve(dirname, "src/lib"),
		},
		conditions: ["development", "browser"],
	},
	test: {
		include: ["src/**/*.browser.test.{ts,tsx}"],
		setupFiles: ["./vitest.browser.setup.ts"],
		browser: {
			enabled: true,
			provider: "playwright",
			headless: true,
			instances: [{ browser: "chromium" }],
		},
	},
	optimizeDeps: {
		include: ["svelte", "esm-env"],
	},
});
