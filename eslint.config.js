import prettier from "eslint-config-prettier";
import path from "node:path";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig(
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
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-undef": "off",
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
