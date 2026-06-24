import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globby } from "globby";
import removeMd from "remove-markdown";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const OUTPUT_PATH = path.resolve(process.cwd(), "src/routes/api/search.json/search.json");

export type SearchEntry = {
	title: string;
	description: string;
	content: string;
	href: string;
	category: string;
	type: "page" | "heading" | "text";
	pageTitle: string;
};

function parseFrontmatter(raw: string): { title: string; description: string; body: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!match) return { title: "", description: "", body: raw };

	const frontmatter = match[1];
	const body = match[2];

	const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? "";
	const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? "";

	return { title, description, body };
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.split("")
		.filter((char) => !isGithubSlugRemovedChar(char))
		.join("")
		.replace(/ /g, "-");
}

function isGithubSlugRemovedChar(char: string): boolean {
	const code = char.codePointAt(0);
	if (code === undefined) return false;

	return (
		code <= 0x1f ||
		(code >= 0x21 && code <= 0x2c) ||
		code === 0x2e ||
		code === 0x2f ||
		(code >= 0x3a && code <= 0x40) ||
		(code >= 0x5b && code <= 0x5e) ||
		code === 0x60 ||
		(code >= 0x7b && code <= 0xa9)
	);
}

function cleanText(raw: string): string {
	// Remove <script> blocks
	let content = raw.replace(/<script[\s\S]*?<\/script>/gi, "");
	// Remove code blocks, but preserve inline code text for headings like `<DataTable />`.
	content = content.replace(/```[\s\S]*?```/g, "");
	const inlineCode: string[] = [];
	content = content.replace(/`([^`]+)`/g, (_, code: string) => {
		const index = inlineCode.push(code) - 1;
		return ` INLINECODEPLACEHOLDER${index}END `;
	});
	// Remove HTML/Svelte tags
	content = content.replace(/<[^>]+>/g, " ");
	// Run remove-markdown (replaceLinksWithURL: false keeps display text, not URLs)
	content = removeMd(content, {
		replaceLinksWithURL: false,
		gfm: true,
		useImgAltText: true,
	});
	content = content.replace(/INLINECODEPLACEHOLDER(\d+)END/g, (_, index: string) => {
		return inlineCode[Number(index)] ?? "";
	});
	// Clean up whitespace
	content = content.replace(/\s+/g, " ").trim();
	// Remove remaining markdown link syntax (keeps display text)
	content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
	content = content.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");

	return content;
}

function splitParagraphs(raw: string): string[] {
	return raw
		.split(/\r?\n\s*\r?\n/)
		.map((paragraph) => cleanText(paragraph))
		.filter((paragraph) => paragraph.length > 20);
}

function deriveHref(filePath: string): string {
	let rel = path.relative(CONTENT_DIR, filePath);
	rel = rel.replace(/\.md$/, "");
	rel = rel.replace(/\/index$/, "");
	if (rel === "index") return "/docs";
	return `/docs/${rel}`;
}

function deriveCategory(filePath: string): string {
	const rel = path.relative(CONTENT_DIR, filePath);
	const firstSegment = rel.split("/")[0];

	if (!firstSegment) return "Getting Started";

	const categories: Record<string, string> = {
		components: "Components",
		installation: "Installation",
		migration: "Migration",
		"dark-mode": "Dark Mode",
		registry: "Registry",
		changelog: "Changelog",
	};

	if (!rel.includes("/") || firstSegment.endsWith(".md")) {
		return "Getting Started";
	}

	return categories[firstSegment] ?? "Getting Started";
}

function parseIntoSections(
	body: string,
	pageTitle: string,
	pageHref: string,
	category: string,
	description: string
): SearchEntry[] {
	const entries: SearchEntry[] = [];

	// Split on heading lines (h1–h4)
	const lines = body.split("\n");
	const sections: { heading: string | null; level: number; lines: string[] }[] = [];
	let current: { heading: string | null; level: number; lines: string[] } = {
		heading: null,
		level: 0,
		lines: [],
	};

	for (const line of lines) {
		const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
		if (headingMatch) {
			sections.push(current);
			current = {
				heading: headingMatch[2].trim(),
				level: headingMatch[1].length,
				lines: [],
			};
		} else {
			current.lines.push(line);
		}
	}
	sections.push(current);

	let currentAnchor: string;

	for (const section of sections) {
		if (section.heading === null) {
			// Intro text before first heading — index as 'page' entry
			const introText = cleanText(section.lines.join("\n"));
			if (introText.trim().length > 10) {
				entries.push({
					title: pageTitle,
					description,
					content: introText,
					href: pageHref,
					category,
					type: "page",
					pageTitle,
				});
			}
			continue;
		}

		const headingText = cleanText(section.heading);
		if (!headingText.trim()) continue;

		const anchor = slugify(headingText);
		currentAnchor = anchor;
		const href = `${pageHref}#${anchor}`;

		// Add heading entry
		entries.push({
			title: headingText,
			description: "",
			content: headingText,
			href,
			category,
			type: "heading",
			pageTitle,
		});

		// Add text entries for paragraphs under this heading
		const paragraphs = splitParagraphs(section.lines.join("\n"));

		for (const para of paragraphs) {
			const title = para.length > 120 ? para.slice(0, 120) + "…" : para;
			entries.push({
				title,
				description: "",
				content: para,
				href: `${pageHref}#${currentAnchor}`,
				category,
				type: "text",
				pageTitle,
			});
		}
	}

	return entries;
}

export async function buildSearchData(): Promise<SearchEntry[]> {
	const files = await globby("**/*.md", { cwd: CONTENT_DIR, absolute: true });

	const entries: SearchEntry[] = [];

	for (const file of files) {
		const raw = fs.readFileSync(file, "utf-8");
		const { title, description, body } = parseFrontmatter(raw);

		if (!title) continue;

		const href = deriveHref(file);
		const category = deriveCategory(file);

		const sections = parseIntoSections(body, title, href, category, description);
		entries.push(...sections);
	}

	return entries;
}

async function writeSearchData() {
	const entries = await buildSearchData();
	const outputDir = path.dirname(OUTPUT_PATH);
	fs.mkdirSync(outputDir, { recursive: true });

	fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2));
	console.log(`Built search index with ${entries.length} entries → ${OUTPUT_PATH}`);
}

async function watchContentDirectory() {
	const directories = await globby("**", {
		cwd: CONTENT_DIR,
		absolute: true,
		onlyDirectories: true,
	});
	let buildTimeout: NodeJS.Timeout | undefined;

	const rebuild = () => {
		if (buildTimeout) clearTimeout(buildTimeout);
		buildTimeout = setTimeout(() => {
			writeSearchData().catch((error) => {
				console.error("❌ Search index build failed:", error);
			});
		}, 100);
	};

	for (const directory of [CONTENT_DIR, ...directories]) {
		fs.watch(directory, (_, filename) => {
			if (!filename?.endsWith(".md")) return;
			rebuild();
		});
	}
}

const isWatchMode = process.argv.includes("--watch");
const isCliRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isCliRun) {
	if (isWatchMode) {
		await writeSearchData();
		await watchContentDirectory();
	} else {
		await writeSearchData();
	}
}
