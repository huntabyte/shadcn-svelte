import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type { ShikiTransformer } from "shiki";

const highlightCodeCache = new Map<string, string>();
const jsEngine = createJavaScriptRegexEngine();
const highlighterPromise = createHighlighterCore({
	themes: [import("@shikijs/themes/github-dark"), import("@shikijs/themes/github-light-default")],
	langs: [import("@shikijs/langs/typescript"), import("@shikijs/langs/svelte")],
	engine: jsEngine,
});

export async function highlightCode(code: string, language: string = "svelte"): Promise<string> {
	const cachedCode = highlightCodeCache.get(code);
	if (cachedCode) return cachedCode;

	const highlighter = await highlighterPromise;

	const html = highlighter.codeToHtml(formatCode(code), {
		lang: language,
		themes: {
			dark: "github-dark",
			light: "github-light-default",
		},
		transformers: [
			{
				pre(node) {
					node.properties["class"] =
						"no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent";
				},
				code(node) {
					node.properties["data-line-numbers"] = "";
				},
				line(node) {
					node.properties["data-line"] = "";
				},
			},
		],
	});

	highlightCodeCache.set(code, html);

	return html;
}

function formatCode(code: string): string {
	return code.replace(/\t/g, "  ");
}

export const transformers = [
	{
		code(node) {
			if (node.tagName === "code") {
				const raw = this.source;
				node.properties["__raw__"] = raw;

				if (raw.startsWith("npm install")) {
					node.properties["__npm__"] = raw;
					node.properties["__yarn__"] = raw.replace("npm install", "yarn add");
					node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add");
					node.properties["__bun__"] = raw.replace("npm install", "bun add");
				}

				if (raw.startsWith("npx create-")) {
					node.properties["__npm__"] = raw;
					node.properties["__yarn__"] = raw.replace("npx create-", "yarn create ");
					node.properties["__pnpm__"] = raw.replace("npx create-", "pnpm create ");
					node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
				}

				// npm create.
				if (raw.startsWith("npm create")) {
					node.properties["__npm__"] = raw;
					node.properties["__yarn__"] = raw.replace("npm create", "yarn create");
					node.properties["__pnpm__"] = raw.replace("npm create", "pnpm create");
					node.properties["__bun__"] = raw.replace("npm create", "bun create");
				}

				// npx.
				if (raw.startsWith("npx")) {
					node.properties["__npm__"] = raw;
					node.properties["__yarn__"] = raw.replace("npx", "yarn");
					node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx");
					node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
				}

				// npm run.
				if (raw.startsWith("npm run")) {
					node.properties["__npm__"] = raw;
					node.properties["__yarn__"] = raw.replace("npm run", "yarn");
					node.properties["__pnpm__"] = raw.replace("npm run", "pnpm");
					node.properties["__bun__"] = raw.replace("npm run", "bun");
				}
			}
		},
	},
] as ShikiTransformer[];
