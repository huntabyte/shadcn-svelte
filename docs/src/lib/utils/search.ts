import { Index, type Id } from "flexsearch";

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

let titleIndex: Index;
let contentIndex: Index;
let content: SearchContent[] = [];

export function createContentIndex(data: SearchContent[]) {
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
	let highlighted = text;

	for (const word of words) {
		const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
		highlighted = highlighted.replace(regex, "<mark>$1</mark>");
	}

	return highlighted;
}

function substringMatch(text: string, query: string): boolean {
	return text.toLowerCase().includes(query.toLowerCase());
}

export function searchContentIndex(query: string): SearchResult[] {
	if (!query.trim()) return [];

	const titleResults = titleIndex.search(query, { limit: 20 });
	const contentResults = contentIndex.search(query, { limit: 20 });

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
			if (substringMatch(item.title, query)) {
				resultMap.set(idx, { score: 8, source: "substring-title" });
			} else if (
				substringMatch(item.content, query) ||
				substringMatch(item.description, query)
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
		const snippet = getContentSnippet(item.content, query);
		return {
			...item,
			snippet: highlightMatches(snippet, query),
			highlights: query
				.toLowerCase()
				.split(/\s+/)
				.filter((w) => w.length > 1),
		};
	});
}
