import fs from "fs";
import path from "path";
import type { MdsvexOptions } from "mdsvex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { rehypeComponent } from "./src/lib/rehype-component";

export const mdsvexOptions: MdsvexOptions = {
	extensions: [".md"],
	layout: {
		_: "./src/mdsvex.svelte"
	},
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await shiki.getHighlighter({ theme: "poimandres" });
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [remarkGfm, codeImport],
	rehypePlugins: [
		rehypeSlug,
		rehypeComponent,
		() => (tree) => {
			visit(tree, (node) => {
				if (node?.type === "element" && node?.tagName === "pre") {
					const [codeEl] = node.children;
					if (codeEl.tagName !== "code") {
						return;
					}
					if (codeEl.data?.meta) {
						const regex = /event="([^"]*)"/;
						const match = codeEl.data?.meta.match(regex);
						if (match) {
							node.__event__ = match ? match[1] : null;
							codeEl.data.meta = codeEl.data.meta.replace(regex, "");
						}
					}

					node.__rawString__ = codeEl.children?.[0].value;
					node.__src__ = node.properties?.__src__;
				}
			});
		},
		[
			rehypePrettyCode,
			{
				theme: {
					dark: JSON.parse(fs.readFileSync(path.resolve("./lib/themes/dark.json"), "utf-8")),
					light: JSON.parse(fs.readFileSync(path.resolve("./lib/themes/light.json"), "utf-8"))
				}
			}
		]
	]
};
