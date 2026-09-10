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
 *
 * Comments that occupy a whole line are removed along with the line.
 * Trailing comments are removed together with the whitespace before them,
 * leaving the code on that line intact.
 */
export function stripParityIgnoreComments(content: string): string {
	const stripIfIgnore = (full: string, inner: string) => (parseParityIgnore(inner) ? "" : full);
	return content
		.replace(/^[ \t]*<!--([\s\S]*?)-->[ \t]*(?:\r?\n)?/gm, stripIfIgnore)
		.replace(/^[ \t]*\/\*([\s\S]*?)\*\/[ \t]*(?:\r?\n)?/gm, stripIfIgnore)
		.replace(/^[ \t]*\/\/(.*)(?:\r?\n)?/gm, stripIfIgnore)
		.replace(/[ \t]*<!--([\s\S]*?)-->/g, stripIfIgnore)
		.replace(/[ \t]*\/\*([\s\S]*?)\*\//g, stripIfIgnore)
		.replace(/[ \t]*(?<!:)\/\/(.*)$/gm, stripIfIgnore);
}
