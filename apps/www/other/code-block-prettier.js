export const codeBlockPrettierConfig = {
	useTabs: false,
	tabWidth: 2,
	singleQuote: false,
	trailingComma: "none",
	printWidth: 80,
	endOfLine: "lf",
	pluginSearchDirs: ["node_modules/prettier-plugin-svelte"],
	parser: "svelte",
	svelteIndexScriptAndStyle: true,
	svelteStrictMode: false,
	svelteSortOrder: "scripts-markup-styles-options",
	plugins: ["prettier-plugin-svelte"],
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
				svelteIndentScriptAndStyle: true,
				svelteStrictMode: false,
				svelteSortOrder: "scripts-markup-styles-options"
			}
		}
	],
	bracketSameLine: false,
	importOrder: [
		"<TYPES>",
		"<TYPES>^[.]",
		"<BUILTIN_MODULES>",
		"<THIRD_PARTY_MODULES>",
		"^\\$app",
		"^\\$env",
		"^\\$service-worker",
		"^\\$lib/server",
		"^\\$(?![^\\/]*\\/)",
		"^\\$[^/]*\\/[^/]+",
		"^[./]",
		"\\.js$",
		"\\.svelte$"
	],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
	importOrderBuiltinModulesToTop: true,
	importOrderParserPlugins: ["typescript", "svelte"],
	importOrderMergeDuplicateImports: true
};
