import postcss, { AtRule, Declaration, Root, Rule } from "postcss";
import { twMerge } from "tailwind-merge";
import type { CssSchema } from "../registry/schema.js";

const TAB = "\t";

/**
 * Returns the same indent level as the parent + 1 tab.
 *
 * TODO: consider detecting the use of spaces and tabs
 */
function inferBefore(parentBefore: string | undefined): string {
	return "\n" + (parentBefore?.replaceAll("\n", "") ?? "") + TAB;
}

export function updateCss(root: Root, css: CssSchema): void {
	for (const [selector, properties] of Object.entries(css)) {
		if (selector.startsWith("@")) {
			// Handle at-rules (@layer, @utility, etc.)
			const atRuleMatch = selector.match(/@([a-zA-Z-]+)\s*(.*)/);
			if (!atRuleMatch) continue;

			const [, name, params = ""] = atRuleMatch;

			// Special handling for imports - place them at the top.
			if (name === "import") {
				// Check if this import already exists.
				const existingImport = root.nodes?.find(
					(node): node is AtRule =>
						node.type === "atrule" && node.name === "import" && node.params === params
				);

				if (!existingImport) {
					const importRule = postcss.atRule({
						name: "import",
						params,
						raws: { semicolon: true },
					});

					// Find the last import to insert after, or insert at beginning.
					const importNodes = root.nodes?.filter(
						(node): node is AtRule => node.type === "atrule" && node.name === "import"
					);

					if (importNodes && importNodes.length > 0) {
						// Insert after the last existing import.
						const lastImport = importNodes[importNodes.length - 1]!;
						importRule.raws.before = "\n";
						root.insertAfter(lastImport, importRule);
					} else {
						// No imports exist, insert at the very beginning.
						importRule.raws.before = "";
						root.prepend(importRule);
					}
				}
				continue;
			}

			// Special handling for plugins - place them after imports.
			if (name === "plugin") {
				// Ensure plugin name is quoted if not already.
				let quotedParams = params;
				if (params && !params.startsWith('"') && !params.startsWith("'")) {
					quotedParams = `"${params}"`;
				}

				// Normalize params for comparison (remove quotes).
				const normalizeParams = (p: string = "") => {
					if (p.startsWith('"') && p.endsWith('"')) {
						return p.slice(1, -1);
					}
					if (p.startsWith("'") && p.endsWith("'")) {
						return p.slice(1, -1);
					}
					return p;
				};

				// Find existing plugin with same normalized params.
				const existingPlugin = root.nodes?.find((node): node is AtRule => {
					if (node.type !== "atrule" || node.name !== "plugin") {
						return false;
					}
					return normalizeParams(node.params) === normalizeParams(params);
				});

				if (!existingPlugin) {
					const pluginRule = postcss.atRule({
						name: "plugin",
						params: quotedParams,
						raws: { semicolon: true, before: "\n" },
					});

					// Find the last import or plugin node to insert after
					const importNodes = root.nodes?.filter(
						(node): node is AtRule => node.type === "atrule" && node.name === "import"
					);

					const pluginNodes = root.nodes?.filter(
						(node): node is AtRule => node.type === "atrule" && node.name === "plugin"
					);

					if (pluginNodes && pluginNodes.length > 0) {
						// Insert after the last existing plugin
						const lastPlugin = pluginNodes[pluginNodes.length - 1]!;
						root.insertAfter(lastPlugin, pluginRule);
					} else if (importNodes && importNodes.length > 0) {
						// Insert after the last import if no plugins exist
						const lastImport = importNodes[importNodes.length - 1]!;
						root.insertAfter(lastImport, pluginRule);
						// Add a break comment before the first plugin to create spacing
						root.insertBefore(pluginRule, postcss.comment({ text: "---break---" }));
						// Add a break comment after the plugin for spacing from other content
						root.insertAfter(pluginRule, postcss.comment({ text: "---break---" }));
					} else {
						// If no imports or plugins, insert at the beginning
						root.prepend(pluginRule);
						// Add a break comment before the first plugin for spacing
						root.insertBefore(pluginRule, postcss.comment({ text: "---break---" }));
						// Add a break comment after the plugin for spacing from other content
						root.insertAfter(pluginRule, postcss.comment({ text: "---break---" }));
					}
				}
				continue;
			}

			// Check if this is any at-rule with no body (empty object).
			if (typeof properties === "object" && Object.keys(properties).length === 0) {
				// Handle any at-rule with no body (e.g., @apply, @tailwind, etc.).
				const atRule = root.nodes?.find(
					(node): node is AtRule =>
						node.type === "atrule" && node.name === name && node.params === params
				);

				if (!atRule) {
					const newAtRule = postcss.atRule({
						name: name!,
						params,
						raws: { semicolon: true },
					});

					root.append(newAtRule);
					root.insertBefore(newAtRule, postcss.comment({ text: "---break---" }));
				}
				continue;
			}

			// Special handling for keyframes - place them under @theme inline.
			if (name === "keyframes") {
				let themeInline = root.nodes?.find(
					(node): node is AtRule =>
						node.type === "atrule" && node.name === "theme" && node.params === "inline"
				) as AtRule | undefined;

				if (!themeInline) {
					themeInline = postcss.atRule({
						name: "theme",
						params: "inline",
						raws: { semicolon: true, between: " ", before: "\n" },
					});
					root.append(themeInline);
					root.insertBefore(themeInline, postcss.comment({ text: "---break---" }));
				}

				// Check if a keyframe with the same name already exists
				const existingKeyframesRule = themeInline.nodes?.find(
					(node): node is AtRule =>
						node.type === "atrule" &&
						node.name === "keyframes" &&
						node.params === params
				);

				let keyframesRule: AtRule;
				if (existingKeyframesRule) {
					// Replace existing keyframe
					keyframesRule = postcss.atRule({
						name: "keyframes",
						params,
						raws: {
							semicolon: true,
							between: " ",
							before: inferBefore(themeInline.raws.before),
						},
					});
					existingKeyframesRule.replaceWith(keyframesRule);
				} else {
					// Create new keyframe
					keyframesRule = postcss.atRule({
						name: "keyframes",
						params,
						raws: {
							semicolon: true,
							between: " ",
							before: inferBefore(themeInline.raws.before),
						},
					});
					themeInline.append(keyframesRule);
				}

				if (typeof properties === "object") {
					for (const [step, stepProps] of Object.entries(properties)) {
						processRule(keyframesRule, step, stepProps);
					}
				}
				continue;
			}

			// Special handling for utility classes to preserve property values
			if (name === "utility") {
				const utilityAtRule = root.nodes?.find(
					(node): node is AtRule =>
						node.type === "atrule" && node.name === name && node.params === params
				) as AtRule | undefined;

				if (!utilityAtRule) {
					const atRule = postcss.atRule({
						name,
						params,
						raws: { semicolon: true, between: " ", before: "\n" },
					});

					root.append(atRule);
					root.insertBefore(atRule, postcss.comment({ text: "---break---" }));

					// Add declarations with their values preserved.
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
							} else if (
								prop.startsWith("@") &&
								typeof value === "object" &&
								value !== null &&
								Object.keys(value as Record<string, unknown>).length === 0
							) {
								// Handle at-rules with no body (e.g., @apply).
								const atRuleMatch = prop.match(/@([a-zA-Z-]+)\s*(.*)/);
								if (atRuleMatch) {
									const [, atRuleName = "", atRuleParams = ""] = atRuleMatch;
									const existingAtRule = atRule.nodes?.find(
										(node): node is AtRule =>
											node.type === "atrule" &&
											node.name === atRuleName &&
											node.params === atRuleParams
									);
									if (!existingAtRule) {
										const newAtRule = postcss.atRule({
											name: atRuleName,
											params: atRuleParams,
											raws: {
												semicolon: true,
												before: inferBefore(atRule.raws.before),
											},
										});
										atRule.append(newAtRule);
									}
								}
							} else if (typeof value === "object") {
								processRule(atRule, prop, value);
							}
						}
					}
				} else {
					// Update existing utility class.
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
									raws: {
										semicolon: true,
										before: inferBefore(utilityAtRule.raws.before),
									},
								});

								existingDecl
									? existingDecl.replaceWith(decl)
									: utilityAtRule.append(decl);
							} else if (
								prop.startsWith("@") &&
								typeof value === "object" &&
								value !== null &&
								Object.keys(value as Record<string, unknown>).length === 0
							) {
								// Handle at-rules with no body (e.g., @apply).
								const atRuleMatch = prop.match(/@([a-zA-Z-]+)\s*(.*)/);
								if (atRuleMatch) {
									const [, atRuleName = "", atRuleParams = ""] = atRuleMatch;
									const existingAtRule = utilityAtRule.nodes?.find(
										(node): node is AtRule =>
											node.type === "atrule" &&
											node.name === atRuleName &&
											node.params === atRuleParams
									);
									if (!existingAtRule) {
										const newAtRule = postcss.atRule({
											name: atRuleName,
											params: atRuleParams,
											raws: {
												semicolon: true,
												before: inferBefore(utilityAtRule.raws.before),
											},
										});
										utilityAtRule.append(newAtRule);
									}
								}
							} else if (typeof value === "object") {
								processRule(utilityAtRule, prop, value);
							}
						}
					}
				}
				continue;
			}

			// Handle at-property as regular CSS rules
			if (name === "property") {
				processRule(root, selector, properties);
				continue;
			}

			// Handle other at-rules normally
			processAtRule(root, name!, params, properties);
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
	) as AtRule | undefined;

	if (!atRule) {
		const isRoot = root.type === "root";
		atRule = postcss.atRule({
			name,
			params,
			raws: {
				semicolon: true,
				between: " ",
				before: isRoot ? "\n" : inferBefore((root as AtRule).raws.before),
			},
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
					const [, nestedName = "", nestedParams = ""] = nestedMatch;
					processAtRule(atRule!, nestedName, nestedParams, childProps);
				}
			} else {
				// CSS rule within at-rule
				processRule(atRule!, childSelector, childProps);
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
					raws: {
						semicolon: true,
						between: " ",
						before: inferBefore(root.raws.before),
					},
				});

				// Copy all declarations from the temp rule to our actual rule
				tempRule.nodes.forEach((node) => {
					if (node.type === "decl") {
						const clone = node.clone();
						clone.raws.before = inferBefore(rule.raws.before);
						rule.append(clone);
					}
				});

				// Only add the rule if it has declarations
				if (rule.nodes?.length) {
					atRule!.append(rule);
				}
			}
		} catch (err) {
			console.error("Error parsing at-rule content:", properties, err);
			throw err;
		}
	}
}

function processRule(parent: Root | AtRule, selector: string, properties: CssSchema[string]) {
	let rule = parent.nodes?.find(
		(node): node is Rule => node.type === "rule" && node.selector === selector
	) as Rule | undefined;

	if (!rule) {
		rule = postcss.rule({
			selector,
			raws: {
				semicolon: true,
				between: " ",
				before: inferBefore(parent.raws.before),
			},
		});
		parent.append(rule);
	}

	if (typeof properties === "object") {
		for (const [prop, value] of Object.entries(properties)) {
			// Check if this is any at-rule with empty object (no body).
			if (
				prop.startsWith("@") &&
				typeof value === "object" &&
				value !== null &&
				Object.keys(value).length === 0
			) {
				// Parse the at-rule.
				const atRuleMatch = prop.match(/@([a-zA-Z-]+)\s*(.*)/);
				if (atRuleMatch) {
					const [, atRuleName = "", atRuleParams = ""] = atRuleMatch;

					// Check if this at-rule already exists in the rule.
					const existingAtRule = rule.nodes?.find(
						(node): node is AtRule =>
							node.type === "atrule" &&
							node.name === atRuleName &&
							node.params === atRuleParams
					);

					if (!existingAtRule) {
						// For @apply, merge with existing @apply instead of creating a duplicate.
						if (atRuleName === "apply") {
							const existingApply = rule.nodes?.find(
								(node): node is AtRule =>
									node.type === "atrule" && node.name === "apply"
							);
							if (existingApply) {
								existingApply.params = twMerge(existingApply.params, atRuleParams);
								continue;
							}
						}
						const atRule = postcss.atRule({
							name: atRuleName,
							params: atRuleParams,
							raws: {
								semicolon: true,
								before: inferBefore(rule.raws.before),
							},
						});
						rule.append(atRule);
					}
				}
			} else if (typeof value === "string") {
				const decl = postcss.decl({
					prop,
					value: value,
					raws: {
						semicolon: true,
						before: inferBefore(rule.raws.before),
					},
				});

				// Replace existing property or add new one.
				const existingDecl = rule.nodes?.find(
					(node): node is Declaration => node.type === "decl" && node.prop === prop
				);

				existingDecl ? existingDecl.replaceWith(decl) : rule.append(decl);
			} else if (typeof value === "object") {
				// Nested selector (including & selectors).
				const nestedSelector = prop.startsWith("&")
					? selector.replace(/^([^:]+)/, `$1${prop.substring(1)}`)
					: prop; // Use the original selector for other nested elements.
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
						clone.raws.before = inferBefore(rule?.raws.before);
						rule?.append(clone);
					}
				});
			}
		} catch (err) {
			console.error("Error parsing rule content:", selector, properties, err);
			throw err;
		}
	}
}
