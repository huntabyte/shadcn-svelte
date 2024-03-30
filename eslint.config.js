import config from "@antfu/eslint-config";

export default config({
	typescript: true,
	svelte: true,
	stylistic: false,
	componentExts: ["svelte"],
	jsonc: false,
	ignores: ["**/.svelte-kit", "**/dist", "**/build", "**/static", "**/*.md"],
})
	.override("antfu:javascript", {
		rules: {
			"no-unused-vars": [
				"error",
				{
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
			"no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_|\\$\\$(Props|Events|Slots|Generic)$",
				},
			],
			"unused-imports/no-unused-vars": [
				"error",
				{
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
	});
