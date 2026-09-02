import type { Id } from "flexsearch";

export type SearchContent = {
	title: string;
	content: string;
	description: string;
	href: string;
	category: string;
	type: "page" | "heading" | "text";
	pageTitle: string;
};

export type SearchResult = SearchContent & {
	snippet?: string;
	highlights?: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let titleIndex: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let contentIndex: any;
let content: SearchContent[] = [];

export async function createContentIndex(data: SearchContent[]) {
	// import.meta.env.SSR is replaced with `true` at build time, so rolldown
	// eliminates the dynamic import below as dead code — flexsearch never
	// enters the server/worker bundle.
	if (import.meta.env.SSR) return;

	const { Index } = await import("flexsearch");

	titleIndex = new Index({
		tokenize: "forward",
		resolution: 9,
	});

	contentIndex = new Index({
		tokenize: "forward",
		resolution: 5,
	});

	data.forEach((item, i) => {
		titleIndex.add(i, item.title);
		contentIndex.add(i, `${item.content} ${item.description}`);
	});

	content = data;
}

function getContentSnippet(text: string, query: string, maxLength = 150): string {
	const words = query.toLowerCase().split(/\s+/);
	const textLower = text.toLowerCase();

	let bestIndex = -1;

	for (const word of words) {
		const index = textLower.indexOf(word);
		if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
			bestIndex = index;
		}
	}

	if (bestIndex === -1) {
		return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
	}

	const start = Math.max(0, bestIndex - Math.floor(maxLength / 2));
	const end = Math.min(text.length, start + maxLength);
	const snippet = text.slice(start, end);

	return (start > 0 ? "..." : "") + snippet + (end < text.length ? "..." : "");
}

function highlightMatches(text: string, query: string): string {
	const words = query
		.toLowerCase()
		.split(/\s+/)
		.filter((w) => w.length > 1);
	if (words.length === 0) return escapeHtml(text);

	const escapedWords = words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
	const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");
	const matches = new Set(words);

	return text
		.split(regex)
		.map((part) =>
			matches.has(part.toLowerCase()) ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)
		)
		.join("");
}

function escapeHtml(text: string): string {
	return text
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function substringMatch(text: string, query: string): boolean {
	return text.toLowerCase().includes(query.toLowerCase());
}

export function searchContentIndex(query: string): SearchResult[] {
	const normalizedQuery = query.trim();
	if (!normalizedQuery) return [];
	if (!titleIndex || !contentIndex) return [];

	const titleResults = titleIndex.search(normalizedQuery, { limit: 20 });
	const contentResults = contentIndex.search(normalizedQuery, { limit: 20 });

	const resultMap = new Map<Id, { score: number; source: string }>();

	for (const id of titleResults) {
		resultMap.set(id, { score: 10, source: "title" });
	}

	for (const id of contentResults) {
		const existing = resultMap.get(id);
		if (existing) {
			existing.score += 5;
		} else {
			resultMap.set(id, { score: 5, source: "content" });
		}
	}

	if (resultMap.size === 0) {
		content.forEach((item, idx) => {
			if (substringMatch(item.title, normalizedQuery)) {
				resultMap.set(idx, { score: 8, source: "substring-title" });
			} else if (
				substringMatch(item.content, normalizedQuery) ||
				substringMatch(item.description, normalizedQuery)
			) {
				resultMap.set(idx, { score: 3, source: "substring-content" });
			}
		});
	}

	const sortedResults = Array.from(resultMap.entries())
		.sort(([, a], [, b]) => b.score - a.score)
		.slice(0, 10);

	return sortedResults.map(([idx]) => {
		const item = content[idx as number];
		const snippet = getContentSnippet(item.content, normalizedQuery);
		return {
			...item,
			snippet: highlightMatches(snippet, normalizedQuery),
			highlights: normalizedQuery
				.toLowerCase()
				.split(/\s+/)
				.filter((w) => w.length > 1),
		};
	});
}
