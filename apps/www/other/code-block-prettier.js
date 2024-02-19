//@ts-check

/** @type {import('prettier').Config} */
export const codeBlockPrettierConfig = {
	useTabs: false,
	tabWidth: 2,
	singleQuote: false,
	trailingComma: "none",
	printWidth: 80,
	endOfLine: "lf",
	pluginSearchDirs: ["node_modules/prettier-plugin-svelte"],
	parser: "svelte",
	plugins: ["prettier-plugin-svelte"],
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
	bracketSameLine: false,
};
