type CommentRange = { start: number; end: number; text: string };

export function parseParityIgnore(text: string): { file: boolean; reason: string } | undefined {
	const match = text.match(/^\s*parity-ignore(-file)?:\s*(\S.*?)\s*$/);
	if (!match) return undefined;
	return { file: Boolean(match[1]), reason: match[2]!.trim() };
}

export function findCommentRanges(content: string): CommentRange[] {
	const ranges: CommentRange[] = [];
	for (const match of content.matchAll(/<!--([\s\S]*?)-->/g)) {
		ranges.push({ start: match.index, end: match.index + match[0].length, text: match[1] ?? "" });
	}
	for (const match of content.matchAll(/\/\*([\s\S]*?)\*\//g)) {
		ranges.push({ start: match.index, end: match.index + match[0].length, text: match[1] ?? "" });
	}
	for (const match of content.matchAll(/(?<!:)\/\/(.*)$/gm)) {
		ranges.push({ start: match.index, end: match.index + match[0].length, text: match[1] ?? "" });
	}
	return ranges.sort((a, b) => a.start - b.start);
}

/**
 * Remove `parity-ignore` / `parity-ignore-file` comments from published
 * registry output. Other comments are left untouched.
 */
export function stripParityIgnoreComments(content: string): string {
	return content
		.replace(/^[ \t]*<!--([\s\S]*?)-->[ \t]*(?:\r?\n)?/gm, (full, inner: string) =>
			parseParityIgnore(inner) ? "" : full
		)
		.replace(/^[ \t]*\/\*([\s\S]*?)\*\/[ \t]*(?:\r?\n)?/gm, (full, inner: string) =>
			parseParityIgnore(inner) ? "" : full
		)
		.replace(/^[ \t]*\/\/(.*)(?:\r?\n)?/gm, (full, inner: string) =>
			parseParityIgnore(inner) ? "" : full
		);
}
