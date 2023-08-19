module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:svelte/prettier",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"]
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},

	globals: { $$Generic: "readable", _: "writable" },
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser"
			},
			rules: {
				"@typescript-eslint/no-unused-vars": [
					"warn",
					{
						argsIgnorePattern: "^_",
						varsIgnorePattern:
							"^\\$\\$(Props|Events|Slots|Generic)$"
					}
				]
			}
		},
		{
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				"@typescript-eslint/ban-types": [
					"error",
					{
						extendDefaults: true,
						types: {
							"{}": false
						}
					}
				]
			}
		}
	]
};
