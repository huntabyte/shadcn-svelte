import { promises as fs } from "node:fs";
import path from "node:path";
import { walk } from "estree-walker";
import MagicString from "magic-string";
import { parse as parseSvelte } from "svelte/compiler";
import type { Transformer } from "./index.js";
import { Parser } from "acorn";
import { tsPlugin } from "@sveltejs/acorn-typescript";

const FONT_MARKERS = [
	{
		marker: "cn-font-heading",
		utility: "font-heading",
		supportToken: "--font-heading:",
	},
] as const;

const MARKER_REGEX = /\bcn-font-heading\b/;
const supportCache = new Map<string, Promise<Set<string>>>();

const acornParser = Parser.extend(tsPlugin());

async function getSupportedFontMarkers(
	tailwindCssPath: string | undefined,
	extraMarkers: string[] = []
): Promise<Set<string>> {
	const supported = new Set<string>(extraMarkers);

	if (!tailwindCssPath) {
		return supported;
	}

	let cached = supportCache.get(tailwindCssPath);
	if (!cached) {
		cached = fs
			.readFile(tailwindCssPath, "utf8")
			.then((content) => {
				const projectMarkers = new Set<string>();
				for (const m of FONT_MARKERS) {
					if (content.includes(m.supportToken)) {
						projectMarkers.add(m.marker);
					}
				}
				return projectMarkers;
			})
			.catch(() => new Set<string>());

		supportCache.set(tailwindCssPath, cached);
	}

	for (const marker of await cached) {
		supported.add(marker);
	}

	return supported;
}

export function rewriteFontMarkers(className: string, supportedMarkers: Set<string>): string {
	let next = className;

	for (const m of FONT_MARKERS) {
		if (!next.includes(m.marker)) {
			continue;
		}

		next = next.replace(
			new RegExp(`\\b${m.marker}\\b`, "g"),
			supportedMarkers.has(m.marker) ? m.utility : ""
		);
	}

	return next.replace(/\s+/g, " ").trim();
}

function replaceStringInSource(
	node: { start?: number; end?: number },
	newValue: string,
	source: string,
	src: MagicString
): void {
	if (node.start == null || node.end == null) {
		return;
	}

	const raw = source.slice(node.start, node.end);
	let replacement: string;

	if (raw.startsWith("`")) {
		replacement = newValue === "" ? "``" : `\`${newValue}\``;
	} else if (raw.startsWith("'")) {
		replacement =
			newValue === "" ? "''" : `'${newValue.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
	} else {
		replacement =
			newValue === "" ? '""' : `"${newValue.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
	}

	src.overwrite(node.start, node.end, replacement);
}

function processStringLiteralNode(
	node: { type: string; start?: number; end?: number; value?: unknown },
	source: string,
	src: MagicString,
	supportedMarkers: Set<string>
): void {
	if (node.type !== "Literal" || typeof node.value !== "string") {
		return;
	}

	const currentValue = node.value;
	if (!MARKER_REGEX.test(currentValue)) {
		return;
	}

	const newValue = rewriteFontMarkers(currentValue, supportedMarkers);
	if (newValue !== currentValue) {
		replaceStringInSource(node, newValue, source, src);
	}
}

function processNoSubstTemplateLiteral(
	node: {
		type: string;
		start?: number;
		end?: number;
		quasis?: { value: { cooked?: string | null } }[];
	},
	source: string,
	src: MagicString,
	supportedMarkers: Set<string>
): void {
	if (node.type !== "TemplateLiteral" || !node.quasis || node.quasis.length !== 1) {
		return;
	}

	const text = node.quasis[0]?.value.cooked ?? "";
	if (!MARKER_REGEX.test(text)) {
		return;
	}

	const newValue = rewriteFontMarkers(text, supportedMarkers);
	if (newValue !== text) {
		replaceStringInSource(node, newValue, source, src);
	}
}

function walkStringLiterals(
	root: object,
	source: string,
	src: MagicString,
	supportedMarkers: Set<string>
): void {
	walk(root as never, {
		enter(node) {
			processStringLiteralNode(node, source, src, supportedMarkers);
			processNoSubstTemplateLiteral(node, source, src, supportedMarkers);
		},
	});
}

function isCallWithIdentifier(
	node: { type?: string; callee?: { type?: string; name?: string } | null },
	name: string
): boolean {
	return (
		node.type === "CallExpression" &&
		node.callee !== null &&
		node.callee !== undefined &&
		node.callee.type === "Identifier" &&
		node.callee.name === name
	);
}

function processCvaCall(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	call: any,
	source: string,
	src: MagicString,
	supportedMarkers: Set<string>
): void {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	for (const arg of call.arguments as any[]) {
		if (arg.type === "Literal" && typeof arg.value === "string") {
			processStringLiteralNode(arg, source, src, supportedMarkers);
			continue;
		}
		if (
			arg.type === "TemplateLiteral" &&
			(arg.expressions?.length ?? 0) === 0 &&
			(arg.quasis?.length ?? 0) === 1
		) {
			processNoSubstTemplateLiteral(arg, source, src, supportedMarkers);
			continue;
		}
		walkStringLiterals(arg, source, src, supportedMarkers);
	}
}

type SvelteNode = {
	type: string;
	start?: number;
	end?: number;
	name?: string;
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

function walkSvelteTemplate(
	nodes: SvelteNode[] | undefined,
	visit: (node: SvelteNode) => void
): void {
	if (!nodes) {
		return;
	}
	for (const node of nodes) {
		visit(node);
		walkSvelteTemplate(node.fragment?.nodes ?? node.nodes, visit);
	}
}

function trimClassCallEmptyArgs(result: string): string {
	let out = result;
	out = out.replace(/,\s*""\s*,/g, ",");
	out = out.replace(/\(\s*""\s*,\s*/g, "(");
	out = out.replace(/,\s*""\s*\)/g, ")");
	out = out.replace(/\bcn\s*\(\s*\)/g, "cn()");
	return out;
}

function transformSvelteStyles(
	content: string,
	filePath: string,
	supportedMarkers: Set<string>
): string {
	let ast: {
		fragment?: { nodes?: SvelteNode[] };
		instance?: { content: object } | null;
		module?: { content: object } | null;
	};
	try {
		ast = parseSvelte(content, { filename: filePath, modern: true }) as typeof ast;
	} catch {
		return content;
	}

	const src = new MagicString(content);

	walkSvelteTemplate(ast.fragment?.nodes, (node) => {
		for (const attr of node.attributes ?? []) {
			if (attr.type !== "Attribute" || attr.name !== "class") {
				continue;
			}

			const value = attr.value;
			if (!value) {
				continue;
			}

			if (Array.isArray(value)) {
				const textChunks = value
					.filter(
						(
							chunk
						): chunk is { type: string; data?: string; start?: number; end?: number } =>
							typeof chunk === "object" &&
							chunk !== null &&
							"type" in chunk &&
							chunk.type === "Text"
					)
					.map((c) => c.data ?? "")
					.join("");

				if (!MARKER_REGEX.test(textChunks)) {
					continue;
				}

				const newText = rewriteFontMarkers(textChunks, supportedMarkers);

				if (newText === "") {
					const aStart = attr.start ?? 0;
					const aEnd = attr.end ?? 0;
					const removeStart =
						aStart > 0 && content[aStart - 1] === " " ? aStart - 1 : aStart;
					src.overwrite(removeStart, aEnd, "");
					continue;
				}

				for (const chunk of value as Array<{
					type: string;
					start?: number;
					end?: number;
				}>) {
					if (chunk.type === "Text" && chunk.start != null && chunk.end != null) {
						src.overwrite(chunk.start, chunk.end, newText);
						break;
					}
				}
				continue;
			}

			if (typeof value === "object" && value !== null && "expression" in value) {
				const expr = (
					value as {
						expression?: {
							type: string;
							arguments?: {
								type?: string;
								start?: number;
								end?: number;
								value?: unknown;
							}[];
						};
					}
				).expression;
				if (!expr || expr.type !== "CallExpression") {
					continue;
				}

				const args = expr.arguments;
				if (!args) {
					continue;
				}

				const exprStart = (expr as { start?: number }).start;
				const exprEnd = (expr as { end?: number }).end;
				if (exprStart == null || exprEnd == null) {
					continue;
				}

				const fullExpr = content.slice(exprStart, exprEnd);
				if (!MARKER_REGEX.test(fullExpr)) {
					continue;
				}

				for (const arg of args) {
					if (arg.type !== "Literal" || typeof arg.value !== "string") {
						continue;
					}
					if (!MARKER_REGEX.test(arg.value)) {
						continue;
					}
					const newVal = rewriteFontMarkers(arg.value, supportedMarkers);
					if (arg.start != null && arg.end != null) {
						replaceStringInSource(arg, newVal, content, src);
					}
				}
			}
		}
	});

	for (const script of [ast.instance, ast.module]) {
		if (!script?.content) {
			continue;
		}

		walk(script.content as never, {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			enter(node: any) {
				if (node.type !== "CallExpression") {
					return;
				}
				if (isCallWithIdentifier(node, "cva")) {
					processCvaCall(node, content, src, supportedMarkers);
					this.skip();
				} else if (isCallWithIdentifier(node, "mergeProps")) {
					walkStringLiterals(node, content, src, supportedMarkers);
					this.skip();
				}
			},
		});
	}

	return trimClassCallEmptyArgs(src.toString());
}

function transformJsModule(content: string, supportedMarkers: Set<string>): { content: string } {
	let program: object;
	try {
		program = acornParser.parse(content, {
			ecmaVersion: "latest",
			sourceType: "module",
			locations: false,
		}) as object;
	} catch {
		return { content };
	}

	const src = new MagicString(content);

	walk(program as never, {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		enter(node: any) {
			if (node.type !== "CallExpression") {
				return;
			}
			if (isCallWithIdentifier(node, "cva")) {
				processCvaCall(node, content, src, supportedMarkers);
				this.skip();
			} else if (isCallWithIdentifier(node, "mergeProps")) {
				walkStringLiterals(node, content, src, supportedMarkers);
				this.skip();
			}
		},
	});

	return { content: trimClassCallEmptyArgs(src.toString()) };
}

export const transformFont: Transformer = async ({
	content,
	filePath,
	config,
	supportedFontMarkers = [],
}) => {
	if (!content.includes("cn-font-heading")) {
		return { content };
	}

	const tailwindRaw = config.resolvedPaths?.tailwindCss;
	const tailwindPath = tailwindRaw
		? path.isAbsolute(tailwindRaw)
			? tailwindRaw
			: path.resolve(config.resolvedPaths.cwd, tailwindRaw)
		: undefined;
	const supported = await getSupportedFontMarkers(tailwindPath, supportedFontMarkers);

	if (filePath.endsWith(".svelte")) {
		return { content: transformSvelteStyles(content, filePath, supported) };
	}

	if (
		filePath.endsWith(".ts") ||
		filePath.endsWith(".js") ||
		filePath.endsWith(".mts") ||
		filePath.endsWith(".mjs")
	) {
		const { content: next } = transformJsModule(content, supported);
		return { content: next };
	}

	return { content };
};
