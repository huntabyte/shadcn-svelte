import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteDirPath = join(__dirname, ".velite");

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		fs: {
			allow: [veliteDirPath],
		},
	},
});
