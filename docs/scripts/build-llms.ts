import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import consola from "consola";
import type { Plugin } from "unified";
import type { Root, Link, Node, Paragraph, Text } from "mdast";

consola.wrapConsole();

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Replaces relative links with complete URLs
 */
const remarkRelativeLinks: Plugin<[], Root> = () => {
	return (tree: Root) => {
		const visit = (node: Node) => {
			if (node.type === "link" && "url" in node) {
				const link = node as Link;
				if (link.url.startsWith("/")) {
					link.url = `https://shadcn-svelte.com${link.url}`;
				}
			}

			if ("children" in node && Array.isArray(node.children)) {
				for (const child of node.children) {
					visit(child);
				}
			}
		};

		visit(tree);
	};
};

/**
 * Removes paragraphs that contain only the word "Copy"
 */
const remarkRemoveCopyLines: Plugin<[], Root> = () => {
	return (tree: Root) => {
		if ("children" in tree && Array.isArray(tree.children)) {
			tree.children = tree.children.filter((node: Node) => {
				if (node.type === "paragraph") {
					const paragraph = node as Paragraph;
					if (paragraph.children.length === 1 && paragraph.children[0].type === "text") {
						const text = paragraph.children[0] as Text;
						return text.value.trim() !== "Copy";
					}
				}
				return true;
			});
		}
	};
};

type FileMap = Record<string, string>;

async function collectFiles(currentDir: string, baseDir: string): Promise<FileMap> {
	try {
		const entries = await readdir(currentDir, { withFileTypes: true });
		const files: FileMap = {};

		for (const entry of entries) {
			const fullPath = join(currentDir, entry.name);
			const relPath = relative(baseDir, fullPath);

			if (entry.isDirectory()) {
				const subFiles = await collectFiles(fullPath, baseDir);
				Object.assign(files, subFiles);
			} else if (entry.isFile()) {
				if (fullPath.includes("figma")) continue;
				const content = await readFile(fullPath, "utf-8");

				files[relPath] = content;
			}
		}

		return files;
	} catch (error) {
		throw new Error(
			`Failed to collect files from ${currentDir}: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

const REGEX_PATTERNS = {
	multipleNewlines: /\n{3,}/g,
	bulletSpacing: /- \n\s+/g,
	multiLineBullets: /(- [^\n]*)(?:\n\s+([^\n-][^\n]*))/g,
	startLineSpaces: /(\n|^)[ \t]+\n/g,
	endLineSpaces: /\n[ \t]+($|\n)/g,
	inlineCodeBefore: /(\S+)\s*\n\s*(`[^`]+?`)/g,
	inlineCodeAfter: /(`[^`]+?`)\s*\n\s*(\S+)/g,
	parenCodeStart: /\(\s*\n\s*(`[^`]+?`)/g,
	parenCodeEnd: /(`[^`]+?`)\s*\n\s*\)/g,
	escapedBackticks: /\\`([^`]+?)\\`/g,
	codeBlockIndent: /```([a-z]*)\n\t/g,
	htmlComments: /<!--.*?-->/gs,
	trailingLinkSpaces: /\[([^\]]+)\s+\]/g,
} as const;

async function toMarkdown(rawHtml: string) {
	const dom = new JSDOM(rawHtml);
	const document = dom.window.document;
	const codeTags = document?.querySelectorAll("code");
	if (codeTags) {
		for (const code of codeTags) {
			const language = code.getAttribute("data-language");
			if (language) {
				code.className = `${code.className || ""} language-${language}`.trim();
			}
		}
	}
	const targetElement = document.getElementById("main-content");

	const elementsToRemove = Array.from(
		document.querySelectorAll<HTMLElement>("[data-llm-ignore],  [aria-hidden='true']")
	);

	for (const element of elementsToRemove) {
		element.remove();
	}

	const html = targetElement ? targetElement.innerHTML : "";

	const file = await unified()
		.use(rehypeParse)
		.use(rehypeRemark)
		.use(remarkGfm)
		.use(remarkRelativeLinks)
		.use(remarkRemoveCopyLines)
		.use(remarkStringify, {
			bullet: "-",
			listItemIndent: "one",
			tightDefinitions: true,
			fences: true,
		})
		.process(html);

	const sanitizedFile = String(file)
		.replace(REGEX_PATTERNS.htmlComments, "")
		.replace(REGEX_PATTERNS.multipleNewlines, "\n\n")
		.replace(REGEX_PATTERNS.bulletSpacing, "- ")
		.replace(REGEX_PATTERNS.multiLineBullets, "$1 $2")
		.replace(REGEX_PATTERNS.startLineSpaces, "$1")
		.replace(REGEX_PATTERNS.endLineSpaces, "$1")
		.replace(REGEX_PATTERNS.inlineCodeBefore, "$1 $2")
		.replace(REGEX_PATTERNS.inlineCodeAfter, "$1 $2")
		.replace(REGEX_PATTERNS.parenCodeStart, "($1")
		.replace(REGEX_PATTERNS.parenCodeEnd, "$1)")
		.replace(REGEX_PATTERNS.escapedBackticks, "`$1`")
		.replace(REGEX_PATTERNS.codeBlockIndent, "```$1\n")
		.replace(REGEX_PATTERNS.trailingLinkSpaces, "[$1]")
		.replace(/\u00C2/g, "") // Â
		.replace(/\u2014/g, "") // â€”
		// eslint-disable-next-line no-control-regex
		.replace(/[^\u0000-\u007F]/g, "")
		.replaceAll("\t", " ")
		.trim();

	return sanitizedFile;
}

async function main() {
	try {
		consola.info("Starting to build LLM files...");
		const rootPath = join(__dirname, "../.svelte-kit/cloudflare/docs");
		console.info("Collecting files from", rootPath);
		const files = await collectFiles(rootPath, rootPath);
		const fileNames = Object.keys(files);

		// build individual llms.txt files and collect content
		for (const fileName of fileNames) {
			console.info("Processing", fileName);
			if (!fileName.endsWith(".html")) continue;

			const fileContent = files[fileName];
			const cleanedContent = await toMarkdown(fileContent);

			const baseName = basename(fileName, ".html");
			const dirPath = dirname(fileName);

			const createFile = async (destinationDir: string) => {
				const outputPath = join(__dirname, destinationDir, dirPath, `${baseName}.md`);
				const outputDir = dirname(outputPath);
				await mkdir(outputDir, { recursive: true });
				await writeFile(outputPath, cleanedContent);
			};

			await Promise.all([
				createFile("../static/docs"),
				createFile("../.svelte-kit/cloudflare/docs"),
			]);
		}
	} catch (error) {
		console.error("Error building LLM files:", error);
	}
}

main();
