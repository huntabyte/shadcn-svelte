import { defineConfig } from "tsdown";

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/schema/index.ts",
		"src/icons/index.ts",
		"src/preset/index.ts",
		"src/utils/css.ts",
		"src/utils/transformers/index.ts",
		"src/utils/transformers/transform-icons.ts",
		"src/utils/transformers/transform-imports.ts",
		"src/utils/transformers/transform-menu.ts",
		"src/utils/transformers/transform-strip-types.ts",
	],
	target: "es2022",
	dts: true,
});
