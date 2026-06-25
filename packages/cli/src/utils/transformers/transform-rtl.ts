// !! BROWSER SAFE !!

import MagicString from "magic-string";
import { Parser } from "acorn";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import { walk } from "estree-walker";
import { parse as parseSvelte } from "svelte/compiler";
import type { Transformer } from "./index.js";

type SvelteNode = {
	type: string;
	name?: string;
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

const RTL_MAPPINGS: [string, string][] = [
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
];

const RTL_TRANSLATE_X_MAPPINGS: [string, string][] = [
	["-translate-x-", "translate-x-"],
	["translate-x-", "-translate-x-"],
];

const RTL_REVERSE_MAPPINGS: [string, string][] = [
	["space-x-", "space-x-reverse"],
	["divide-x-", "divide-x-reverse"],
];

const RTL_SWAP_MAPPINGS: [string, string][] = [
	["cursor-w-resize", "cursor-e-resize"],
	["cursor-e-resize", "cursor-w-resize"],
];

const RTL_FLIP_MARKER = "cn-rtl-flip";
const POSITIONING_PREFIXES = ["-left-", "-right-", "left-", "right-"];
const SIDE_PROP_COMPONENTS = [
	"ContextMenuContent",
	"ContextMenuSubContent",
	"DropdownMenuSubContent",
	"ContextMenuPrimitive.Content",
	"ContextMenuPrimitive.SubContent",
	"DropdownMenuPrimitive.SubContent",
];
const SIDE_PROP_MAPPINGS: Record<string, string> = {
	right: "inline-end",
	left: "inline-start",
};
const LOGICAL_SIDE_SLIDE_MAPPINGS: [string, string, string][] = [
	["data-[side=inline-start]", "slide-in-from-right", "slide-in-from-end"],
	["data-[side=inline-start]", "slide-out-to-right", "slide-out-to-end"],
	["data-[side=inline-end]", "slide-in-from-left", "slide-in-from-start"],
	["data-[side=inline-end]", "slide-out-to-left", "slide-out-to-start"],
];

const tsParser = Parser.extend(tsPlugin());

function walkNodes(nodes: SvelteNode[] | undefined, visit: (node: SvelteNode) => void): void {
	if (!nodes) return;
	for (const node of nodes) {
		visit(node);
		walkNodes(node.fragment?.nodes ?? node.nodes, visit);
	}
}

function splitClassName(className: string) {
	const lastColon = className.lastIndexOf(":");
	const slashIndex = className.indexOf("/", lastColon + 1);

	return {
		variant: lastColon === -1 ? "" : className.slice(0, lastColon),
		value:
			lastColon === -1
				? slashIndex === -1
					? className
					: className.slice(0, slashIndex)
				: slashIndex === -1
					? className.slice(lastColon + 1)
					: className.slice(lastColon + 1, slashIndex),
		modifier: slashIndex === -1 ? "" : className.slice(slashIndex + 1),
	};
}

function joinClassName(variant: string, value: string, modifier: string) {
	const prefix = variant ? `${variant}:` : "";
	const suffix = modifier ? `/${modifier}` : "";
	return `${prefix}${value}${suffix}`;
}

export function applyRtlMapping(input: string) {
	return input
		.split(" ")
		.flatMap((className) => {
			if (!className || className.startsWith("rtl:") || className.startsWith("ltr:")) {
				return [className];
			}

			if (className === RTL_FLIP_MARKER) {
				return ["rtl:rotate-180"];
			}

			const { variant, value, modifier } = splitClassName(className);
			if (!value) return [className];

			for (const [physical, rtlPhysical] of RTL_TRANSLATE_X_MAPPINGS) {
				if (value.startsWith(physical)) {
					return [
						className,
						joinClassName(
							variant ? `rtl:${variant}` : "rtl",
							value.replace(physical, rtlPhysical),
							modifier
						),
					];
				}
			}

			for (const [prefix, reverseClass] of RTL_REVERSE_MAPPINGS) {
				if (value.startsWith(prefix)) {
					return [
						className,
						variant ? `rtl:${variant}:${reverseClass}` : `rtl:${reverseClass}`,
					];
				}
			}

			for (const [physical, swapped] of RTL_SWAP_MAPPINGS) {
				if (value === physical) {
					return [className, variant ? `rtl:${variant}:${swapped}` : `rtl:${swapped}`];
				}
			}

			for (const [variantPattern, physical, logical] of LOGICAL_SIDE_SLIDE_MAPPINGS) {
				if (variant.includes(variantPattern) && value.startsWith(physical)) {
					return [joinClassName(variant, value.replace(physical, logical), modifier)];
				}
			}

			const isPhysicalSideVariant =
				variant.includes("data-[side=left]") || variant.includes("data-[side=right]");
			let mappedValue = value;

			for (const [physical, logical] of RTL_MAPPINGS) {
				if (
					isPhysicalSideVariant &&
					POSITIONING_PREFIXES.some((prefix) => physical.startsWith(prefix))
				) {
					continue;
				}

				if (value.startsWith(physical)) {
					if (!physical.endsWith("-") && value !== physical) {
						continue;
					}
					mappedValue = value.replace(physical, logical);
					break;
				}
			}

			return [joinClassName(variant, mappedValue, modifier)];
		})
		.join(" ")
		.replace(/\s+/g, " ")
		.trim();
}

function quoteString(raw: string, value: string) {
	if (raw.startsWith("'")) {
		return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
	}
	if (raw.startsWith("`")) {
		return `\`${value.replace(/\\/g, "\\\\").replace(/`/g, "\\`")}\``;
	}
	return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function transformStringNodes(
	node: unknown,
	content: string,
	src: MagicString,
	offset = 0,
	seen = new Set<unknown>()
) {
	if (!node || typeof node !== "object" || seen.has(node)) return;
	seen.add(node);

	const maybeLiteral = node as {
		type?: string;
		value?: unknown;
		start?: number;
		end?: number;
	};

	if (
		maybeLiteral.type === "Literal" &&
		typeof maybeLiteral.value === "string" &&
		maybeLiteral.start != null &&
		maybeLiteral.end != null
	) {
		const mapped = applyRtlMapping(maybeLiteral.value);
		if (mapped !== maybeLiteral.value) {
			const start = maybeLiteral.start + offset;
			const end = maybeLiteral.end + offset;
			src.overwrite(start, end, quoteString(content.slice(start, end), mapped));
		}
		return;
	}

	for (const value of Object.values(node)) {
		if (Array.isArray(value)) {
			for (const item of value) {
				transformStringNodes(item, content, src, offset, seen);
			}
			continue;
		}
		transformStringNodes(value, content, src, offset, seen);
	}
}

function transformScriptBlocks(content: string, src: MagicString) {
	for (const match of content.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
		const script = match[1];
		if (script === undefined) continue;

		const scriptOffset = (match.index ?? 0) + match[0].indexOf(script);

		let ast: unknown;
		try {
			ast = tsParser.parse(script, { ecmaVersion: "latest", sourceType: "module" });
		} catch {
			continue;
		}

		walk(ast as Parameters<typeof walk>[0], {
			enter(node) {
				if (node.type !== "CallExpression") return;
				const callee = node.callee;
				if (callee.type !== "Identifier" || !["cn", "cva", "tv"].includes(callee.name)) {
					return;
				}

				for (const arg of node.arguments) {
					transformStringNodes(arg, content, src, scriptOffset);
				}
			},
		});
	}
}

export const transformRtl: Transformer = async ({ content, filePath, config }) => {
	if (!config.rtl || !filePath.endsWith(".svelte")) {
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

			if (Array.isArray(value)) {
				const chunk = value.find(
					(
						chunk
					): chunk is { type: string; data?: string; start?: number; end?: number } =>
						typeof chunk === "object" && chunk !== null && "data" in chunk
				);
				if (!chunk?.data || chunk.start == null || chunk.end == null) continue;

				const mapped = applyRtlMapping(chunk.data);
				if (mapped !== chunk.data) {
					src.overwrite(chunk.start, chunk.end, mapped);
				}
				continue;
			}

			if (typeof value === "object" && value !== null && "expression" in value) {
				const expr = (value as { expression?: { type: string; arguments?: unknown[] } })
					.expression;
				transformStringNodes(expr, content, src);
			}
		}

		if (!node.name || !SIDE_PROP_COMPONENTS.includes(node.name)) return;

		for (const attr of node.attributes ?? []) {
			if (attr.name !== "side" || !Array.isArray(attr.value)) continue;

			const chunk = attr.value.find(
				(chunk): chunk is { type: string; data?: string; start?: number; end?: number } =>
					typeof chunk === "object" && chunk !== null && "data" in chunk
			);
			if (!chunk?.data || chunk.start == null || chunk.end == null) continue;

			const mapped = SIDE_PROP_MAPPINGS[chunk.data];
			if (mapped) {
				src.overwrite(chunk.start, chunk.end, mapped);
			}
		}
	});

	transformScriptBlocks(content, src);

	return { content: src.toString() };
};
