import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		"sv-utils": "src/sv-utils.ts",
	},
	format: "esm",
	deps: { neverBundle: ["sv"] },
	copy: ["template"],
});
