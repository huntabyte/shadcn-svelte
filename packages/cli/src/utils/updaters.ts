import { Declaration, Rule, AtRule, Root } from "postcss";
import type { CssVars } from "./registry/schema.js";
import { OperationStatus } from "./types.js";

export function updateCssVars(
	ast: Root,
	cssVars: CssVars,
	overwrite: boolean = true
): OperationStatus {
	const status: OperationStatus = { updated: [], skipped: [], added: [] };

	// updates colors for `dark` and `light`
	if (cssVars.light || cssVars.dark) {
		ast.walkRules((rule) => {
			if (!rule.selectors.includes(":root") && !rule.selectors.includes(".dark")) return;

			let remainingDark, remainingLight;
			if (cssVars.light && rule.selectors.includes(":root")) {
				remainingLight = updateCssRule(rule, cssVars.light, overwrite);
				status.updated.push(":root");
			}
			if (cssVars.dark && rule.selectors.includes(".dark")) {
				remainingDark = updateCssRule(rule, cssVars.dark, overwrite);
				status.updated.push(".dark");
			}

			// appends the remaining
			for (const [prop, value] of Object.entries(remainingLight ?? remainingDark ?? {})) {
				const decl = new Declaration({ prop: `--${prop}`, value });
				rule.append(decl);
				status.added.push(`--${prop}`);
			}
		});
	}

	// updates `@theme`
	if (cssVars.theme) {
		ast.walkAtRules((atRule) => {
			if (atRule.name !== "theme") return;

			// updates existing css vars
			const remainingVars = updateCssRule(atRule, cssVars.theme!, overwrite);
			status.updated.push("@theme");

			// appends the remaining
			for (const [prop, value] of Object.entries(remainingVars)) {
				const decl = new Declaration({ prop: `--${prop}`, value });
				atRule.append(decl);
				status.added.push(`--${prop}`);
			}
		});
	}

	// handle skipped selectors
	if (cssVars.light && !status.updated.includes(":root")) status.skipped.push(":root");
	if (cssVars.dark && !status.updated.includes(".dark")) status.skipped.push(".dark");
	if (cssVars.theme && !status.updated.includes("@theme")) status.skipped.push("@theme");

	return status;
}

export function updateTailwindPlugins(ast: Root, plugins: string[]): OperationStatus {
	const status: OperationStatus = { updated: [], skipped: [], added: [] };
	const foundPlugins: string[] = [];

	/**
	 * we track the last import and plugin to know where to insert the new ones
	 *
	 * this goes like this:
	 * - if there are existing plugins, we insert after the last plugin
	 * - if there are no existing plugins and an import exists, we insert after the last import
	 * - if there are no existing plugins and no import exists, we prepend the new plugins
	 */
	let lastImport: AtRule | undefined;
	let lastPlugin: AtRule | undefined;

	ast.walkAtRules((atRule: AtRule) => {
		if (atRule.name === "import") {
			lastImport = atRule;
		}
		if (atRule.name !== "plugin") return;
		const pluginName = atRule.params.trim();
		lastPlugin = atRule;
		if (plugins.includes(pluginName.replace(/['"]/g, ""))) {
			foundPlugins.push(pluginName.replace(/['"]/g, ""));
		}
	});

	// add any plugins that don't exist yet
	for (const plugin of plugins) {
		if (!foundPlugins.includes(plugin)) {
			const atRule = new AtRule({ name: "plugin", params: `"${plugin}"` });
			if (lastPlugin) {
				lastPlugin.after(atRule);
			} else if (lastImport) {
				lastImport.after(atRule);
			} else {
				ast.prepend(atRule);
			}
			status.added.push(`@plugin ${plugin}`);
		}
	}

	return status;
}

function updateCssRule(
	rule: Rule | AtRule,
	_vars: Record<string, string>,
	overwrite: boolean = false
) {
	const vars = structuredClone(_vars);
	rule.walkDecls((decl) => {
		if (!decl.variable) return;
		const prop = decl.prop.slice(2);
		const value = vars[prop];
		if (value) {
			if (overwrite) {
				decl.value = value;
			}
			delete vars[prop];
		}
	});
	return vars;
}
