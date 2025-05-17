import { codeToHtml } from "shiki";

const highlightCodeCache = new Map<string, string>();

export async function highlightCode(code: string, lang: "svelte" | "ts" | "json" = "svelte") {
	const cachedCode = highlightCodeCache.get(code);
	if (cachedCode) return cachedCode;

	const html = await codeToHtml(code, {
		lang: lang,
		theme: "github-dark-default",
		transformers: [
			{
				code(node) {
					node.properties["data-line-numbers"] = "";
				},
			},
		],
	});

	highlightCodeCache.set(code, html);

	return html;
}
