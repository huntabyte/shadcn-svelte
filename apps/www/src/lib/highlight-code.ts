import { promises as fs } from "node:fs";
import { getHighlighter } from "shiki";
import path from "node:path";

export async function highlightCode(code: string) {
	const editorTheme = await fs.readFile(
		path.join(process.cwd(), "other/themes/dark.json"),
		"utf-8"
	);

	const highlighter = await getHighlighter({
		langs: ["svelte"],
		themes: [],
	});

	await highlighter.loadTheme(JSON.parse(editorTheme));

	const html = highlighter.codeToHtml(code, {
		lang: "svelte",
		theme: "Lambda Studio - Blackout",
	});

	return html;
}
