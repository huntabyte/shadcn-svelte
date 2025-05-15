import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang: "svelte" | "ts" = "svelte") {
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

	return html;
}
