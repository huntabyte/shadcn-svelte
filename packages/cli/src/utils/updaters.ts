import { Declaration, Rule, AtRule, Root } from "postcss";
import type { CssVars } from "@shadcn-svelte/registry";

const DARK_SELECTOR = ".dark";
const LIGHT_SELECTOR = ":root";

export function updateCssVars(ast: Root, cssVars: CssVars): void {
	// updates colors for `dark` and `light`
	if (cssVars.light || cssVars.dark) {
		ast.walkRules((rule) => {
			if (!rule.selectors.includes(LIGHT_SELECTOR) && !rule.selectors.includes(DARK_SELECTOR))
				return;

			let remainingDark, remainingLight;
			if (cssVars.light && rule.selectors.includes(LIGHT_SELECTOR)) {
				remainingDark = updateCssRule(rule, cssVars.light);
			}

			if (cssVars.dark && rule.selectors.includes(DARK_SELECTOR)) {
				remainingLight = updateCssRule(rule, cssVars.dark);
			}

			// appends the remaining
			for (const [prop, value] of Object.entries(remainingLight ?? remainingDark ?? {})) {
				const decl = new Declaration({ prop: `--${prop}`, value });
				rule.append(decl);
			}
		});
	}

	// updates `@theme`
	if (cssVars.theme) {
		ast.walkAtRules((atRule) => {
			if (atRule.name !== "theme") return;

			// updates existing css vars
			const remaining = updateCssRule(atRule, cssVars.theme!);

			// appends the remaining
			for (const [prop, value] of Object.entries(remaining)) {
				const decl = new Declaration({ prop: `--${prop}`, value });
				atRule.append(decl);
			}
		});
	}
}

export function updateTailwindPlugins(ast: Root, plugins: string[]): void {
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
		}
	}
}

function updateCssRule(rule: Rule | AtRule, _vars: Record<string, string>) {
	const vars = structuredClone(_vars);
	rule.walkDecls((decl) => {
		if (!decl.variable) return;
		const prop = decl.prop.slice(2);
		const value = vars[prop];
		if (value) {
			decl.value = value;
			delete vars[prop];
		}
	});
	return vars;
}
