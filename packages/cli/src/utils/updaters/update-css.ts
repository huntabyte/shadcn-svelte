import postcss, { AtRule, Declaration, Root, Rule } from "postcss";
import type { CssSchema } from "@shadcn-svelte/registry";
import { error } from "../errors.js";

export function updateCss(root: Root, css: CssSchema): void {
	for (const [selector, properties] of Object.entries(css)) {
		if (selector.startsWith("@")) {
			// Handle at-rules (@layer, @utility, etc.)
			const atRuleMatch = selector.match(/@([a-zA-Z-]+)\s*(.*)/);
			if (!atRuleMatch) continue;

			const [, name, params] = atRuleMatch;
			if (!name || !params) {
				throw error(`Error parsing at-rule: ${atRuleMatch}`);
			}

			// Special handling for keyframes - place them under @theme inline
			if (name === "keyframes") {
				let themeInline = root.nodes?.find(
					(node): node is AtRule =>
						node.type === "atrule" && node.name === "theme" && node.params === "inline"
				) as AtRule | undefined;

				if (!themeInline) {
					themeInline = postcss.atRule({
						name: "theme",
						params: "inline",
						raws: { semicolon: true, between: " " },
					});
					root.append(themeInline);
					root.insertBefore(themeInline, postcss.comment({ text: "---break---" }));
				}

				const keyframesRule = postcss.atRule({
					name: "keyframes",
					params,
					raws: {
						semicolon: true,
						between: " ",
						before: inferBefore(themeInline.raws.before),
					},
				});

				themeInline.append(keyframesRule);

				if (typeof properties === "object") {
					for (const [step, stepProps] of Object.entries(properties)) {
						processRule(keyframesRule, step, stepProps);
					}
				}
			} else if (name === "utility") {
				// Special handling for utility classes to preserve property values
				const utilityAtRule = root.nodes?.find(
					(node): node is AtRule =>
						node.type === "atrule" && node.name === name && node.params === params
				) as AtRule | undefined;

				if (!utilityAtRule) {
					const atRule = postcss.atRule({
						name,
						params,
						raws: { semicolon: true, between: " " },
					});

					root.append(atRule);
					root.insertBefore(atRule, postcss.comment({ text: "---break---" }));

					// Add declarations with their values preserved
					if (typeof properties === "object") {
						for (const [prop, value] of Object.entries(properties)) {
							if (typeof value === "string") {
								const decl = postcss.decl({
									prop,
									value: value,
									raws: {
										semicolon: true,
										before: inferBefore(atRule.raws.before),
									},
								});
								atRule.append(decl);
							} else if (typeof value === "object") {
								processRule(atRule, prop, value);
							}
						}
					}
				} else {
					// Update existing utility class
					if (typeof properties === "object") {
						for (const [prop, value] of Object.entries(properties)) {
							if (typeof value === "string") {
								const existingDecl = utilityAtRule.nodes?.find(
									(node): node is Declaration =>
										node.type === "decl" && node.prop === prop
								);

								const decl = postcss.decl({
									prop,
									value: value,
									raws: { semicolon: true },
								});

								existingDecl
									? existingDecl.replaceWith(decl)
									: utilityAtRule.append(decl);
							} else if (typeof value === "object") {
								processRule(utilityAtRule, prop, value);
							}
						}
					}
				}
			} else {
				// Handle other at-rules normally
				processAtRule(root, name, params, properties);
			}
		} else {
			// Handle regular CSS rules
			processRule(root, selector, properties);
		}
	}
}

function processAtRule(
	root: Root | AtRule,
	name: string,
	params: string,
	properties: string | CssSchema
) {
	// Find or create the at-rule
	let atRule = root.nodes?.find(
		(node): node is AtRule =>
			node.type === "atrule" && node.name === name && node.params === params
	);

	if (!atRule) {
		atRule = postcss.atRule({
			name,
			params,
			raws: { semicolon: true, between: " ", before: inferBefore(root.raws.before) },
		});
		root.append(atRule);
		root.insertBefore(atRule, postcss.comment({ text: "---break---" }));
	}

	// Process children of this at-rule
	if (typeof properties === "object") {
		for (const [childSelector, childProps] of Object.entries(properties)) {
			if (childSelector.startsWith("@")) {
				// Nested at-rule
				const nestedMatch = childSelector.match(/@([a-zA-Z-]+)\s*(.*)/);
				if (nestedMatch) {
					const [, nestedName, nestedParams] = nestedMatch;
					if (!nestedName || !nestedParams) {
						throw error(`Error parsing at-rule children: ${nestedMatch}`);
					}

					processAtRule(atRule, nestedName, nestedParams, childProps);
				}
			} else {
				// CSS rule within at-rule
				processRule(atRule, childSelector, childProps);
			}
		}
	} else if (typeof properties === "string") {
		// Direct string content for the at-rule
		try {
			// Parse the CSS string with PostCSS
			const parsed = postcss.parse(`.temp{${properties}}`);
			const tempRule = parsed.first as Rule;

			if (tempRule && tempRule.nodes) {
				// Create a rule for the at-rule if needed
				const rule = postcss.rule({
					selector: "temp",
					raws: { semicolon: true, between: " ", before: inferBefore(root.raws.before) },
				});

				// Copy all declarations from the temp rule to our actual rule
				tempRule.nodes.forEach((node) => {
					if (node.type === "decl") {
						const clone = node.clone();
						rule.append(clone);
					}
				});

				// Only add the rule if it has declarations
				if (rule.nodes?.length) {
					atRule.append(rule);
				}
			}
		} catch (error) {
			console.error("Error parsing at-rule content:", properties, error);
			throw error;
		}
	}
}

function processRule(parent: Root | AtRule, selector: string, properties: CssSchema[string]) {
	let rule = parent.nodes?.find(
		(node): node is Rule => node.type === "rule" && node.selector === selector
	);

	if (!rule) {
		// uses the same indent level as the parent + 1 tab
		const before = inferBefore(parent.raws.before);
		rule = postcss.rule({ selector, raws: { semicolon: true, between: " ", before } });
		parent.append(rule);
	}

	if (typeof properties === "object") {
		for (const [prop, value] of Object.entries(properties)) {
			if (typeof value === "string") {
				const decl = postcss.decl({
					prop,
					value: value,
					raws: { semicolon: true, before: inferBefore(rule.raws.before) },
				});

				// Replace existing property or add new one
				const existingDecl = rule.nodes?.find(
					(node): node is Declaration => node.type === "decl" && node.prop === prop
				);

				existingDecl ? existingDecl.replaceWith(decl) : rule.append(decl);
			} else if (typeof value === "object") {
				// Nested selector (including & selectors)
				const nestedSelector = prop.startsWith("&")
					? selector.replace(/^([^:]+)/, `$1${prop.substring(1)}`)
					: prop; // Use the original selector for other nested elements
				processRule(parent, nestedSelector, value);
			}
		}
	} else if (typeof properties === "string") {
		// Direct string content for the rule
		try {
			// Parse the CSS string with PostCSS
			const parsed = postcss.parse(`.temp{${properties}}`);
			const tempRule = parsed.first as Rule;

			if (tempRule && tempRule.nodes) {
				// Copy all declarations from the temp rule to our actual rule
				tempRule.nodes.forEach((node) => {
					if (node.type === "decl") {
						const clone = node.clone();
						clone.raws.before = inferBefore(rule.raws.before);
						rule.append(clone);
					}
				});
			}
		} catch (error) {
			console.error("Error parsing rule content:", selector, properties, error);
			throw error;
		}
	}
}

const TAB = "\t";

/**
 * Returns the same indent level as the parent + 1 tab.
 *
 * TODO: consider detecting the use of spaces and tabs
 */
function inferBefore(parentBefore: string | undefined): string {
	return "\n" + (parentBefore?.replaceAll("\n", "") ?? "") + TAB;
}
