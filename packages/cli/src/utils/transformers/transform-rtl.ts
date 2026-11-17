// !! BROWSER SAFE !!
// Adapted from shadcn/ui's transform-rtl, using the Svelte AST.
import MagicString from "magic-string";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import { Parser } from "acorn";
import { walk, type Node } from "estree-walker";
import { parse } from "svelte/compiler";
import type { Transformer } from "./index.js";

const mappings = [
	["-ml-", "-ms-"],
	["-mr-", "-me-"],
	["ml-", "ms-"],
	["mr-", "me-"],
	["pl-", "ps-"],
	["pr-", "pe-"],
	["-left-", "-start-"],
	["-right-", "-end-"],
	["left-", "start-"],
	["right-", "end-"],
	["inset-l-", "inset-inline-start-"],
	["inset-r-", "inset-inline-end-"],
	["rounded-tl-", "rounded-ss-"],
	["rounded-tr-", "rounded-se-"],
	["rounded-bl-", "rounded-es-"],
	["rounded-br-", "rounded-ee-"],
	["rounded-l-", "rounded-s-"],
	["rounded-r-", "rounded-e-"],
	["border-l-", "border-s-"],
	["border-r-", "border-e-"],
	["border-l", "border-s"],
	["border-r", "border-e"],
	["text-left", "text-start"],
	["text-right", "text-end"],
	["scroll-ml-", "scroll-ms-"],
	["scroll-mr-", "scroll-me-"],
	["scroll-pl-", "scroll-ps-"],
	["scroll-pr-", "scroll-pe-"],
	["float-left", "float-start"],
	["float-right", "float-end"],
	["clear-left", "clear-start"],
	["clear-right", "clear-end"],
	["origin-top-left", "origin-top-start"],
	["origin-top-right", "origin-top-end"],
	["origin-bottom-left", "origin-bottom-start"],
	["origin-bottom-right", "origin-bottom-end"],
	["origin-left", "origin-start"],
	["origin-right", "origin-end"],
] as const;

// Colons inside arbitrary variants/values are not variant separators.
function splitVariant(token: string) {
	let depth = 0;
	let separator = -1;
	for (let i = 0; i < token.length; i++) {
		if (token[i] === "[" || token[i] === "(") depth++;
		if (token[i] === "]" || token[i] === ")") depth--;
		if (token[i] === ":" && depth === 0) separator = i;
	}
	return [token.slice(0, separator + 1), token.slice(separator + 1)] as const;
}

export function applyRtlMapping(input: string): string {
	const tokens = input.split(/\s+/).filter(Boolean);
	const result = new Set(
		tokens.flatMap((token) => {
			const [variant, utility] = splitVariant(token);
			if (/(?:^|:)(?:rtl|ltr):/.test(variant)) return [token];
			if (utility === "cn-rtl-flip") return [`${variant}rtl:rotate-180`];
			const important = utility.endsWith("!") ? "!" : "";
			const value = important ? utility.slice(0, -1) : utility;
			const rtl = (replacement: string) => `rtl:${variant}${replacement}${important}`;
			if (value.startsWith("-translate-x-")) return [token, rtl(value.slice(1))];
			if (value.startsWith("translate-x-")) return [token, rtl(`-${value}`)];
			if (/^(space|divide)-x-(?!reverse)/.test(value)) {
				return [token, rtl(value.startsWith("space") ? "space-x-reverse" : "divide-x-reverse")];
			}
			if (value === "cursor-w-resize") return [token, rtl("cursor-e-resize")];
			if (value === "cursor-e-resize") return [token, rtl("cursor-w-resize")];
			// Floating UI's physical-side animations must follow actual placement.
			if (!/data-\[side=(left|right)\]/.test(variant)) {
				const slide = value.match(/^(slide-(?:in-from|out-to)-)(left|right)(?=$|-)/);
				if (slide) {
					const logical = slide[2] === "left" ? "start" : "end";
					return [`${variant}${slide[1]}${logical}${value.slice(slide[0].length)}${important}`];
				}
			}
			for (const [physical, logical] of mappings) {
				// Physical sheet/floating sides and their animations remain physical.
				if (
					/data-\[side=(left|right)\]/.test(variant) &&
					/^(?:-?(?:left|right)-|border-[lr]-?)$/.test(physical)
				)
					continue;
				if (physical.endsWith("-") ? value.startsWith(physical) : value === physical) {
					return [`${variant}${logical}${value.slice(physical.length)}${important}`];
				}
			}
			return [token];
		})
	);
	return [...result].join(" ");
}

type AstNode = {
	type: string;
	start: number;
	end: number;
	name?: string;
	value?: unknown;
	key?: AstNode;
	expression?: AstNode;
	callee?: AstNode;
	arguments?: AstNode[];
	properties?: AstNode[];
	elements?: (AstNode | null)[];
	quasis?: AstNode[];
	expressions?: AstNode[];
	consequent?: AstNode;
	alternate?: AstNode;
	left?: AstNode;
	right?: AstNode;
	operator?: string;
	computed?: boolean;
};

/** Rewrites class values, cn/tv/cva calls and class properties, never prose or imports. */
export function transformDirection(content: string, filePath: string): string {
	const ast = filePath.endsWith(".svelte")
		? parse(content, { filename: filePath, modern: true })
		: Parser.extend(tsPlugin()).parse(content, { ecmaVersion: "latest", sourceType: "module" });
	const src = new MagicString(content);
	const edited = new Set<number>();
	function propertyName(node: AstNode) {
		return node.key?.name ?? node.key?.value;
	}
	function variantConfig(node: AstNode, inheritedSlots = false) {
		if (node.type !== "ObjectExpression") return;
		const hasSlots =
			inheritedSlots || node.properties?.some((property) => propertyName(property) === "slots");
		function classValue(value: AstNode) {
			if (hasSlots && value.type === "ObjectExpression") {
				for (const slot of value.properties ?? []) {
					if (slot.type === "Property" && !slot.computed) rewrite(slot.value as AstNode);
				}
			} else rewrite(value);
		}
		for (const property of node.properties ?? []) {
			if (property.type !== "Property" || property.computed) continue;
			const value = property.value as AstNode;
			const name = propertyName(property);
			if (["base", "class", "className"].includes(String(name))) classValue(value);
			else if (name === "slots" && value.type === "ObjectExpression") {
				for (const slot of value.properties ?? []) {
					if (slot.type === "Property") rewrite(slot.value as AstNode);
				}
			} else if (name === "variants" && value.type === "ObjectExpression") {
				for (const variant of value.properties ?? []) {
					const choices = variant.value as AstNode | undefined;
					if (variant.type !== "Property" || choices?.type !== "ObjectExpression") continue;
					for (const choice of choices.properties ?? []) {
						if (choice.type === "Property" && !choice.computed) classValue(choice.value as AstNode);
					}
				}
			} else if (name === "compoundVariants" || name === "compoundSlots") {
				for (const entry of value.elements ?? []) if (entry) variantConfig(entry, hasSlots);
			}
		}
	}
	// Follow only expressions whose values are classes. Tests, lookup keys and arbitrary
	// function arguments are user logic, even when nested inside a class attribute.
	function rewrite(n: AstNode) {
		if (edited.has(n.start) || n.start === n.end) return;
		let before: string | undefined;
		let after: string | undefined;
		if (n.type === "Text" || n.type === "TemplateElement") {
			before = content.slice(n.start, n.end);
			if (!before.trim()) return;
			after =
				(before.match(/^\s*/)?.[0] ?? "") +
				applyRtlMapping(before) +
				(before.match(/\s*$/)?.[0] ?? "");
		} else if (n.type === "Literal" && typeof n.value === "string") {
			const mapped = applyRtlMapping(n.value);
			if (mapped !== n.value) {
				before = content.slice(n.start, n.end);
				after = JSON.stringify(mapped);
			}
		} else if (n.type === "TemplateLiteral") {
			n.quasis?.forEach(rewrite);
			n.expressions?.forEach(rewrite);
		} else if (n.type === "ConditionalExpression") {
			if (n.consequent) rewrite(n.consequent);
			if (n.alternate) rewrite(n.alternate);
		} else if (n.type === "LogicalExpression") {
			if (n.operator !== "&&" && n.left) rewrite(n.left);
			if (n.right) rewrite(n.right);
		} else if (n.type === "ArrayExpression") {
			for (const element of n.elements ?? []) if (element) rewrite(element);
		} else if (n.type === "ObjectExpression") {
			for (const property of n.properties ?? []) {
				if (property.type === "Property" && !property.computed && property.key)
					rewrite(property.key);
			}
		} else if (n.type === "CallExpression") {
			if (n.callee?.name === "cn") n.arguments?.forEach(rewrite);
			else if (n.callee?.name === "tv" || n.callee?.name === "cva") {
				for (const argument of n.arguments ?? []) {
					if (argument.type === "ObjectExpression") variantConfig(argument);
					else rewrite(argument);
				}
			}
		} else if (
			n.expression &&
			[
				"ExpressionTag",
				"TSAsExpression",
				"TSSatisfiesExpression",
				"TSNonNullExpression",
				"ParenthesizedExpression",
			].includes(n.type)
		)
			rewrite(n.expression);
		if (before !== undefined && after !== undefined && before !== after) {
			src.overwrite(n.start, n.end, after);
			edited.add(n.start);
		}
	}
	walk(ast as unknown as Node, {
		enter(node) {
			const n = node as AstNode;
			if (n.type === "Attribute" && n.name === "class") {
				// Svelte class arrays, cn calls, ternaries, and static chunks.
				const values = n.value;
				if (Array.isArray(values)) values.forEach((value) => rewrite(value as AstNode));
				else if (values && typeof values === "object") rewrite(values as AstNode);
				this.skip();
			} else if (
				n.type === "Property" &&
				(n.key?.name === "class" || n.key?.value === "class") &&
				n.value &&
				typeof n.value === "object"
			) {
				rewrite(n.value as AstNode);
				this.skip();
			} else if (
				n.type === "CallExpression" &&
				["cn", "tv", "cva"].includes(n.callee?.name ?? "")
			) {
				rewrite(n);
				this.skip();
			}
		},
	});
	return src.toString();
}

export const transformRtl: Transformer = async ({ content, filePath, config }) => {
	if (!config.rtl || !/\.(svelte|[cm]?[jt]s)$/.test(filePath)) return { content };
	return { content: transformDirection(content, filePath) };
};
