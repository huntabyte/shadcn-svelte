import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
	},
	compilerOptions: {
		warningFilter: (w) => {
			if (w.code === "state_referenced_locally") return false;
			return true;
		},
	},
};

export default config;
