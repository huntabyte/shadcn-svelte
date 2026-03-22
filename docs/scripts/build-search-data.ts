import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";
import removeMd from "remove-markdown";

const CONTENT_DIR = path.resolve(import.meta.dirname, "../content");
const OUTPUT_PATH = path.resolve(import.meta.dirname, "../src/routes/api/search.json/search.json");

type SearchEntry = {
	title: string;
	description: string;
	content: string;
	href: string;
	category: string;
	type: "page" | "heading" | "text";
	pageTitle: string;
};

function parseFrontmatter(raw: string): { title: string; description: string; body: string } {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
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
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();
}

function cleanText(raw: string): string {
	// Remove <script> blocks
	let content = raw.replace(/<script[\s\S]*?<\/script>/gi, "");
	// Remove HTML/Svelte tags
	content = content.replace(/<[^>]+>/g, " ");
	// Run remove-markdown (replaceLinksWithURL: false keeps display text, not URLs)
	content = removeMd(content, {
		replaceLinksWithURL: false,
		gfm: true,
		useImgAltText: true,
	});
	// Remove code blocks
	content = content.replace(/```[\s\S]*?```/g, "");
	content = content.replace(/`[^`]+`/g, "");
	// Clean up whitespace
	content = content.replace(/\s+/g, " ").trim();
	// Remove remaining markdown link syntax (keeps display text)
	content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
	content = content.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");

	return content;
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
		const bodyText = cleanText(section.lines.join("\n"));
		if (bodyText.trim().length > 20) {
			// Split into paragraphs (double newline in original = blank lines)
			const paragraphs = bodyText
				.split(/\s{2,}/)
				.map((p) => p.trim())
				.filter((p) => p.length > 20);

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
	}

	return entries;
}

async function main() {
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

	const outputDir = path.dirname(OUTPUT_PATH);
	fs.mkdirSync(outputDir, { recursive: true });

	fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2));
	console.log(`Built search index with ${entries.length} entries → ${OUTPUT_PATH}`);
}

main();
