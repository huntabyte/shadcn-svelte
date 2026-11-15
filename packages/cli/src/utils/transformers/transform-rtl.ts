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
			for (const [physical, logical] of mappings) {
				// Physical sheet/floating sides and their animations remain physical.
				if (/data-\[side=(left|right)\]/.test(variant) && /^-?(left|right)-$/.test(physical))
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
};

/** Rewrites class values, cn/tv/cva calls and class properties, never prose or imports. */
export function transformDirection(content: string, filePath: string): string {
	const ast = filePath.endsWith(".svelte")
		? parse(content, { filename: filePath, modern: true })
		: Parser.extend(tsPlugin()).parse(content, { ecmaVersion: "latest", sourceType: "module" });
	const src = new MagicString(content);
	const edited = new Set<number>();
	function rewrite(root: object) {
		walk(root as Node, {
			enter(node) {
				const n = node as AstNode;
				if (edited.has(n.start) || n.start === n.end) return;
				if (n.type === "Text" && typeof (n as unknown as { data: string }).data === "string") {
					const text = (n as unknown as { data: string }).data;
					src.overwrite(
						n.start,
						n.end,
						(text.match(/^\s*/)?.[0] ?? "") +
							applyRtlMapping(text) +
							(text.match(/\s*$/)?.[0] ?? "")
					);
					edited.add(n.start);
				} else if (n.type === "Literal" && typeof n.value === "string") {
					src.overwrite(n.start, n.end, JSON.stringify(applyRtlMapping(n.value)));
					edited.add(n.start);
				} else if (n.type === "TemplateElement") {
					// Only static class text; leave embedded expressions intact.
					const text = content.slice(n.start, n.end);
					const leading = text.match(/^\s*/)?.[0] ?? "";
					const trailing = text.match(/\s*$/)?.[0] ?? "";
					src.overwrite(n.start, n.end, leading + applyRtlMapping(text) + trailing);
					edited.add(n.start);
				}
			},
		});
	}
	walk(ast as unknown as Node, {
		enter(node) {
			const n = node as AstNode;
			if (n.type === "Attribute" && n.name === "class") {
				// Svelte class arrays, cn calls, ternaries, and static chunks.
				const values = n.value;
				if (Array.isArray(values)) values.forEach(rewrite);
				else if (values && typeof values === "object") rewrite(values as Node);
			} else if (
				n.type === "Property" &&
				(n.key?.name === "class" || n.key?.value === "class") &&
				n.value &&
				typeof n.value === "object"
			) {
				rewrite(n.value);
			} else if (
				n.type === "CallExpression" &&
				["cn", "tv", "cva"].includes(n.callee?.name ?? "")
			) {
				n.arguments?.forEach(rewrite);
			}
		},
	});
	return src.toString();
}

export const transformRtl: Transformer = async ({ content, filePath, config }) => {
	if (!config.rtl || !/\.(svelte|[cm]?[jt]s)$/.test(filePath)) return { content };
	return { content: transformDirection(content, filePath) };
};
