import { parse, Declaration, Rule, type AtRule } from "postcss";
import type { CssVars } from "./registry/schema.js";

export function updateCssVars(source: string, cssVars: CssVars): string {
	if (Object.keys(cssVars).length === 0) return source;

	const ast = parse(source);

	// TODO: Consider adding status logs for each update. Perhaps this function could return a `string[]` of them.

	// TODO: Should we error out if we fail to find/update any of the selectors?

	// updates colors for `dark` and `light`
	if (cssVars.light || cssVars.dark) {
		ast.walkRules((rule) => {
			if (!rule.selectors.includes(":root") && !rule.selectors.includes(".dark")) return;

			let remainingDark, remainingLight;
			if (cssVars.light && rule.selectors.includes(":root")) {
				remainingLight = updateRule(rule, cssVars.light);
			}
			if (cssVars.dark && rule.selectors.includes(".dark")) {
				remainingDark = updateRule(rule, cssVars.dark);
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
			const remainingVars = updateRule(atRule, cssVars.theme!);

			// appends the remaining
			for (const [prop, value] of Object.entries(remainingVars)) {
				const decl = new Declaration({ prop: `--${prop}`, value });
				atRule.append(decl);
			}
		});
	}

	return ast.toString();
}

/** Updates existing CSS vars */
function updateRule(rule: Rule | AtRule, _vars: Record<string, string>) {
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
