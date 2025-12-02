import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			parserOptions: {
				// Only uncomment this if you want it to take 3 minutes https://github.com/sveltejs/eslint-plugin-svelte/issues/1084
				// projectService: true,
				extraFileExtensions: [".svelte"],
				parser: ts.parser,
			},
		},
		rules: {
			"svelte/no-useless-mustaches": "warn",
			"svelte/no-navigation-without-resolve": "off",
		},
	},
	{
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-unused-expressions": "off",
		},
	},
	{
		ignores: [
			"build/",
			".svelte-kit/",
			"dist/",
			".svelte-kit/**/*",
			"docs/.svelte-kit/**/*",
			".svelte-kit",
			"playgrounds/**/*",
			"packages/cli/dist/**/*",
			"registry-template/**/*",
		],
	}
);
