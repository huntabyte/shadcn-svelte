import { defineConfig } from "oxfmt";

export default defineConfig({
	useTabs: true,
	singleQuote: false,
	trailingComma: "es5",
	printWidth: 100,
	sortTailwindcss: {
		stylesheet: "./docs/src/app.css",
		functions: ["cn", "clsx", "tv"],
	},
	// Adrian's opinionated import sorting. It's not perfect, but it's a decent starting point.
	sortImports: {
		internalPattern: ["$lib/"],
		newlinesBetween: false,
		order: "asc",
		customGroups: [
			{
				groupName: "sveltekit-env",
				elementNamePattern: ["$env/**/*"],
			},
			{
				groupName: "sveltekit-app",
				elementNamePattern: ["$app/**/*"],
			},
			{
				groupName: "wildcard-$lib-code",
				elementNamePattern: ["$lib/**/*.svelte", "$lib/**/*.js"],
				modifiers: ["wildcard"],
			},
			{
				groupName: "named-$lib-code",
				elementNamePattern: ["$lib/**/*.svelte", "$lib/**/*.js"],
				modifiers: ["named"],
			},
			{
				groupName: "$lib-code",
				elementNamePattern: ["$lib/**/*.svelte", "$lib/**/*.js"],
			},
		],
		groups: [
			// SvelteKit-specific virtual modules
			"sveltekit-env",
			"sveltekit-app",
			// Node.js modules
			"wildcard-builtin",
			"builtin",
			"named-builtin",
			// Third-party modules
			"wildcard-external",
			"external",
			"named-external",
			// Modules from this project
			"wildcard-internal",
			"internal",
			"named-internal",
			// Library code
			"wildcard-$lib-code",
			"$lib-code",
			"named-$lib-code",
			// Relative imports
			"wildcard-index",
			"index",
			"named-index",
			"wildcard-sibling",
			"sibling",
			"named-sibling",
			"wildcard-parent",
			"parent",
			"named-parent",
			// All types
			"type",
			// Miscellaneous
			"unknown",
		],
	},
	sortPackageJson: false,
	ignorePatterns: [
		"pnpm-lock.yaml",
		"/static/",
		"/.agents/",
		"/.cursor/",
		"/.changeset/",
		// "CHANGELOG.md",
		// "registry-template",

		// // docs site specific
		// "docs/other/themes/dark.json",
		// "docs/other/themes/light.json",
		// "docs/static",
		// "docs/.velite",
		// "docs/src/__registry__",
		// "packages/cli/test/fixtures",
		// "playgrounds",
		// "registry-template/static",
		// "docs/src/routes/og/*-otf.json",
		// "**/__*__/**/*",
	],
	svelte: true,
	overrides: [
		{
			files: ["*.md"],
			options: {
				tabWidth: 2,
				useTabs: false,
				printWidth: 79,
			},
		},
		{
			files: [".github/**/*"],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
});
