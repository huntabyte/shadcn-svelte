import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";

const browserConditionPlugin: Plugin = {
	name: "vitest-browser-condition",
	config() {
		return { resolve: { conditions: ["browser"] } };
	},
};

export default defineConfig({
	plugins: [browserConditionPlugin, svelte()],
	test: {
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
