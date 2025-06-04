import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const highlightCodeCache = new Map<string, string>();
const jsEngine = createJavaScriptRegexEngine();

export async function createHighlighter() {
	if (!globalThis.__shikiHighlighter) {
		globalThis.__shikiHighlighter = await createHighlighterCore({
			themes: [
				import("@shikijs/themes/github-dark"),
				import("@shikijs/themes/github-light-default"),
			],
			langs: [
				import("@shikijs/langs/typescript"),
				import("@shikijs/langs/svelte"),
				import("@shikijs/langs/css"),
				import("@shikijs/langs/json"),
				import("@shikijs/langs/bash"),
			],
			engine: jsEngine,
		});
	}
	return globalThis.__shikiHighlighter;
}

export async function highlightCode(code: string, language: string = "svelte") {
	const cachedCode = highlightCodeCache.get(code);
	if (cachedCode) return cachedCode;

	const highlighter = await createHighlighter();

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

function formatCode(code: string) {
	// replaces tabs with 2 spaces
	return code.replace(/\t/g, "  ");
}
