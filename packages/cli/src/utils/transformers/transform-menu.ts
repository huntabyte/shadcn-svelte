// !! BROWSER SAFE !!

import type { Transformer } from "./index.js";
import { parse as parseSvelte } from "svelte/compiler";
import MagicString from "magic-string";
import { twMerge } from "tailwind-merge";

// Hardcoded translucent classes inlined at install time.
const TRANSLUCENT_CLASSES =
	"animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!";

type SvelteNode = {
	type: string;
	start?: number;
	end?: number;
	attributes?: Array<{
		type: string;
		name: string;
		start?: number;
		end?: number;
		value?: unknown;
	}>;
	fragment?: { nodes?: SvelteNode[] };
	nodes?: SvelteNode[];
};

function transformClassText(
	text: string,
	menuColor: string,
	isTranslucent: boolean
): { newText: string } {
	let newText = text;

	if (menuColor === "inverted" || menuColor === "inverted-translucent") {
		newText = newText.replace(/cn-menu-target/g, "dark");
	} else {
		newText = newText.replace(/cn-menu-target/g, "");
	}

	if (isTranslucent) {
		const merged = twMerge(newText, TRANSLUCENT_CLASSES);
		newText = merged.replace(/\s*\bcn-menu-translucent\b\s*/g, " ").trim();
	} else {
		newText = newText.replace(/cn-menu-translucent/g, "");
	}

	newText = newText.replace(/\s{2,}/g, " ").replace(/^\s+|\s+$/g, "");
	return { newText };
}

function walkNodes(nodes: SvelteNode[] | undefined, visit: (node: SvelteNode) => void): void {
	if (!nodes) return;
	for (const node of nodes) {
		visit(node);
		walkNodes(node.fragment?.nodes ?? node.nodes, visit);
	}
}

/**
 * Transforms cn-menu-target and cn-menu-translucent classes based on config.menuColor.
 * If menuColor is "inverted", replaces cn-menu-target with "dark" and removes cn-menu-translucent.
 * If menuColor is "default-translucent", removes cn-menu-target and inlines cn-menu-translucent styles.
 * If menuColor is "inverted-translucent", replaces cn-menu-target with "dark" and inlines cn-menu-translucent styles.
 * Otherwise, removes both cn-menu-target and cn-menu-translucent.
 */
export const transformMenu: Transformer = async ({ content, filePath, config }) => {
	const menuColor = config.menuColor ?? "default";
	const isTranslucent =
		menuColor === "default-translucent" || menuColor === "inverted-translucent";

	if (!content.includes("cn-menu-target") && !content.includes("cn-menu-translucent")) {
		return { content };
	}

	if (!filePath.endsWith(".svelte")) {
		return { content };
	}

	let ast: { fragment?: { nodes?: SvelteNode[] } };
	try {
		ast = parseSvelte(content, { filename: filePath, modern: true }) as typeof ast;
	} catch {
		return { content };
	}

	const src = new MagicString(content);

	walkNodes(ast.fragment?.nodes, (node) => {
		for (const attr of node.attributes ?? []) {
			if (attr.name !== "class") continue;

			const value = attr.value;
			if (!value) continue;

			// Static: class="..."
			if (Array.isArray(value)) {
				const textChunks = value
					.filter(
						(
							chunk
						): chunk is { type: string; data?: string; start?: number; end?: number } =>
							typeof chunk === "object" && chunk !== null && "data" in chunk
					)
					.map((c) => c.data ?? "")
					.join("");
				if (
					!textChunks.includes("cn-menu-target") &&
					!textChunks.includes("cn-menu-translucent")
				) {
					continue;
				}
				const { newText } = transformClassText(textChunks, menuColor, isTranslucent);
				for (const chunk of value as Array<{
					type: string;
					data?: string;
					start?: number;
					end?: number;
				}>) {
					if (chunk.start != null && chunk.end != null) {
						src.overwrite(chunk.start, chunk.end, newText);
						break; // Single text chunk typically
					}
				}
				continue;
			}

			// Dynamic: class={cn(...)}
			if (typeof value === "object" && value !== null && "expression" in value) {
				const expr = (value as { expression?: { type: string; arguments?: unknown[] } })
					.expression;
				if (!expr || expr.type !== "CallExpression") continue;
				const args = expr.arguments as {
					type: string;
					value?: string;
					raw?: string;
					start?: number;
					end?: number;
				}[];
				if (!args) continue;

				const exprStart = (expr as { start?: number }).start;
				const exprEnd = (expr as { end?: number }).end;
				if (exprStart == null || exprEnd == null) continue;

				const fullExpr = content.slice(exprStart, exprEnd);
				if (
					!fullExpr.includes("cn-menu-target") &&
					!fullExpr.includes("cn-menu-translucent")
				) {
					continue;
				}

				// Collect edits; we'll apply in reverse order to preserve offsets
				const edits: { start: number; end: number; replacement: string }[] = [];
				for (const arg of args) {
					if (arg.type !== "Literal" || typeof arg.value !== "string") continue;
					const text = arg.value;
					if (!text.includes("cn-menu-target") && !text.includes("cn-menu-translucent")) {
						continue;
					}
					const { newText } = transformClassText(text, menuColor, isTranslucent);
					if (arg.start != null && arg.end != null) {
						const raw = arg.raw ?? JSON.stringify(text);
						const quote = raw.startsWith("'") ? "'" : '"';
						// Use "" so post-processing can clean up empty args in cn()
						edits.push({
							start: arg.start,
							end: arg.end,
							replacement: newText === "" ? '""' : `${quote}${newText}${quote}`,
						});
					}
				}
				for (const edit of edits) {
					src.overwrite(edit.start, edit.end, edit.replacement);
				}
			}
		}
	});

	let result = src.toString();
	// Clean up empty string arguments in cn() calls
	result = result.replace(/,\s*""\s*,/g, ",");
	result = result.replace(/\(\s*""\s*,\s*/g, "(");
	result = result.replace(/,\s*""\s*\)/g, ")");
	result = result.replace(/cn\s*\(\s*\)/g, "cn()");

	return { content: result };
};
