/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from "svelte/compiler";
import { walk } from "estree-walker";
import prettier from "@prettier/sync";
import { codeBlockPrettierConfig } from "../other/code-block-prettier.js";
import * as acorn from "acorn";
import tsPlugin from "acorn-typescript";
import isReference from "is-reference";
import MagicString from "magic-string";

type Chunk = {
	name: string;
	dependencies: string[];
	snippets: {
		start: number;
		end: number;
	}[];
	snippetReferences: string[];
	start: number;
	end: number;
	content: string;
	scriptContent: string;
	references: string[];
	description: string;
	container: { className: string };
};

export function getChunks(source: string, filename: string) {
	type TemplateNode =
		(typeof svelteAst)["fragment"]["nodes"] extends Array<infer T>
			? T
			: (typeof svelteAst)["fragment"]["nodes"];

	const scriptContent = extractScriptContent(source);

	// @ts-expect-error doesn't like the ts plugin
	const scriptAst = acorn.Parser.extend(tsPlugin()).parse(scriptContent, {
		ecmaVersion: "latest",
		sourceType: "module",
	});

	const svelteAst = parse(source, { filename, modern: true });
	const chunks: Chunk[] = [];
	const nameToSnippetNode = new Map<string, TemplateNode>();
	// any references inside of snippets
	const snippetReferences = new Set<string>();

	// `child` / `children` come from the components so no need to look for them
	const snippetNamesToIgnore = ["child", "children"];

	// @ts-expect-error yea, stfu
	walk(svelteAst, {
		enter(n: TemplateNode) {
			const chunkNode = n as TemplateNode | acorn.AnyNode;
			// get snippets from the template
			if (
				chunkNode.type === "SnippetBlock" &&
				!snippetNamesToIgnore.includes(chunkNode.expression.name)
			) {
				// @ts-expect-error yea, stfu
				walk(chunkNode, {
					enter(n) {
						// if its a type reference (like snippet prop type) add it to the references
						// @ts-expect-error yea, stfu
						if (n.type === "TSTypeReference") {
							// @ts-expect-error yea, stfu
							snippetReferences.add(n.typeName.name);
						}

						// if its an identifier that is a reference (like a variable, function, etc) add it to the references
						if (n.type === "Identifier") {
							// @ts-expect-error doesn't like the scriptAst
							if (isReference(n, scriptAst)) {
								snippetReferences.add(n.name);
							}
						}
					},
				});
				// @ts-expect-error lies
				walk(chunkNode.body, {
					enter(n) {
						// @ts-expect-error lies
						if (n.type === "Component") {
							// @ts-expect-error lies
							const [componentName] = n.name.split(".");
							snippetReferences.add(componentName);
						}

						if (n.type === "Identifier") {
							// @ts-expect-error lies
							if (isReference(n, scriptAst)) {
								snippetReferences.add(n.name);
							}
						}
					},
				});
				nameToSnippetNode.set(chunkNode.expression.name, chunkNode);
			}

			if (chunkNode.type !== "RegularElement" && chunkNode.type !== "Component") return;

			const attrs = chunkNode.attributes.filter((a) => a.type === "Attribute");
			const nameNode = attrs.find((a) => a.name === "data-x-chunk-name");
			const descriptionNode = attrs.find((a) => a.name === "data-x-chunk-description");
			if (descriptionNode === undefined || nameNode === undefined) return;

			const containerNode = attrs.find((a) => a.name === "data-x-chunk-container");

			const name = extractAttributeValue(nameNode)!;
			const description = extractAttributeValue(descriptionNode)!;
			const containerClassName = containerNode ? extractAttributeValue(containerNode)! : "";
			const dependencies = new Set<string>();
			const references = new Set<string>();
			const snippets = new Map<string, { start: number; end: number }>();

			// discard any prop members
			const [componentName] = chunkNode.name.split(".");
			dependencies.add(componentName);

			// walk the chunk to acquire all component dependencies
			// @ts-expect-error stfu
			walk(chunkNode.fragment, {
				enter(node: TemplateNode | acorn.AnyNode) {
					if (node.type === "Identifier") {
						// @ts-expect-error yea, stfu
						if (isReference(node, scriptAst)) {
							references.add(node.name);
						}
					}

					if (node.type === "Component") {
						const [componentName] = node.name.split(".");
						dependencies.add(componentName);
						references.add(componentName);
					}
					if (
						node.type === "RenderTag" &&
						node.expression.type === "CallExpression" &&
						node.expression.callee.type === "Identifier"
					) {
						const snippetName = node.expression.callee.name;
						const snippetNode = nameToSnippetNode.get(snippetName);
						if (snippetNode) {
							snippets.set(snippetName, snippetNode);
						}
					}
				},
			});

			const chunk: Chunk = {
				name,
				description,
				dependencies: [...dependencies],
				snippets: Array.from(snippets.values()),
				start: chunkNode.start,
				end: chunkNode.end,
				scriptContent,
				content: "",
				container: {
					className: containerClassName,
				},
				references: [...references],
				snippetReferences: [...snippetReferences],
			};
			chunks.push({ ...chunk, content: transformChunk(source, chunk) });
			// don't traverse the rest of this node
			this.skip();
		},
	});

	return chunks;
}

function extractAttributeValue(attribute: any): string | undefined {
	if (Array.isArray(attribute.value) && attribute.value[0].type === "Text") {
		return attribute.value[0].data;
	}
}

export function transformChunk(source: string, chunk: Chunk): string {
	const scriptReferences = new Set<string>();
	// @ts-expect-error yea, stfu
	const parser = acorn.Parser.extend(tsPlugin());
	const hasSnippets = chunk.snippets.length > 0;

	const scriptAst = parser.parse(chunk.scriptContent, {
		ecmaVersion: "latest",
		sourceType: "module",
	});
	const ms = new MagicString(chunk.scriptContent);

	const rangesToRemove: { start: number; end: number }[] = [];

	function isValidReference(str: string) {
		if (hasSnippets) {
			const refs = [...chunk.references, ...scriptReferences, ...chunk.snippetReferences];
			return refs.includes(str);
		} else {
			return [...chunk.references, ...scriptReferences].includes(str);
		}
	}

	// @ts-expect-error yea, stfu
	walk(scriptAst, {
		enter(node: acorn.AnyNode, parent) {
			if (node.type === "VariableDeclaration") {
				for (const declarator of node.declarations) {
					if (declarator.id.type === "Identifier") {
						const name = declarator.id.name;
						if (!isValidReference(name)) {
							rangesToRemove.push({
								start: node.start as number,
								end: node.end as number,
							});
							this.skip();
						} else {
							// @ts-expect-error -shh
							walk(node, {
								enter(n) {
									if (n.type === "Identifier") {
										if (parent && isReference(n, parent)) {
											scriptReferences.add(n.name);
										}
									}
								},
							});
						}
					}
				}
			}
			// @ts-expect-error lies
			if (node.type === "TSTypeAliasDeclaration") {
				// @ts-expect-error lies
				const name = node.id.name as string;
				if (!isValidReference(name)) {
					if ("start" in node && "end" in node) {
						rangesToRemove.push({
							// @ts-expect-error lies
							start: node.start,
							// @ts-expect-error lies
							end: node.end as number,
						});
						this.skip();
					}
				}
			}
		},
	});

	// @ts-expect-error yea, stfu
	walk(scriptAst, {
		enter(node: acorn.AnyNode) {
			if (node.type === "ImportDeclaration") {
				let numToKeep = 0;
				const localRangesToRemove: { start: number; end: number }[] = [];
				for (const specifier of node.specifiers) {
					if (
						specifier.type === "ImportSpecifier" ||
						specifier.type === "ImportNamespaceSpecifier" ||
						specifier.type === "ImportDefaultSpecifier"
					) {
						if (!isValidReference(specifier.local.name)) {
							localRangesToRemove.push({
								start: specifier.start,
								end: specifier.end,
							});
						} else {
							numToKeep++;
						}
					}
				}
				if (numToKeep === 0) {
					rangesToRemove.push({
						start: node.start,
						end: node.end,
					});
				} else {
					rangesToRemove.push(...localRangesToRemove);
				}
				this.skip();
			}
		},
	});

	for (const range of rangesToRemove) {
		ms.remove(range.start, range.end);
	}

	let hoistedSnippets: string = "";

	for (const snippet of chunk.snippets) {
		hoistedSnippets += `\n${source.substring(snippet.start, snippet.end)}\n`;
	}

	const html = `${hoistedSnippets}\n${source.substring(chunk.start, chunk.end)}`;

	const template = `<script lang="ts">\n${ms.toString()}\n</script>\n\n${html}`;

	return prettier.format(template, {
		...codeBlockPrettierConfig,
		useTabs: true,
		tabWidth: undefined,
	});
}

function extractScriptContent(input: string): string {
	const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
	const match = input.match(scriptRegex);
	return match ? match[1].trim() : "";
}
