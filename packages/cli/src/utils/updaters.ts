import { parse, Declaration, Rule, type AtRule } from "postcss";
import type { CssVars } from "./registry/schema.js";

type UpdateStatus = {
	updated: string[];
	skipped: string[];
	added: string[];
};

type UpdateOptions = {
	/** Whether to overwrite conflicting variables */
	overwrite?: boolean;
};

export function updateCssVars(
	source: string,
	cssVars: CssVars,
	options: UpdateOptions = { overwrite: true }
): { css: string; status: UpdateStatus } {
	// if no CSS variables are provided to update, bail
	if (Object.keys(cssVars).length === 0)
		return { css: source, status: { updated: [], skipped: [], added: [] } };

	const ast = parse(source);
	const status: UpdateStatus = { updated: [], skipped: [], added: [] };

	const processRule = options.overwrite ? overwriteRule : updateRule;

	// updates colors for `dark` and `light`
	if (cssVars.light || cssVars.dark) {
		ast.walkRules((rule) => {
			if (!rule.selectors.includes(":root") && !rule.selectors.includes(".dark")) return;

			let remainingDark, remainingLight;
			if (cssVars.light && rule.selectors.includes(":root")) {
				remainingLight = processRule(rule, cssVars.light);
				status.updated.push(":root");
			}
			if (cssVars.dark && rule.selectors.includes(".dark")) {
				remainingDark = processRule(rule, cssVars.dark);
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
			const remainingVars = processRule(atRule, cssVars.theme!);
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

	return { css: ast.toString(), status };
}

/** Updates existing CSS vars without overwriting */
function updateRule(rule: Rule | AtRule, _vars: Record<string, string>) {
	const vars = structuredClone(_vars);
	rule.walkDecls((decl) => {
		if (!decl.variable) return;
		const prop = decl.prop.slice(2);
		if (vars[prop]) {
			delete vars[prop];
		}
	});
	return vars;
}

/** Overwrites existing CSS vars */
function overwriteRule(rule: Rule | AtRule, _vars: Record<string, string>) {
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
