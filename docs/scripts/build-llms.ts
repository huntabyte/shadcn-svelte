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
import {
	components,
	installation,
	gettingStarted,
	migration,
	darkMode,
	registry,
} from "../.velite";

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

export type FileMap = Record<string, string>;

export async function collectFiles(currentDir: string, baseDir: string): Promise<FileMap> {
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

type LinkData = {
	name: string;
	path: string;
	description?: string;
	title?: string;
};

type VeliteData =
	| (typeof components)[number]
	| (typeof installation)[number]
	| (typeof gettingStarted)[number]
	| (typeof migration)[number]
	| (typeof darkMode)[number]
	| (typeof registry)[number];

type CategorizedLinks = {
	overview: LinkData[];
	installation: LinkData[];
	components: {
		formInput: LinkData[];
		layoutNavigation: LinkData[];
		overlaysDialogs: LinkData[];
		feedbackStatus: LinkData[];
		displayMedia: LinkData[];
		misc: LinkData[];
	};
	darkMode: LinkData[];
	migration: LinkData[];
	registry: LinkData[];
	other: LinkData[];
};

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
		document.querySelectorAll<HTMLElement>("[data-llm-ignore], [aria-hidden='true']")
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
		.replace(/\u2014/g, "") // â€"
		// eslint-disable-next-line no-control-regex
		.replace(/[^\u0000-\u007F\u2019]/g, "") // preserve fancy apostrophe
		.replaceAll("\t", " ")
		.trim();

	return sanitizedFile;
}

function findVeliteData(veliteData: Record<string, VeliteData[]>, path: string): VeliteData | null {
	// search through all velite data arrays for matching path
	for (const dataArray of Object.values(veliteData)) {
		const found = dataArray.find((item) => item.path === path);
		if (found) return found;
	}
	return null;
}

async function createLLMsIndex(files: FileMap) {
	const veliteData = {
		components,
		installation,
		gettingStarted,
		migration,
		darkMode,
		registry,
	};
	const categorizedLinks: CategorizedLinks = {
		overview: [],
		installation: [],
		components: {
			formInput: [],
			layoutNavigation: [],
			overlaysDialogs: [],
			feedbackStatus: [],
			displayMedia: [],
			misc: [],
		},
		darkMode: [],
		migration: [],
		registry: [],
		other: [],
	};

	const componentCategories = {
		formInput: [
			"form",
			"field",
			"button",
			"button-group",
			"input",
			"input-group",
			"input-otp",
			"textarea",
			"checkbox",
			"radio-group",
			"select",
			"switch",
			"slider",
			"calendar",
			"date-picker",
			"combobox",
			"label",
			"native-select",
		],
		layoutNavigation: [
			"accordion",
			"breadcrumb",
			"navigation-menu",
			"sidebar",
			"tabs",
			"separator",
			"scroll-area",
			"resizable",
		],
		overlaysDialogs: [
			"dialog",
			"alert-dialog",
			"sheet",
			"drawer",
			"popover",
			"tooltip",
			"hover-card",
			"context-menu",
			"dropdown-menu",
			"menubar",
			"command",
		],
		feedbackStatus: ["alert", "sonner", "progress", "spinner", "skeleton", "badge", "empty"],
		displayMedia: [
			"avatar",
			"card",
			"table",
			"data-table",
			"chart",
			"carousel",
			"aspect-ratio",
			"typography",
			"item",
			"kbd",
		],
		misc: ["collapsible", "toggle", "toggle-group", "pagination"],
	};

	for (const fileName of Object.keys(files)) {
		if (!fileName.endsWith(".html")) continue;

		const baseName = basename(fileName, ".html");
		const dirPath = dirname(fileName);
		const outputName =
			baseName === "index" ? (dirPath === "." ? "docs" : basename(dirPath)) : baseName;
		const relativePath =
			baseName === "index" ? `${outputName}.md` : join(dirPath, `${outputName}.md`);

		const veliteItem =
			findVeliteData(veliteData, baseName) ||
			findVeliteData(veliteData, join(dirPath, baseName).replace(/\\/g, "/")) ||
			findVeliteData(veliteData, dirPath.replace(/\\/g, "/") + "/" + baseName);

		const linkData: LinkData = {
			name: outputName,
			path: `https://shadcn-svelte.com/docs/${relativePath}`,
			title: veliteItem?.title,
			description: veliteItem?.description,
		};

		if (
			outputName === "index" ||
			outputName === "about" ||
			outputName === "changelog" ||
			outputName === "cli" ||
			outputName === "components-json" ||
			outputName === "theming" ||
			outputName === "javascript" ||
			outputName === "legacy"
		) {
			categorizedLinks.overview.push(linkData);
		} else if (dirPath.includes("installation")) {
			categorizedLinks.installation.push(linkData);
		} else if (dirPath.includes("dark-mode")) {
			categorizedLinks.darkMode.push(linkData);
		} else if (dirPath.includes("migration")) {
			categorizedLinks.migration.push(linkData);
		} else if (dirPath.includes("registry")) {
			categorizedLinks.registry.push(linkData);
		} else if (dirPath.includes("components")) {
			let categorized = false;
			if (componentCategories.formInput.includes(outputName)) {
				categorizedLinks.components.formInput.push(linkData);
				categorized = true;
			} else if (componentCategories.layoutNavigation.includes(outputName)) {
				categorizedLinks.components.layoutNavigation.push(linkData);
				categorized = true;
			} else if (componentCategories.overlaysDialogs.includes(outputName)) {
				categorizedLinks.components.overlaysDialogs.push(linkData);
				categorized = true;
			} else if (componentCategories.feedbackStatus.includes(outputName)) {
				categorizedLinks.components.feedbackStatus.push(linkData);
				categorized = true;
			} else if (componentCategories.displayMedia.includes(outputName)) {
				categorizedLinks.components.displayMedia.push(linkData);
				categorized = true;
			} else if (componentCategories.misc.includes(outputName)) {
				categorizedLinks.components.misc.push(linkData);
				categorized = true;
			}

			if (!categorized) {
				categorizedLinks.components.misc.push(linkData);
			}
		} else {
			categorizedLinks.other.push(linkData);
		}
	}

	categorizedLinks.overview.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.installation.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.darkMode.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.migration.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.registry.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.other.sort((a, b) => a.name.localeCompare(b.name));

	categorizedLinks.components.formInput.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.components.layoutNavigation.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.components.overlaysDialogs.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.components.feedbackStatus.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.components.displayMedia.sort((a, b) => a.name.localeCompare(b.name));
	categorizedLinks.components.misc.sort((a, b) => a.name.localeCompare(b.name));

	const llmsContent = `# shadcn-svelte

> shadcn-svelte is a collection of beautifully-designed, accessible components for Svelte and SvelteKit. It is built with TypeScript, Tailwind CSS, and Bits UI primitives. Open Source. Open Code. AI-Ready. It also comes with a command-line tool to install and manage components and a registry system to publish and distribute code.

## Overview

${categorizedLinks.overview
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

## Installation

${categorizedLinks.installation
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

## Components

### Form & Input

${categorizedLinks.components.formInput
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

### Layout & Navigation

${categorizedLinks.components.layoutNavigation
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

### Overlays & Dialogs

${categorizedLinks.components.overlaysDialogs
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

### Feedback & Status

${categorizedLinks.components.feedbackStatus
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

### Display & Media

${categorizedLinks.components.displayMedia
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

### Misc

${categorizedLinks.components.misc
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

## Dark Mode

${categorizedLinks.darkMode
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

## Migration

${categorizedLinks.migration
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}

## Registry

${categorizedLinks.registry
	.map((link) => `- [${link.title || formatName(link.name)}](${link.path}): ${link.description}`)
	.join("\n")}
`;

	const createFile = async (destinationFile: string) => {
		const outputPath = join(__dirname, destinationFile);
		const outputDir = dirname(outputPath);
		await mkdir(outputDir, { recursive: true });
		await writeFile(outputPath, llmsContent);
	};

	await createFile("../.svelte-kit/cloudflare/llms.txt");

	consola.info("Created llms.txt index file!");
}

function formatName(name: string): string {
	return name
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

async function main() {
	try {
		consola.info("Starting to build LLM files...");
		const rootPath = join(__dirname, "../.svelte-kit/cloudflare/docs");
		console.info("Collecting files from", rootPath);
		const files = await collectFiles(rootPath, rootPath);
		const fileNames = Object.keys(files).filter((fileName) => fileName.endsWith(".html"));

		// build individual llms.txt files and collect content
		for (const fileName of fileNames) {
			console.info("Processing", fileName);
			if (!fileName.endsWith(".html")) continue;

			const fileContent = files[fileName];
			const cleanedContent = await toMarkdown(fileContent);

			const baseName = basename(fileName, ".html");
			const dirPath = dirname(fileName);
			const outputName =
				baseName === "index" ? (dirPath === "." ? "docs" : basename(dirPath)) : baseName;

			const createFile = async (destinationDir: string) => {
				const outputPath =
					baseName === "index" && dirPath === "."
						? join(__dirname, destinationDir.replace("/docs", ""), `${outputName}.md`)
						: baseName === "index"
							? join(__dirname, destinationDir, `${outputName}.md`)
							: join(__dirname, destinationDir, dirPath, `${outputName}.md`);
				const outputDir = dirname(outputPath);
				await mkdir(outputDir, { recursive: true });
				await writeFile(outputPath, cleanedContent);
			};

			await createFile("../.svelte-kit/cloudflare/docs");
		}

		await createLLMsIndex(files);
	} catch (error) {
		console.error("Error building LLM files:", error);
	}
}

main();
