import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	entry: ["src/index.ts"],
	format: ["esm"],
	target: "es2022",
	outDir: "dist",
});
