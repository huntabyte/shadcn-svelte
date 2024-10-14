import config, { DEFAULT_IGNORES } from "@huntabyte/eslint-config";

const ignores = ["**/extended-types", "**/.velite"];

export default config({ svelte: true, ignores: [...DEFAULT_IGNORES, ...ignores] })
	.override("antfu/typescript/rules", {
		rules: {
			"ts/consistent-type-definitions": "off",
			"unused-imports/no-unused-imports": "off",
			"unused-imports/no-unused-vars": "off",
			"ts/no-unused-expressions": "off",
			"no-unused-expressions": "off",
			"ts/no-empty-object-type": "off",
		},
	})
	.override("antfu/javascript/rules", {
		rules: {
			"no-unused-expressions": "off",
			"unused-imports/no-unused-imports": "off",
		},
	})
	.override("huntabyte/svelte/rules", {
		rules: {
			"svelte/no-at-html-tags": "off",
			"unused-imports/no-unused-imports": "off",
			"unused-imports/no-unused-vars": "off",
			"import/no-self-import": "off",
		},
	});
