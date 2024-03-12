import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { enhancedImages } from "@sveltejs/enhanced-img";

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
