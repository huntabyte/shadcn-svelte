import postcss, {
	Declaration,
	type AtRule,
	type Root,
	type Rule,
} from "postcss";
import type { CssVars } from "../registry/schema.js";

const DARK_SELECTOR = ".dark";
const LIGHT_SELECTOR = ":root";
const DARK_VARIANT_PARAMS = "dark (&:is(.dark *))";

export type UpdateCssVarsOptions = {
	/** When true, overwrite existing CSS variables. When false (default), only add new ones. */
	overwriteCssVars?: boolean;
};

export function updateCssVars(
	ast: Root,
	cssVars: CssVars,
	options: UpdateCssVarsOptions = {}
): void {
	// Default true for backward compatibility - original always overwrote existing vars
	const opts = {
		overwriteCssVars: options.overwriteCssVars ?? true,
	};

	// Add @custom-variant for dark when dark vars exist (only for v4 structure)
	const hasV4Structure =
		ast.nodes?.some(
			(n) =>
				n.type === "atrule" &&
				(n.name === "import" || n.name === "theme")
		) ?? false;
	if (
		hasV4Structure &&
		cssVars.dark &&
		Object.keys(cssVars.dark).length > 0
	) {
		addCustomVariant(ast);
	}

	// Process light vars - walk to find existing :root, or create at root (v4 only)
	if (cssVars.light) {
		let foundLight = false;
		ast.walkRules((rule) => {
			if (rule.selectors.includes(LIGHT_SELECTOR)) {
				foundLight = true;
				applyVarsToRule(rule, cssVars.light!, opts.overwriteCssVars);
			}
		});
		if (!foundLight && hasV4Structure) {
			ensureRootRule(ast, LIGHT_SELECTOR, cssVars.light, opts.overwriteCssVars);
		}
	}

	// Process dark vars - walk to find existing .dark, or create at root (v4 only)
	if (cssVars.dark) {
		let foundDark = false;
		ast.walkRules((rule) => {
			if (rule.selectors.includes(DARK_SELECTOR)) {
				foundDark = true;
				applyVarsToRule(rule, cssVars.dark!, opts.overwriteCssVars);
			}
		});
		if (!foundDark && hasV4Structure) {
			ensureRootRule(ast, DARK_SELECTOR, cssVars.dark, opts.overwriteCssVars);
		}
	}

	// Process theme vars - upsert @theme inline and add/update vars (only when theme exists or v4)
	if (cssVars.theme && hasV4Structure) {
		updateThemeVars(ast, cssVars.theme, opts.overwriteCssVars);
	}

	// Add derived theme vars (radius-*, --color-*) from light/dark
	if (hasV4Structure && (cssVars.light || cssVars.dark)) {
		updateThemePlugin(ast, cssVars);
	}
}

function addCustomVariant(ast: Root): void {
	const customVariant = ast.nodes?.find(
		(node): node is AtRule =>
			node.type === "atrule" && node.name === "custom-variant"
	);

	if (!customVariant) {
		const importNodes = ast.nodes?.filter(
			(node): node is AtRule =>
				node.type === "atrule" && node.name === "import"
		);

		const variantNode = postcss.atRule({
			name: "custom-variant",
			params: DARK_VARIANT_PARAMS,
			raws: { semicolon: true, before: "\n" },
		});

		if (importNodes && importNodes.length > 0) {
			const lastImport = importNodes[importNodes.length - 1]!;
			ast.insertAfter(lastImport, variantNode);
		} else if (ast.nodes && ast.nodes.length > 0) {
			ast.insertAfter(ast.nodes[0]!, variantNode);
		} else {
			ast.append(variantNode);
		}

		ast.insertBefore(variantNode, postcss.comment({ text: "---break---" }));
	}
}

function applyVarsToRule(
	rule: Rule | AtRule,
	vars: Record<string, string>,
	overwrite: boolean
): void {
	for (const [key, value] of Object.entries(vars)) {
		let prop = `--${key.replace(/^--/, "")}`;
		if (prop === "--sidebar-background") prop = "--sidebar";

		const processedValue = isLocalHSLValue(value) ? `hsl(${value})` : value;
		const newDecl = postcss.decl({ prop, value: processedValue, raws: { semicolon: true } });

		const existingDecl = rule.nodes?.find(
			(node): node is Declaration => node.type === "decl" && node.prop === prop
		);

		if (overwrite) {
			existingDecl ? existingDecl.replaceWith(newDecl) : rule.append(newDecl);
		} else if (!existingDecl) {
			rule.append(newDecl);
		}
	}
}

function ensureRootRule(
	ast: Root,
	selector: string,
	vars: Record<string, string>,
	overwrite: boolean
): void {
	const ruleNode = postcss.rule({
		selector,
		raws: { semicolon: true, between: " ", before: "\n" },
	});
	ast.append(ruleNode);
	ast.insertBefore(ruleNode, postcss.comment({ text: "---break---" }));
	applyVarsToRule(ruleNode, vars, overwrite);
}

function updateThemeVars(
	ast: Root,
	vars: Record<string, string>,
	overwrite: boolean
): void {
	const themeNode = upsertThemeNode(ast);

	for (const [key, value] of Object.entries(vars)) {
		const prop = `--${key.replace(/^--/, "")}`;
		const newDecl = postcss.decl({ prop, value, raws: { semicolon: true } });

		const existingDecl = themeNode.nodes?.find(
			(node): node is Declaration =>
				node.type === "decl" && node.prop === prop
		);

		if (overwrite) {
			existingDecl ? existingDecl.replaceWith(newDecl) : themeNode.append(newDecl);
		} else if (!existingDecl) {
			themeNode.append(newDecl);
		}
	}
}

function updateThemePlugin(ast: Root, cssVars: CssVars): void {
	const variables = Array.from(
		new Set(
			Object.keys(cssVars).flatMap((key) =>
				Object.keys((cssVars as Record<string, Record<string, string>>)[key] ?? {})
			)
		)
	);

	if (variables.length === 0) return;

	const themeNode = upsertThemeNode(ast);

	const themeVarNodes = themeNode.nodes?.filter(
		(node): node is Declaration =>
			node.type === "decl" && node.prop.startsWith("--")
	);

	for (const variable of variables) {
		const value = Object.values(cssVars).find((vars) => vars?.[variable])?.[
			variable
		];

		if (!value) continue;

		if (variable === "radius") {
			const radiusVariables: Record<string, string> = {
				sm: "calc(var(--radius) * 0.6)",
				md: "calc(var(--radius) * 0.8)",
				lg: "var(--radius)",
				xl: "calc(var(--radius) * 1.4)",
				"2xl": "calc(var(--radius) * 1.8)",
				"3xl": "calc(var(--radius) * 2.2)",
				"4xl": "calc(var(--radius) * 2.6)",
			};
			for (const [key, radiusValue] of Object.entries(radiusVariables)) {
				const cssVarNode = postcss.decl({
					prop: `--radius-${key}`,
					value: radiusValue,
					raws: { semicolon: true },
				});
				if (
					themeNode.nodes?.find(
						(node): node is Declaration =>
							node.type === "decl" && node.prop === cssVarNode.prop
					)
				) {
					continue;
				}
				themeNode.append(cssVarNode);
			}
			continue;
		}

		let prop =
			isLocalHSLValue(value) || isColorValue(value)
				? `--color-${variable.replace(/^--/, "")}`
				: `--${variable.replace(/^--/, "")}`;
		if (prop === "--color-sidebar-background") {
			prop = "--color-sidebar";
		}

		let propValue = `var(--${variable})`;
		if (prop === "--color-sidebar") {
			propValue = "var(--sidebar)";
		}

		const cssVarNode = postcss.decl({
			prop,
			value: propValue,
			raws: { semicolon: true },
		});
		const existingDecl = themeNode.nodes?.find(
			(node): node is Declaration =>
				node.type === "decl" && node.prop === cssVarNode.prop
		);
		if (!existingDecl) {
			if (themeVarNodes && themeVarNodes.length > 0) {
				themeNode.insertAfter(
					themeVarNodes[themeVarNodes.length - 1]!,
					cssVarNode
				);
			} else {
				themeNode.append(cssVarNode);
			}
		}
	}
}

function upsertThemeNode(ast: Root): AtRule {
	let themeNode = ast.nodes?.find(
		(node): node is AtRule =>
			node.type === "atrule" &&
			node.name === "theme" &&
			(node.params === "inline" || node.params === "")
	);

	if (!themeNode) {
		themeNode = postcss.atRule({
			name: "theme",
			params: "inline",
			raws: { semicolon: true, between: " ", before: "\n" },
		});
		ast.append(themeNode);
		ast.insertBefore(themeNode, postcss.comment({ text: "---break---" }));
	}

	return themeNode;
}

export function isLocalHSLValue(value: string): boolean {
	if (
		value.startsWith("hsl") ||
		value.startsWith("rgb") ||
		value.startsWith("#") ||
		value.startsWith("oklch")
	) {
		return false;
	}

	const chunks = value.split(" ");
	return (
		chunks.length === 3 &&
		chunks.slice(1, 3).every((chunk) => chunk.includes("%"))
	);
}

export function isColorValue(value: string): boolean {
	return (
		value.startsWith("hsl") ||
		value.startsWith("rgb") ||
		value.startsWith("#") ||
		value.startsWith("oklch") ||
		value.includes("--color-")
	);
}

export function updateTailwindPlugins(ast: Root, plugins: string[]): void {
	const foundPlugins: string[] = [];
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

	for (const plugin of plugins) {
		if (!foundPlugins.includes(plugin)) {
			const atRule = postcss.atRule({ name: "plugin", params: `"${plugin}"` });
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