import { codeToHtml } from "shiki";

const highlightCodeCache = new Map<string, string>();

export async function highlightCode(code: string, language: string = "svelte") {
	const cachedCode = highlightCodeCache.get(code);
	if (cachedCode) return cachedCode;

	const html = await codeToHtml(formatCode(code), {
		lang: language,
		themes: {
			dark: "github-dark",
			light: "github-light",
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
