import config from "@antfu/eslint-config";
import pluginAntfu from "eslint-plugin-antfu";

export default config(
	{
		typescript: true,
		svelte: true,
		stylistic: false,
		componentExts: ["svelte"],
		jsonc: false,
		ignores: ["**/.svelte-kit", "**/dist", "**/build", "**/static", "**/*.md"],
	},
	{
		name: "antfu:eslint-plugin",
		files: ["**/*.ts", "**/*.js", "**/*.svelte"],
		plugins: {
			antfu: pluginAntfu,
		},
		rules: {
			"antfu/top-level-function": "error",
		},
	}
)
	.override("antfu:javascript", {
		rules: {
			"no-unused-vars": [
				"error",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"no-console": [
				"error",
				{
					allow: ["info", "clear", "error", "warn"],
				},
			],
		},
	})
	.override("antfu:svelte:rules", {
		rules: {
			"no-unused-vars": "off",
			"unused-imports/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_|\\$\\$(Props|Events|Slots|Generic)$",
				},
			],
			"ts/no-unused-vars": [
				"error",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_|\\$\\$(Props|Events|Slots|Generic)$",
				},
			],
			"no-undef-init": "off",
			"unused-imports/no-unused-imports": [
				"error",
				{ varsIgnorePattern: "^FormPath|FormPathLeaves" },
			],
			"prefer-const": "off",
		},
	})
	.override("antfu:unicorn", {
		rules: {
			"unicorn/prefer-dom-node-text-content": "off",
		},
	})
	.override("antfu:typescript:rules", {
		rules: {
			"ts/consistent-type-definitions": ["error", "type"],
		},
	});
