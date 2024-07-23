import config from "@huntabyte/eslint-config";

export default config({ svelte: true })
	.override("antfu/javascript/rules", {
		rules: {
			"unused-imports/no-unused-vars": [
				"error",
				{
					varsIgnorePattern: "^_",
					argsIgnorePattern: "^_",
					args: "after-used",
				},
			],
			"no-unused-vars": "off",
		},
	})
	.override("antfu/typescript/rules", {
		rules: {
			"unused-imports/no-unused-vars": [
				"error",
				{
					args: "after-used",
					varsIgnorePattern: "^_",
					argsIgnorePattern: "^_",
				},
			],
		},
	});
