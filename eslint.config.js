import path from "node:path";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";
import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
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
			// Icon packages must be imported per-icon. Their root barrels re-export
			// thousands of components, which makes Vite dev (SSR) take tens of seconds.
			"@typescript-eslint/no-restricted-imports": [
				"error",
				{
					paths: [
						{
							name: "@lucide/svelte",
							message: "Import icons individually, e.g. `@lucide/svelte/icons/<icon-name>`.",
						},
						{
							name: "@tabler/icons-svelte",
							message: "Import icons individually, e.g. `@tabler/icons-svelte/icons/<icon-name>`.",
						},
						{
							name: "phosphor-svelte",
							message: "Import icons individually, e.g. `phosphor-svelte/lib/<IconName>`.",
						},
						{
							name: "remixicon-svelte",
							message: "Import icons individually, e.g. `remixicon-svelte/icons/<icon-name>`.",
						},
						// `@hugeicons/free-core-icons` is intentionally left out of this check as they
						// do not provide proper types for their deep imports.
					].map((entry) => ({ ...entry, allowTypeImports: true })),
				},
			],
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
			"dist/",
			"**/.svelte-kit/**/*",
			"playgrounds/**/*",
			"packages/cli/dist/**/*",
			"**/.test-output/**/*",
			"**/demo/**/*",
			"sv-addons/registry/template",
		],
	}
);
