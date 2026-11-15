type CommentRange = { start: number; end: number; text: string };

export function parseParityIgnore(text: string): { file: boolean; reason: string } | undefined {
	const match = text.match(/^\s*parity-ignore(-file)?:\s*(\S.*?)\s*$/);
	if (!match) return undefined;
	return { file: Boolean(match[1]), reason: match[2]!.trim() };
}

/**
 * `parity-ignore-upstream: <tokens> | <reason>` records upstream tokens that our
 * port deliberately does not carry. Unlike `parity-ignore`, which covers a class
 * string in our source, this one names the upstream side, which has no file of
 * ours to hang a comment on. The declaration is file-wide within the item.
 */
export function parseParityIgnoreUpstream(
	text: string
): { tokens: string[]; reason: string } | undefined {
	const match = text.match(/^\s*parity-ignore-upstream:\s*(\S[\s\S]*?)\s*$/);
	if (!match) return undefined;
	const separator = match[1]!.indexOf("|");
	if (separator === -1) return undefined;
	const tokens = match[1]!.slice(0, separator).trim().split(/\s+/).filter(Boolean);
	const reason = match[1]!.slice(separator + 1).trim();
	if (tokens.length === 0 || reason === "") return undefined;
	return { tokens, reason };
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
 * Remove `parity-ignore`, `parity-ignore-file` and `parity-ignore-upstream`
 * comments from published registry output. Other comments are left untouched.
 *
 * Comments that occupy a whole line are removed along with the line.
 * Trailing comments are removed together with the whitespace before them,
 * leaving the code on that line intact.
 */
export function stripParityIgnoreComments(content: string): string {
	const stripIfIgnore = (full: string, inner: string) =>
		parseParityIgnore(inner) || parseParityIgnoreUpstream(inner) ? "" : full;
	return content
		.replace(/^[ \t]*<!--([\s\S]*?)-->[ \t]*(?:\r?\n)?/gm, stripIfIgnore)
		.replace(/^[ \t]*\/\*([\s\S]*?)\*\/[ \t]*(?:\r?\n)?/gm, stripIfIgnore)
		.replace(/^[ \t]*\/\/(.*)(?:\r?\n)?/gm, stripIfIgnore)
		.replace(/[ \t]*<!--([\s\S]*?)-->/g, stripIfIgnore)
		.replace(/[ \t]*\/\*([\s\S]*?)\*\//g, stripIfIgnore)
		.replace(/[ \t]*(?<!:)\/\/(.*)$/gm, stripIfIgnore);
}
