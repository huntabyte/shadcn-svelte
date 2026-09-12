import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { styleText } from "node:util";
import { PRESET_STYLES } from "shadcn-svelte/preset";
import { twMerge } from "tailwind-merge";
import {
	findCommentRanges,
	parseParityIgnore,
	parseParityIgnoreUpstream,
} from "./parity-ignore.ts";

export type ParityRunOptions = {
	command: "base" | "variants" | "fix";
	item?: string;
	style?: string;
	verbose?: boolean;
	ignored?: boolean;
	includeSkipped?: boolean;
	check?: boolean;
	dryRun?: boolean;
	excludeRuntimeEquivalent?: boolean;
	refresh?: boolean;
	root?: string;
};

export function defaultDocsRoot(): string {
	return path.resolve(import.meta.dirname, "../../../docs");
}

let ROOT = defaultDocsRoot();
const CACHE_DIR = path.join(os.tmpdir(), "shadcn-svelte-upstream-registry");

/** Cached upstream files older than this are fetched again. */
export const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const UPSTREAM_VARIANT_BASE = "https://ui.shadcn.com/r/styles";
const UPSTREAM_BASE_RAW =
	"https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/registry/bases/radix/ui";
const JACCARD_THRESHOLD = 0.45;
const TAIL_JACCARD_THRESHOLD = 0.7;
const GENERIC_TAILS = new Set([
	"flex",
	"grid",
	"block",
	"inline",
	"inline-flex",
	"hidden",
	"relative",
	"absolute",
	"truncate",
	"items-center",
	"justify-center",
	"justify-between",
	"w-full",
	"h-full",
	"w-fit",
	"size-4",
	"gap-2",
	"p-2",
	"overflow-hidden",
	"outline-none",
	"outline-hidden",
	"select-none",
	"pointer-events-none",
	"shrink-0",
	"grow",
]);
const ALLOWLIST_CN = new Set([
	"cn-menu-target",
	"cn-menu-translucent",
	"cn-logical-sides",
	"cn-rtl-flip",
	"cn-font-heading",
]);

/** Ports that diverge too much from Radix to be useful in this class-string compare. */
const SKIP_STRUCTURAL_ITEMS = new Set(["calendar", "range-calendar", "chart"]);

const NAME_ALIASES: [RegExp, string][] = [
	[/Pane(?!l)/g, "Panel"],
	[/GroupHeading$/g, "Label"],
];

export function toPascalCase(value: string): string {
	return value
		.split(/[^a-zA-Z0-9]+/)
		.filter(Boolean)
		.map((part) => part[0]!.toUpperCase() + part.slice(1))
		.join("");
}

export function extractUpstreamComponentNames(content: string): Set<string> {
	const names = new Set<string>();
	for (const match of content.matchAll(
		/\b(?:export\s+)?(?:async\s+)?(?:function|const)\s+([A-Z][A-Za-z0-9]*)\b/g
	)) {
		names.add(match[1]!);
	}
	for (const match of content.matchAll(/\bexport\s*\{([^}]+)\}/g)) {
		for (const part of match[1]!.split(",")) {
			const identifiers = part.split(/\bas\s+/).map((token) => token.trim());
			for (const name of identifiers) {
				if (/^[A-Z][A-Za-z0-9]*$/.test(name)) names.add(name);
			}
		}
	}
	return names;
}

function isRootSourceFile(item: string, filePath: string): boolean {
	const base = path.basename(filePath);
	return base === `${item}.svelte` || base === `${item}.ts` || base === `${item}.js`;
}

function applyNameAliases(name: string): string {
	let next = name;
	for (const [pattern, replacement] of NAME_ALIASES) {
		next = next.replace(pattern, replacement);
	}
	return next;
}

function componentRemainder(componentName: string, itemPascal: string): string {
	if (
		componentName.length > itemPascal.length &&
		componentName.toLowerCase().startsWith(itemPascal.toLowerCase())
	) {
		return componentName.slice(itemPascal.length);
	}
	return componentName;
}

function namesEquivalent(filePascal: string, upstreamName: string, itemPascal: string): boolean {
	if (filePascal.toLowerCase() === upstreamName.toLowerCase()) return true;
	const fileRemainder = applyNameAliases(componentRemainder(filePascal, itemPascal));
	const upstreamRemainder = applyNameAliases(componentRemainder(upstreamName, itemPascal));
	return fileRemainder.toLowerCase() === upstreamRemainder.toLowerCase();
}

/** True when this source file is a shared port of an upstream component. */
export function sourceFileHasUpstreamCounterpart(
	filePath: string,
	item: string,
	upstreamNames: Set<string>
): boolean {
	if (isRootSourceFile(item, filePath)) return true;
	const filePascal = toPascalCase(path.basename(filePath).replace(/\.(svelte|ts|js)$/, ""));
	if (!filePascal) return false;
	const itemPascal = toPascalCase(item);
	for (const name of upstreamNames) {
		if (namesEquivalent(filePascal, name, itemPascal)) return true;
	}
	return false;
}

let verbose = false;
let showIgnored = false;
let includeSkipped = false;
let check = false;
let dryRun = false;
let excludeRuntimeEquivalent = true;
let styleFilter: string | undefined;
let itemFilter: string | undefined;
let styles: string[] = [...PRESET_STYLES];
let isFix = false;
let refresh = false;
let mode: "base" | "variants" = "base";

type RegistryFile = { content?: string; target?: string };
type RegistryItem = { name?: string; files?: RegistryFile[] };
type IndexItem = { name: string; type: string };

type SourceLocation = { path: string; line: number };

export type ClassString = {
	merged: string;
	tokens: string[];
	key: string;
	runtimeKey: string;
	ignoredReason?: string;
	ignoredComment?: string;
	ignoredFile?: boolean;
	ignoredTokens?: string[];
	source?: SourceLocation;
};

export type PairKind =
	| "exact"
	| "order"
	| "equivalent"
	| "ignored"
	| "allowlist"
	| "framework"
	| "diff";

type KindCounts = Record<PairKind, number>;

export type Pair = {
	kind: PairKind;
	ours?: ClassString;
	upstream?: ClassString;
	added: string[];
	removed: string[];
};

function emptyCounts(): KindCounts {
	return {
		exact: 0,
		order: 0,
		equivalent: 0,
		ignored: 0,
		allowlist: 0,
		framework: 0,
		diff: 0,
	};
}

function totalPairs(counts: KindCounts): number {
	return (
		counts.exact +
		counts.order +
		counts.equivalent +
		counts.ignored +
		counts.allowlist +
		counts.framework +
		counts.diff
	);
}

export function parityPercent(counts: KindCounts): number {
	const total = totalPairs(counts);
	if (total === 0) return 100;
	return Math.round(((total - counts.diff) / total) * 1000) / 10;
}

type TableColumn = { key: string; header: string; align?: "left" | "right" };

export function offsetToLine(content: string, offset: number): number {
	let line = 1;
	const end = Math.min(Math.max(offset, 0), content.length);
	for (let i = 0; i < end; i++) {
		if (content[i] === "\n") line++;
	}
	return line;
}

export function formatSourceLocation(source?: SourceLocation): string {
	if (!source) return "";
	return `${source.path}:${source.line}`;
}

export function formatTable(rows: Record<string, string>[], columns: TableColumn[]): string {
	if (rows.length === 0) return "";
	const widths = columns.map((column) =>
		Math.max(column.header.length, ...rows.map((row) => (row[column.key] ?? "").length))
	);
	const line = (cells: string[]) =>
		`| ${cells
			.map((cell, index) =>
				columns[index]!.align === "right"
					? cell.padStart(widths[index]!)
					: cell.padEnd(widths[index]!)
			)
			.join(" | ")} |`;
	return [
		line(columns.map((column) => column.header)),
		`| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`,
		...rows.map((row) => line(columns.map((column) => row[column.key] ?? ""))),
	].join("\n");
}

function isPresetStyle(value: string): value is (typeof PRESET_STYLES)[number] {
	return (PRESET_STYLES as readonly string[]).includes(value);
}

export function parseItemArg(raw: string | undefined): { style?: string; item?: string } {
	if (!raw) return {};
	const slash = raw.indexOf("/");
	if (slash === -1) return { item: raw };
	const maybeStyle = raw.slice(0, slash);
	const maybeItem = raw.slice(slash + 1);
	if (isPresetStyle(maybeStyle) && maybeItem && !maybeItem.includes("/")) {
		return { style: maybeStyle, item: maybeItem };
	}
	return { item: raw };
}

function toTailwindArbitraryCalc(value: string): string {
	return value.replace(/\[calc\(([^[\]]+)\)\]/g, (_match, expr: string) => {
		const spaced = expr
			.replaceAll("_", " ")
			.replace(/(?<=[\w%)])\s*([+*/-])\s*(?=\S)/g, " $1 ")
			.replace(/\s+/g, " ")
			.trim();
		return `[calc(${spaced.replaceAll(" ", "_")})]`;
	});
}

function tokenize(raw: string): string[] {
	return raw.trim().split(/\s+/).filter(Boolean);
}

function canonicalizeLogicalSides(token: string): string {
	return token.replace(/\[(?:[^\]]*)\]|[^[]+/g, (chunk) => {
		if (chunk.startsWith("[")) return chunk;
		return chunk
			.replaceAll("rounded-tl-", "rounded-ss-")
			.replaceAll("rounded-tr-", "rounded-se-")
			.replaceAll("rounded-bl-", "rounded-es-")
			.replaceAll("rounded-br-", "rounded-ee-")
			.replaceAll("rounded-l-", "rounded-s-")
			.replaceAll("rounded-r-", "rounded-e-")
			.replaceAll("scroll-pl-", "scroll-ps-")
			.replaceAll("scroll-pr-", "scroll-pe-")
			.replaceAll("scroll-ml-", "scroll-ms-")
			.replaceAll("scroll-mr-", "scroll-me-")
			.replaceAll("text-left", "text-start")
			.replaceAll("text-right", "text-end")
			.replaceAll("float-left", "float-start")
			.replaceAll("float-right", "float-end")
			.replaceAll("clear-left", "clear-start")
			.replaceAll("clear-right", "clear-end")
			.replace(/(^|[^a-z-])border-l(?![a-z])/g, "$1border-s")
			.replace(/(^|[^a-z-])border-r(?![a-z])/g, "$1border-e")
			.replace(/(^|[^a-z-])pl-/g, "$1ps-")
			.replace(/(^|[^a-z-])pr-/g, "$1pe-")
			.replace(/(^|[^a-z-])ml-/g, "$1ms-")
			.replace(/(^|[^a-z-])mr-/g, "$1me-")
			.replace(/(^|[^a-z-])-left-/g, "$1-start-")
			.replace(/(^|[^a-z-])-right-/g, "$1-end-")
			.replace(/(^|[^a-z-])left-/g, "$1start-")
			.replace(/(^|[^a-z-])right-/g, "$1end-");
	});
}

function canonicalizeStateVariants(token: string): string {
	return token
		.replace(/data-\[state=open\](?=[:/])/g, "data-open")
		.replace(/data-\[state=closed\](?=[:/])/g, "data-closed")
		.replace(/data-\[state=checked\](?=[:/])/g, "data-checked")
		.replace(/data-\[state=unchecked\](?=[:/])/g, "data-unchecked")
		.replace(/data-\[state=active\](?=[:/])/g, "data-active")
		.replace(/data-\[state=selected\](?=[:/])/g, "data-selected")
		.replace(/data-\[selected=true\](?=[:/])/g, "data-selected")
		.replace(/data-\[checked=true\](?=[:/])/g, "data-checked")
		.replace(/data-\[disabled=true\](?=[:/])/g, "data-disabled")
		.replace(/aria-selected(?=:)/g, "data-selected")
		.replace(/aria-checked(?=:)/g, "data-checked");
}

export function canonicalizeRuntimeToken(token: string): string {
	return canonicalizeLogicalSides(
		canonicalizeStateVariants(
			toTailwindArbitraryCalc(token)
				.replace(/group-data-horizontal\//g, "group-data-[orientation=horizontal]/")
				.replace(/group-data-vertical\//g, "group-data-[orientation=vertical]/")
				.replace(/peer-data-horizontal\//g, "peer-data-[orientation=horizontal]/")
				.replace(/peer-data-vertical\//g, "peer-data-[orientation=vertical]/")
				.replace(/has-data-horizontal:/g, "has-data-[orientation=horizontal]:")
				.replace(/has-data-vertical:/g, "has-data-[orientation=vertical]:")
				.replace(/group-has-data-horizontal\//g, "group-has-[[data-orientation=horizontal]]/")
				.replace(/group-has-data-vertical\//g, "group-has-[[data-orientation=vertical]]/")
				.replace(/(^|[^[\w-])data-horizontal:/g, "$1data-[orientation=horizontal]:")
				.replace(/(^|[^[\w-])data-vertical:/g, "$1data-[orientation=vertical]:")
				.replace(/data-\[direction=(horizontal|vertical)\]/g, "data-[orientation=$1]")
				.replace(/aria-\[orientation=(horizontal|vertical)\]/g, "data-[orientation=$1]")
				.replace(/\[data-direction=(horizontal|vertical)\]/g, "[data-orientation=$1]")
				.replace(/\[aria-orientation=(horizontal|vertical)\]/g, "[data-orientation=$1]")
				.replace(/(^|:)(\*:)/g, "$1[&>*]:")
				.replace(/z-\[1\]/g, "z-1")
		)
	);
}

function runtimeKey(tokens: string[]): string {
	return [...tokens.map(canonicalizeRuntimeToken)].sort().join(" ");
}

function normalizeClassString(raw: string): ClassString {
	const merged = raw === "" ? "" : twMerge(raw);
	const tokens = tokenize(merged);
	return { merged, tokens, key: [...tokens].sort().join(" "), runtimeKey: runtimeKey(tokens) };
}

function printPairLabel(label: string, pair: Pair) {
	const location = formatSourceLocation(pair.ours?.source);
	console.log(location ? `  ${label}  ${location}` : `  ${label}`);
}

export function formatIgnoredComment(
	entry: Pick<ClassString, "ignoredReason" | "ignoredComment" | "ignoredFile">
): string | undefined {
	const trimmed = entry.ignoredComment?.trim();
	if (trimmed) return trimmed;
	if (!entry.ignoredReason) return undefined;
	return entry.ignoredFile
		? `parity-ignore-file: ${entry.ignoredReason}`
		: `parity-ignore: ${entry.ignoredReason}`;
}

function printClassDiff(pair: Pair) {
	if (pair.kind === "ignored") {
		const entry = pair.ours?.ignoredReason ? pair.ours : (pair.upstream ?? pair.ours);
		const comment = entry ? formatIgnoredComment(entry) : undefined;
		if (comment) console.log(`    ${styleText("dim", comment)}`);
	}
	if (pair.removed.length) {
		console.log(`    - ${styleText("red", pair.removed.join(" "))}`);
	}
	if (pair.added.length) {
		console.log(`    + ${styleText("green", pair.added.join(" "))}`);
	}
}

export function toSourceToken(token: string): string {
	return canonicalizeLogicalSides(
		canonicalizeStateVariants(toTailwindArbitraryCalc(token))
			.replace(/data-\[orientation=(horizontal|vertical)\]/g, "data-$1")
			.replace(/aria-\[orientation=(horizontal|vertical)\]/g, "data-$1")
			.replace(/group-data-\[orientation=(horizontal|vertical)\]/g, "group-data-$1")
			.replace(/peer-data-\[orientation=(horizontal|vertical)\]/g, "peer-data-$1")
			.replace(/has-data-\[orientation=(horizontal|vertical)\]/g, "has-data-$1")
	);
}

export function fixClassString(raw: string, added: string[], removed: string[]): string {
	const filtered = dropRuntimeEquivalentDiffs(added, removed);
	const canonicalAdded = new Set(filtered.added.map(canonicalizeRuntimeToken));
	const kept = tokenize(raw).filter((token) => {
		if (shouldKeepSourceToken(token)) return true;
		return !canonicalAdded.has(canonicalizeRuntimeToken(token));
	});
	const existing = new Set(kept.map(canonicalizeRuntimeToken));
	for (const token of filtered.removed) {
		if (isFrameworkToken(token)) continue;
		const sourceToken = toSourceToken(token);
		if (existing.has(canonicalizeRuntimeToken(sourceToken))) continue;
		kept.push(sourceToken);
		existing.add(canonicalizeRuntimeToken(sourceToken));
	}
	return kept.join(" ");
}

function inRanges(pos: number, ranges: ReturnType<typeof findCommentRanges>): boolean {
	return ranges.some((range) => pos >= range.start && pos < range.end);
}

function looksLikeClassList(raw: string): boolean {
	if (!raw || raw.startsWith("<") || raw.startsWith("on:")) return false;
	if (/^(https?:|\.?\.?\/|\$|[A-Z@])/u.test(raw)) return false;
	if (raw.includes(".js") || raw.includes(".svelte") || raw.includes(".ts")) return false;
	if (raw.includes("$lib") || raw.includes("$UI") || raw.includes("$UTILS")) return false;
	if (/^[a-z0-9-]+\/[a-z0-9-]+$/i.test(raw) && !raw.includes(":")) return false;

	const tokens = tokenize(raw);
	if (tokens.length === 0) return false;
	const classTokens = tokens.filter(isClassToken);
	if (classTokens.length === 0) return false;
	if (tokens.length === 1) return isClassToken(tokens[0]!);
	return classTokens.length / tokens.length >= 0.6;
}

function isClassToken(token: string): boolean {
	if (token.startsWith("cn-")) return true;
	// `[data-embla-container]` is a CSS selector; Tailwind arbitrary
	// properties/variants always include `:` (`[--radius:1rem]`, `[&>svg]:size-4`).
	if (/^\[[^\]]+\]$/.test(token) && !token.includes(":")) return false;
	if (token.includes(":") || token.includes("[") || token.includes("]")) return true;
	if (/[@*!]/.test(token)) return true;
	if (token.includes("/") && /[-:]/.test(token)) return true;
	return /^(flex|grid|block|inline|inline-flex|inline-block|hidden|sr-only|truncate|relative|absolute|fixed|sticky|static|grow|shrink|italic|underline|overline|antialiased|outline-none|pointer-events-none|select-none|size-|min-|max-|w-|h-|p[xytblrse]?-|m[xytblrse]?-|gap-|inset-|top-|right-|bottom-|left-|start-|end-|z-|overflow-|overscroll-|scroll-|snap-|items-|justify-|content-|self-|place-|text-|font-|leading-|tracking-|bg-|border|rounded|shadow|opacity-|ring|outline-|transition|duration-|ease-|delay-|animate-|cursor-|select-|group|peer|shimmer|dark$)/.test(
		token
	);
}

export function extractClassStrings(content: string): ClassString[] {
	return dedupeClassStrings(
		withEmptyClassSentinel(
			content,
			extractOccurrences(content).map((item) => item.entry)
		)
	);
}

type ClassFragment = {
	start: number;
	end: number;
	raw: string;
	ignored?: boolean;
};

type ClassOccurrence = {
	start: number;
	end: number;
	raw: string;
	entry: ClassString;
	fragments: ClassFragment[];
};

function extractOccurrences(content: string): ClassOccurrence[] {
	const comments = findCommentRanges(content);
	const fileIgnoreComment = comments.find((comment) => parseParityIgnore(comment.text)?.file);
	const fileIgnore = fileIgnoreComment
		? {
				reason: parseParityIgnore(fileIgnoreComment.text)!.reason,
				comment: content.slice(fileIgnoreComment.start, fileIgnoreComment.end),
				file: true as const,
			}
		: undefined;
	const nextIgnores = comments
		.map((comment) => {
			const ignore = parseParityIgnore(comment.text);
			if (!ignore || ignore.file) return undefined;
			return {
				end: comment.end,
				reason: ignore.reason,
				comment: content.slice(comment.start, comment.end),
			};
		})
		.filter((ignore): ignore is { end: number; reason: string; comment: string } =>
			Boolean(ignore)
		);

	const quoted = /(?<!\\)"((?:[^"\\]|\\.)*)"/g;
	const extracted: ClassOccurrence[] = [];
	for (const match of content.matchAll(quoted)) {
		if (inRanges(match.index, comments)) continue;
		const raw = match[1]!.replace(/\\"/g, '"');
		if (!looksLikeClassList(raw)) continue;
		extracted.push({
			start: match.index,
			end: match.index + match[0].length,
			raw,
			fragments: [
				{
					start: match.index,
					end: match.index + match[0].length,
					raw,
				},
			],
			entry: normalizeClassString(raw),
		});
	}

	for (const [index, item] of extracted.entries()) {
		const previousStart = index === 0 ? 0 : extracted[index - 1]!.start;
		const ignore = [...nextIgnores]
			.reverse()
			.find((candidate) => candidate.end <= item.start && candidate.end >= previousStart);
		if (fileIgnore) {
			item.entry = {
				...item.entry,
				ignoredReason: fileIgnore.reason,
				ignoredComment: fileIgnore.comment,
				ignoredFile: true,
			};
			item.fragments[0]!.ignored = true;
		} else if (ignore) {
			item.entry = {
				...item.entry,
				ignoredReason: ignore.reason,
				ignoredComment: ignore.comment,
			};
			item.fragments[0]!.ignored = true;
		}
	}

	return mergeClassOccurrences(extracted, content, comments);
}

function textWithoutComments(
	content: string,
	start: number,
	end: number,
	comments: ReturnType<typeof findCommentRanges>
): string {
	let out = "";
	for (let i = start; i < end; i++) {
		if (!inRanges(i, comments)) out += content[i];
	}
	return out;
}

function mergeClassOccurrences(
	extracted: ClassOccurrence[],
	content: string,
	comments: ReturnType<typeof findCommentRanges>
): ClassOccurrence[] {
	if (extracted.length === 0) return [];
	const groups: ClassOccurrence[][] = [];
	let group = [extracted[0]!];
	for (let i = 1; i < extracted.length; i++) {
		const prev = extracted[i - 1]!;
		const next = extracted[i]!;
		const gap = textWithoutComments(content, prev.end, next.start, comments);
		if (
			canConcatenateFragments(
				group.map((item) => item.raw).join(" "),
				next.raw,
				gap,
				hasParityIgnoreBetween(comments, prev.end, next.start)
			)
		) {
			group.push(next);
		} else {
			groups.push(group);
			group = [next];
		}
	}
	groups.push(group);
	return groups.map(finalizeClassGroup);
}

function cnTokensIn(raw: string): string[] {
	return [...new Set(raw.match(/cn-[\w-]+/g) ?? [])];
}

function hasParityIgnoreBetween(
	comments: ReturnType<typeof findCommentRanges>,
	start: number,
	end: number
): boolean {
	return comments.some((comment) => {
		const ignore = parseParityIgnore(comment.text);
		return Boolean(ignore && !ignore.file && comment.end > start && comment.end <= end);
	});
}

function canConcatenateFragments(
	groupRaw: string,
	nextRaw: string,
	gap: string,
	ignoredGap: boolean
): boolean {
	if (!ignoredGap || !/^[\s,]*$/.test(gap)) return false;
	const groupCn = cnTokensIn(groupRaw);
	const nextCn = cnTokensIn(nextRaw);
	if (groupCn.length > 0 && nextCn.some((token) => !groupCn.includes(token))) {
		return false;
	}
	return true;
}

function finalizeClassGroup(group: ClassOccurrence[]): ClassOccurrence {
	const first = group[0]!;
	const last = group[group.length - 1]!;
	const raw = group.map((item) => item.raw).join(" ");
	const fragments = group.flatMap((item) => item.fragments);
	const entry = normalizeClassString(raw);
	const fileIgnored = group.find((item) => item.entry.ignoredFile)?.entry;
	if (fileIgnored) {
		return {
			start: first.start,
			end: last.end,
			raw,
			fragments,
			entry: {
				...entry,
				ignoredReason: fileIgnored.ignoredReason,
				ignoredComment: fileIgnored.ignoredComment,
				ignoredFile: true,
			},
		};
	}
	const ignoredFragments = group.filter((item) => item.entry.ignoredReason);
	if (ignoredFragments.length === 0) {
		return { start: first.start, end: last.end, raw, fragments, entry };
	}
	const ignoredReason = [
		...new Set(ignoredFragments.map((item) => item.entry.ignoredReason).filter(Boolean)),
	].join("; ");
	const ignoredComment = ignoredFragments[0]?.entry.ignoredComment;
	if (ignoredFragments.length === group.length) {
		return {
			start: first.start,
			end: last.end,
			raw,
			fragments,
			entry: { ...entry, ignoredReason, ignoredComment },
		};
	}
	return {
		start: first.start,
		end: last.end,
		raw,
		fragments,
		entry: {
			...entry,
			ignoredReason,
			ignoredComment,
			ignoredTokens: ignoredFragments.flatMap((item) => tokenize(item.raw)),
		},
	};
}

function withEmptyClassSentinel(content: string, entries: ClassString[]): ClassString[] {
	if (/\w+\s*:\s*""/.test(content) && !entries.some((entry) => entry.key === "")) {
		return [...entries, { merged: "", tokens: [], key: "", runtimeKey: "" }];
	}
	return entries;
}

function dedupeClassStrings(entries: ClassString[]): ClassString[] {
	const seen = new Map<string, ClassString>();
	for (const entry of entries) {
		const existing = seen.get(entry.key);
		if (!existing) {
			seen.set(entry.key, entry);
		} else if (!entry.ignoredReason) {
			seen.set(entry.key, entry);
		}
	}
	return [...seen.values()];
}

function copyIgnore(from: ClassString, to: ClassString): ClassString {
	if (!from.ignoredReason) return to;
	return {
		...to,
		ignoredReason: from.ignoredReason,
		ignoredComment: from.ignoredComment,
		ignoredFile: from.ignoredFile,
		ignoredTokens: from.ignoredTokens,
	};
}

export function applySourceIgnores(jsonContent: string, sourceContent: string): ClassString[] {
	const comments = findCommentRanges(sourceContent);
	const fileIgnoreComment = comments.find((comment) => parseParityIgnore(comment.text)?.file);
	const fileIgnore = fileIgnoreComment ? parseParityIgnore(fileIgnoreComment.text) : undefined;

	const json = extractOccurrences(jsonContent);
	if (fileIgnore) {
		const ignoredComment = sourceContent.slice(fileIgnoreComment!.start, fileIgnoreComment!.end);
		for (const item of json) {
			item.entry = {
				...item.entry,
				ignoredReason: fileIgnore.reason,
				ignoredComment,
				ignoredFile: true,
			};
		}
		return dedupeClassStrings(
			withEmptyClassSentinel(
				jsonContent,
				json.map((item) => item.entry)
			)
		);
	}

	const source = extractOccurrences(sourceContent);
	if (json.length === source.length) {
		for (const [index, item] of json.entries()) {
			const from = source[index]?.entry;
			if (from?.ignoredReason) item.entry = copyIgnore(from, item.entry);
		}
	} else {
		const ignoredByKey = new Map<string, ClassString>();
		for (const item of source) {
			if (item.entry.ignoredReason && !ignoredByKey.has(item.entry.key)) {
				ignoredByKey.set(item.entry.key, item.entry);
			}
		}
		for (const item of json) {
			const from = ignoredByKey.get(item.entry.key);
			if (from) item.entry = copyIgnore(from, item.entry);
		}
	}
	applyIgnoredTokensFromSource(json, source);
	return dedupeClassStrings(
		withEmptyClassSentinel(
			jsonContent,
			json.map((item) => item.entry)
		)
	);
}

function applyIgnoredTokensFromSource(json: ClassOccurrence[], source: ClassOccurrence[]) {
	const ignored: { tokens: Set<string>; from: ClassString }[] = [];
	for (const item of source) {
		if (!item.entry.ignoredReason) continue;
		const tokens = item.entry.ignoredTokens?.length ? item.entry.ignoredTokens : item.entry.tokens;
		if (!tokens.length) continue;
		ignored.push({ tokens: new Set(tokens), from: item.entry });
	}
	if (ignored.length === 0) return;

	const tokenKey = (token: string) => canonicalizeRuntimeToken(token);
	for (const item of json) {
		if (item.entry.ignoredFile) continue;
		for (const candidate of ignored) {
			const ignoredKeys = new Set([...candidate.tokens].map(tokenKey));
			const overlap = item.entry.tokens.filter((token) => ignoredKeys.has(tokenKey(token)));
			if (overlap.length === 0) continue;
			if (overlap.length === item.entry.tokens.length || !candidate.from.ignoredTokens?.length) {
				item.entry = {
					...copyIgnore(candidate.from, item.entry),
					ignoredTokens: undefined,
				};
			} else {
				item.entry = {
					...copyIgnore(candidate.from, item.entry),
					ignoredTokens: overlap,
				};
			}
		}
	}
}

function resolveUiSourcePath(target: string): string | undefined {
	const candidates = [
		path.join(ROOT, "src/lib/registry/ui", target),
		path.join(ROOT, "src/lib/registry", target),
	];
	return candidates.find((candidate) => fs.existsSync(candidate));
}

function matchSourceOccurrence(
	ours: ClassString,
	jsonOccurrences: ClassOccurrence[],
	sourceOccurrences: ClassOccurrence[]
): ClassOccurrence | undefined {
	let index = jsonOccurrences.findIndex((occurrence) => occurrence.entry.key === ours.key);
	if (index === -1 || jsonOccurrences.length !== sourceOccurrences.length) {
		index = bestSourceIndex(sourceOccurrences, ours);
	}
	return index === -1 ? undefined : sourceOccurrences[index];
}

function withSourceLocation(
	entry: ClassString,
	relPath: string,
	source: string,
	jsonOccurrences: ClassOccurrence[],
	sourceOccurrences: ClassOccurrence[]
): ClassString {
	const occurrence = matchSourceOccurrence(entry, jsonOccurrences, sourceOccurrences);
	if (!occurrence) return entry;
	return { ...entry, source: { path: relPath, line: offsetToLine(source, occurrence.start) } };
}

function collectFromContent(content: string, relPath?: string): ClassString[] {
	const occurrences = extractOccurrences(content);
	return dedupeClassStrings(
		withEmptyClassSentinel(
			content,
			occurrences.map((item) =>
				relPath
					? {
							...item.entry,
							source: { path: relPath, line: offsetToLine(content, item.start) },
						}
					: item.entry
			)
		)
	);
}

function listUiSourceFiles(name: string): string[] {
	const dir = path.join(ROOT, "src/lib/registry/ui", name);
	if (!fs.existsSync(dir)) return [];
	const files: string[] = [];
	const walk = (current: string) => {
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const full = path.join(current, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (/\.(svelte|ts|js)$/.test(entry.name)) files.push(full);
		}
	};
	walk(dir);
	return files;
}

function loadOursBase(
	name: string,
	upstreamContent: string
): { entries: ClassString[]; upstreamIgnores: UpstreamIgnoreRule[] } {
	const upstreamNames = extractUpstreamComponentNames(upstreamContent);
	const seen = new Map<string, ClassString>();
	const upstreamIgnores: UpstreamIgnoreRule[] = [];
	for (const sourcePath of listUiSourceFiles(name)) {
		if (!sourceFileHasUpstreamCounterpart(sourcePath, name, upstreamNames)) continue;
		const content = fs.readFileSync(sourcePath, "utf8");
		upstreamIgnores.push(...collectUpstreamIgnores(content));
		for (const entry of collectFromContent(content, path.relative(ROOT, sourcePath))) {
			const existing = seen.get(entry.key);
			if (!existing) {
				seen.set(entry.key, entry);
			} else if (!entry.ignoredReason) {
				seen.set(entry.key, entry);
			} else if (!existing.source && entry.source) {
				seen.set(entry.key, { ...existing, source: entry.source });
			}
		}
	}
	return { entries: [...seen.values()], upstreamIgnores };
}

function extractItemContent(
	item: RegistryItem,
	name: string,
	upstreamContent: string
): { entries: ClassString[]; upstreamIgnores: UpstreamIgnoreRule[] } {
	const upstreamNames = extractUpstreamComponentNames(upstreamContent);
	const seen = new Map<string, ClassString>();
	const upstreamIgnores: UpstreamIgnoreRule[] = [];
	for (const file of item.files ?? []) {
		const checkPath = file.target ?? "";
		if (checkPath && !sourceFileHasUpstreamCounterpart(checkPath, name, upstreamNames)) continue;
		const jsonContent = file.content ?? "";
		const sourcePath = file.target ? resolveUiSourcePath(file.target) : undefined;
		const source = sourcePath ? fs.readFileSync(sourcePath, "utf8") : undefined;
		if (source) upstreamIgnores.push(...collectUpstreamIgnores(source));
		const entries = source
			? applySourceIgnores(jsonContent, source)
			: extractClassStrings(jsonContent);
		const jsonOccurrences = extractOccurrences(jsonContent);
		const sourceOccurrences = source ? extractOccurrences(source) : [];
		const relPath = sourcePath ? path.relative(ROOT, sourcePath) : undefined;

		for (const entry of entries) {
			const located =
				relPath && source
					? withSourceLocation(entry, relPath, source, jsonOccurrences, sourceOccurrences)
					: entry;
			const existing = seen.get(located.key);
			if (!existing) {
				seen.set(located.key, located);
			} else if (!located.ignoredReason) {
				seen.set(located.key, located);
			} else if (!existing.source && located.source) {
				seen.set(located.key, { ...existing, source: located.source });
			}
		}
	}
	return { entries: [...seen.values()], upstreamIgnores };
}

function locateOursOccurrence(
	ours: ClassString
): { path: string; occurrence: ClassOccurrence; line: number } | undefined {
	if (!ours.source) return undefined;
	const sourcePath = path.join(ROOT, ours.source.path);
	if (!fs.existsSync(sourcePath)) return undefined;
	const source = fs.readFileSync(sourcePath, "utf8");
	const occurrences = extractOccurrences(source);
	const exact = occurrences.find((occurrence) => occurrence.entry.key === ours.key);
	const index = exact ? occurrences.indexOf(exact) : bestSourceIndex(occurrences, ours);
	const occurrence = index === -1 ? undefined : occurrences[index];
	if (!occurrence) return undefined;
	return { path: sourcePath, occurrence, line: offsetToLine(source, occurrence.start) };
}

function bestSourceIndex(sourceOccurrences: ClassOccurrence[], ours: ClassString): number {
	let best = { index: -1, score: 0 };
	for (const [index, occurrence] of sourceOccurrences.entries()) {
		const score = similarity(occurrence.entry, ours);
		if (score > best.score) best = { index, score };
	}
	return best.score >= JACCARD_THRESHOLD ? best.index : -1;
}

function replaceQuotedString(
	content: string,
	occurrence: ClassOccurrence,
	nextRaw: string
): string {
	return `${content.slice(0, occurrence.start)}"${nextRaw.replaceAll('"', '\\"')}"${content.slice(occurrence.end)}`;
}

function planFragmentEdits(
	occurrence: ClassOccurrence,
	nextRaw: string
): { occurrence: ClassOccurrence; nextRaw: string }[] {
	const fragments = occurrence.fragments;
	if (fragments.length <= 1) {
		return [{ occurrence, nextRaw }];
	}

	const remaining = new Set(tokenize(nextRaw));
	const edits: { occurrence: ClassOccurrence; nextRaw: string }[] = [];
	let lastEditable: ClassFragment | undefined;
	let lastKept: string[] = [];

	for (const fragment of fragments) {
		if (fragment.ignored) continue;
		lastEditable = fragment;
		const kept: string[] = [];
		for (const token of tokenize(fragment.raw)) {
			if (remaining.has(token)) {
				kept.push(token);
				remaining.delete(token);
			}
		}
		lastKept = kept;
		if (kept.join(" ") !== fragment.raw) {
			edits.push({
				occurrence: {
					...occurrence,
					start: fragment.start,
					end: fragment.end,
					raw: fragment.raw,
					fragments: [fragment],
				},
				nextRaw: kept.join(" "),
			});
		}
	}

	if (remaining.size > 0 && lastEditable) {
		const leftover = tokenize(nextRaw).filter((token) => remaining.has(token));
		const merged = [...lastKept, ...leftover].join(" ");
		const existing = edits.findIndex((edit) => edit.occurrence.start === lastEditable!.start);
		const nextEdit = {
			occurrence: {
				...occurrence,
				start: lastEditable.start,
				end: lastEditable.end,
				raw: lastEditable.raw,
				fragments: [lastEditable],
			},
			nextRaw: merged,
		};
		if (existing === -1) edits.push(nextEdit);
		else edits[existing] = nextEdit;
	}

	return edits;
}

type FixResult = { path: string; line: number; before: string; after: string };

function applyFixes(pairs: Pair[]): FixResult[] {
	const pending = new Map<string, { occurrence: ClassOccurrence; nextRaw: string }[]>();

	for (const pair of pairs) {
		if (pair.kind !== "diff") continue;
		if (!pair.ours) {
			const missing = pair.removed.join(" ") || pair.upstream?.merged || "";
			console.log(
				`  skip only-upstream (no source class string to patch)${missing ? `: ${missing}` : ""}`
			);
			continue;
		}
		const hit = locateOursOccurrence(pair.ours);
		if (!hit) {
			console.log(`  skip: could not locate source for ${pair.ours.merged.slice(0, 80)}`);
			continue;
		}
		const nextRaw = pair.upstream
			? fixClassString(hit.occurrence.raw, pair.added, pair.removed)
			: tokenize(hit.occurrence.raw)
					.filter((token) => token.startsWith("cn-") || !pair.added.includes(token))
					.join(" ");
		if (nextRaw === hit.occurrence.raw) {
			console.log(
				`  skip: ${path.relative(ROOT, hit.path)}:${hit.line} source does not contain these tokens (injected from style CSS?)`
			);
			continue;
		}
		if (!nextRaw.trim() && hit.occurrence.raw.trim()) {
			console.log(
				`  skip emptying ${path.relative(ROOT, hit.path)}:${hit.line} (only-ours class string; add a parity-ignore if this is Bits-only)`
			);
			continue;
		}
		const fragmentEdits = planFragmentEdits(hit.occurrence, nextRaw);
		const edits = pending.get(hit.path) ?? [];
		for (const fragmentEdit of fragmentEdits) {
			edits.push(fragmentEdit);
		}
		pending.set(hit.path, edits);
	}

	const results: FixResult[] = [];
	for (const [sourcePath, edits] of pending) {
		let content = fs.readFileSync(sourcePath, "utf8");
		edits.sort((a, b) => b.occurrence.start - a.occurrence.start);
		for (const edit of edits) {
			results.push({
				path: sourcePath,
				line: offsetToLine(content, edit.occurrence.start),
				before: edit.occurrence.raw,
				after: edit.nextRaw,
			});
			content = replaceQuotedString(content, edit.occurrence, edit.nextRaw);
		}
		if (!dryRun) fs.writeFileSync(sourcePath, content);
	}
	return results;
}

function jaccard(a: string[], b: string[]): number {
	const aSet = new Set(a);
	const bSet = new Set(b);
	let intersection = 0;
	for (const token of aSet) if (bSet.has(token)) intersection++;
	const union = new Set([...aSet, ...bSet]).size;
	return union === 0 ? 1 : intersection / union;
}

function normalizeToken(token: string): string {
	return canonicalizeRuntimeToken(token)
		.replace(/--radix-/g, "--fw-")
		.replace(/--bits-/g, "--fw-")
		.replace(/data-radix-/g, "data-fw-")
		.replace(/data-bits-/g, "data-fw-");
}

function tokenTail(token: string): string {
	const normalized = normalizeToken(token);
	const arbitrary = normalized.lastIndexOf("]:");
	if (arbitrary !== -1) return normalized.slice(arbitrary + 2);
	if (normalized.startsWith("*:")) return normalized.slice(2);
	return normalized;
}

function distinctiveTails(tokens: string[]): string[] {
	return [...new Set(tokens.map(tokenTail))].filter((tail) => !GENERIC_TAILS.has(tail));
}

function similarity(ours: ClassString, upstream: ClassString): number {
	const tokenScore = jaccard(ours.tokens, upstream.tokens);
	const normalizedScore = jaccard(
		ours.tokens.map(normalizeToken),
		upstream.tokens.map(normalizeToken)
	);
	if (tokenScore >= JACCARD_THRESHOLD || normalizedScore >= JACCARD_THRESHOLD) {
		return Math.max(tokenScore, normalizedScore);
	}

	const oursTails = ours.tokens.map(tokenTail);
	const upstreamTails = upstream.tokens.map(tokenTail);
	const tailScore = jaccard(oursTails, upstreamTails);
	const sharedDistinct = distinctiveTails(ours.tokens).filter((tail) =>
		distinctiveTails(upstream.tokens).includes(tail)
	);
	const lengthRatio =
		Math.min(ours.tokens.length, upstream.tokens.length) /
		Math.max(ours.tokens.length, upstream.tokens.length, 1);

	if (tailScore >= TAIL_JACCARD_THRESHOLD && sharedDistinct.length >= 2 && lengthRatio >= 0.6) {
		return tailScore;
	}

	return Math.max(tokenScore, normalizedScore);
}

function diffTokens(ours: string[], upstream: string[]) {
	const oursSet = new Set(ours);
	const upstreamSet = new Set(upstream);
	return {
		added: [...oursSet].filter((token) => !upstreamSet.has(token)).sort(),
		removed: [...upstreamSet].filter((token) => !oursSet.has(token)).sort(),
	};
}

function dropRuntimeEquivalentDiffs(added: string[], removed: string[]) {
	const remainingRemoved = [...removed];
	const remainingAdded: string[] = [];

	for (const token of added) {
		const canonical = canonicalizeRuntimeToken(token);
		const matchIndex = remainingRemoved.findIndex(
			(candidate) => canonicalizeRuntimeToken(candidate) === canonical
		);
		if (matchIndex === -1) {
			remainingAdded.push(token);
			continue;
		}
		remainingRemoved.splice(matchIndex, 1);
	}

	return { added: remainingAdded, removed: remainingRemoved };
}

export type UpstreamIgnoreRule = { tokens: string[]; reason: string; comment: string };

let upstreamIgnoreRules: UpstreamIgnoreRule[] = [];

/** Collect `parity-ignore-upstream` declarations from one of our source files. */
export function collectUpstreamIgnores(content: string): UpstreamIgnoreRule[] {
	const rules: UpstreamIgnoreRule[] = [];
	for (const comment of findCommentRanges(content)) {
		const parsed = parseParityIgnoreUpstream(comment.text);
		if (!parsed) continue;
		rules.push({
			tokens: parsed.tokens,
			reason: parsed.reason,
			comment: content.slice(comment.start, comment.end).trim(),
		});
	}
	return rules;
}

/** The rule covering an upstream token we deliberately do not carry, if any. */
function upstreamIgnoreRuleFor(token: string): UpstreamIgnoreRule | undefined {
	const canonical = canonicalizeRuntimeToken(token);
	return upstreamIgnoreRules.find((rule) =>
		rule.tokens.some((declared) => canonicalizeRuntimeToken(declared) === canonical)
	);
}

function isUpstreamIgnoredToken(token: string): boolean {
	return upstreamIgnoreRuleFor(token) !== undefined;
}

/** Merge the reasons and comments of every rule covering these tokens. */
function upstreamIgnoreFor(tokens: string[]): { reason: string; comment: string } | undefined {
	if (tokens.length === 0) return undefined;
	const rules: UpstreamIgnoreRule[] = [];
	for (const token of tokens) {
		const rule = upstreamIgnoreRuleFor(token);
		if (!rule) return undefined;
		if (!rules.includes(rule)) rules.push(rule);
	}
	return {
		reason: [...new Set(rules.map((rule) => rule.reason))].join("; "),
		comment: [...new Set(rules.map((rule) => rule.comment))].join(" "),
	};
}

function isAllowlistToken(token: string): boolean {
	return ALLOWLIST_CN.has(token) || /^cn-.+-logical$/.test(token);
}

function isFrameworkToken(token: string): boolean {
	return /radix|bits-|--bits-|--radix-|data-bits-|data-radix-|--transform-origin/i.test(token);
}

function shouldKeepSourceToken(token: string): boolean {
	if (token.startsWith("cn-")) return true;
	if (isFrameworkToken(token)) return true;
	return false;
}

function classifyDiff(added: string[], removed: string[]): PairKind {
	const tokens = [...added, ...removed];
	if (tokens.length === 0) return "order";
	if (tokens.every(isAllowlistToken)) return "allowlist";
	if (tokens.every((token) => isAllowlistToken(token) || isFrameworkToken(token))) {
		return "framework";
	}
	return "diff";
}

function isFullIgnore(ours: ClassString): boolean {
	return Boolean(ours.ignoredFile || (ours.ignoredReason && !ours.ignoredTokens?.length));
}

function ignoredTokenSet(ours: ClassString): Set<string> {
	return new Set((ours.ignoredTokens ?? []).map(canonicalizeRuntimeToken));
}

function dropIgnoredAdded(added: string[], ours: ClassString): string[] {
	const ignored = ignoredTokenSet(ours);
	if (ignored.size === 0) return added;
	return added.filter((token) => !ignored.has(canonicalizeRuntimeToken(token)));
}

function toPair(ours: ClassString, upstream: ClassString): Pair {
	const diffed = diffTokens(ours.tokens, upstream.tokens);
	if (isFullIgnore(ours) && (diffed.added.length || diffed.removed.length)) {
		return { kind: "ignored", ours, upstream, ...diffed };
	}

	const upstreamIgnoredRemoved = diffed.removed.filter(isUpstreamIgnoredToken);
	const raw = upstreamIgnoredRemoved.length
		? {
				added: diffed.added,
				removed: diffed.removed.filter((token) => !isUpstreamIgnoredToken(token)),
			}
		: diffed;
	const withUpstreamIgnore = (pair: Pair): Pair => {
		if (upstreamIgnoredRemoved.length === 0 || pair.kind === "diff") return pair;
		const ignore = upstreamIgnoreFor(upstreamIgnoredRemoved)!;
		return {
			...pair,
			kind: "ignored",
			upstream: { ...upstream, ignoredReason: ignore.reason, ignoredComment: ignore.comment },
			removed: [...pair.removed, ...upstreamIgnoredRemoved],
		};
	};

	const addedWithoutIgnored = dropIgnoredAdded(raw.added, ours);
	const ignoredAdded = raw.added.filter((token) => !addedWithoutIgnored.includes(token));

	if (!excludeRuntimeEquivalent) {
		const kind = classifyDiff(addedWithoutIgnored, raw.removed);
		if (kind === "order" && ignoredAdded.length) {
			return withUpstreamIgnore({
				kind: "ignored",
				ours,
				upstream,
				added: ignoredAdded,
				removed: [],
			});
		}
		return withUpstreamIgnore({
			kind,
			ours,
			upstream,
			added: addedWithoutIgnored,
			removed: raw.removed,
		});
	}

	const filtered = dropRuntimeEquivalentDiffs(addedWithoutIgnored, raw.removed);
	if (
		(raw.added.length || raw.removed.length) &&
		!filtered.added.length &&
		!filtered.removed.length
	) {
		if (ignoredAdded.length) {
			return withUpstreamIgnore({
				kind: "ignored",
				ours,
				upstream,
				added: ignoredAdded,
				removed: [],
			});
		}
		return withUpstreamIgnore({ kind: "equivalent", ours, upstream, added: [], removed: [] });
	}

	const kind = classifyDiff(filtered.added, filtered.removed);
	if (kind === "order" && ignoredAdded.length) {
		return withUpstreamIgnore({
			kind: "ignored",
			ours,
			upstream,
			added: ignoredAdded,
			removed: [],
		});
	}

	return withUpstreamIgnore({
		kind,
		ours,
		upstream,
		...filtered,
	});
}

export function pairClassStrings(
	ours: ClassString[],
	upstream: ClassString[],
	upstreamIgnores: UpstreamIgnoreRule[] = []
): Pair[] {
	upstreamIgnoreRules = upstreamIgnores;
	const pairs: Pair[] = [];
	const usedOurs = new Set<number>();
	const usedUpstream = new Set<number>();

	for (const [ui, up] of upstream.entries()) {
		const exact = ours.findIndex((item, oi) => !usedOurs.has(oi) && item.key === up.key);
		if (exact !== -1) {
			usedOurs.add(exact);
			usedUpstream.add(ui);
			pairs.push({ kind: "exact", ours: ours[exact], upstream: up, added: [], removed: [] });
		}
	}

	for (const [ui, up] of upstream.entries()) {
		if (usedUpstream.has(ui)) continue;
		const equivalent = ours.findIndex(
			(item, oi) => !usedOurs.has(oi) && item.runtimeKey === up.runtimeKey
		);
		if (equivalent !== -1) {
			usedOurs.add(equivalent);
			usedUpstream.add(ui);
			pairs.push(toPair(ours[equivalent]!, up));
		}
	}

	const candidates: { oursIndex: number; upstreamIndex: number; score: number }[] = [];
	for (const [ui, up] of upstream.entries()) {
		if (usedUpstream.has(ui)) continue;
		for (const [oi, item] of ours.entries()) {
			if (usedOurs.has(oi)) continue;
			const score = similarity(item, up);
			if (score >= JACCARD_THRESHOLD) {
				candidates.push({ oursIndex: oi, upstreamIndex: ui, score });
			}
		}
	}

	candidates.sort((a, b) => b.score - a.score);
	for (const candidate of candidates) {
		if (usedOurs.has(candidate.oursIndex) || usedUpstream.has(candidate.upstreamIndex)) continue;
		usedOurs.add(candidate.oursIndex);
		usedUpstream.add(candidate.upstreamIndex);
		pairs.push(toPair(ours[candidate.oursIndex]!, upstream[candidate.upstreamIndex]!));
	}

	for (const [oi, item] of ours.entries()) {
		if (usedOurs.has(oi) || !isFullIgnore(item)) continue;
		let best = { index: -1, score: -1 };
		for (const [ui, up] of upstream.entries()) {
			if (usedUpstream.has(ui)) continue;
			const score = similarity(item, up);
			if (score > best.score) best = { index: ui, score };
		}
		if (best.index === -1) continue;
		const up = upstream[best.index]!;
		const shared = item.tokens.some(
			(token) => token.startsWith("cn-") && up.tokens.includes(token)
		);
		if (!shared && best.score <= 0) continue;
		usedOurs.add(oi);
		usedUpstream.add(best.index);
		pairs.push(toPair(item, up));
	}

	for (const [ui, up] of upstream.entries()) {
		if (usedUpstream.has(ui)) continue;
		const ignore = upstreamIgnoreFor(up.tokens);
		pairs.push({
			kind: ignore ? "ignored" : classifyDiff([], up.tokens),
			upstream: ignore
				? { ...up, ignoredReason: ignore.reason, ignoredComment: ignore.comment }
				: up,
			added: [],
			removed: up.tokens,
		});
	}

	for (const [oi, item] of ours.entries()) {
		if (usedOurs.has(oi)) continue;
		if (isFullIgnore(item)) {
			pairs.push({
				kind: "ignored",
				ours: item,
				added: item.tokens,
				removed: [],
			});
			continue;
		}
		if (item.ignoredTokens?.length) {
			const leftover = dropIgnoredAdded(item.tokens, item);
			if (leftover.length === 0) {
				pairs.push({
					kind: "ignored",
					ours: item,
					added: item.ignoredTokens,
					removed: [],
				});
				continue;
			}
			pairs.push({
				kind: classifyDiff(leftover, []),
				ours: item,
				added: leftover,
				removed: [],
			});
			continue;
		}
		pairs.push({
			kind: classifyDiff(item.tokens, []),
			ours: item,
			added: item.tokens,
			removed: [],
		});
	}

	return pairs;
}

export function isCacheFresh(
	filePath: string,
	ttlMs: number = CACHE_TTL_MS,
	now: number = Date.now()
): boolean {
	if (!fs.existsSync(filePath)) return false;
	return now - fs.statSync(filePath).mtimeMs < ttlMs;
}

function readCache(cachePath: string): string | undefined {
	if (refresh || !isCacheFresh(cachePath)) return undefined;
	return fs.readFileSync(cachePath, "utf8");
}

function writeCache(cachePath: string, content: string) {
	fs.mkdirSync(path.dirname(cachePath), { recursive: true });
	fs.writeFileSync(cachePath, content);
}

function cacheLabel(): string {
	const hours = CACHE_TTL_MS / (60 * 60 * 1000);
	return refresh
		? `Upstream cache: ${CACHE_DIR} (bypassed by --refresh)`
		: `Upstream cache: ${CACHE_DIR} (expires after ${hours}h; pass --refresh to refetch)`;
}

async function fetchUpstream(style: string, name: string): Promise<RegistryItem | null> {
	const url = `${UPSTREAM_VARIANT_BASE}/radix-${style}/${name}.json`;
	const cachePath = path.join(CACHE_DIR, `radix-${style}`, `${name}.json`);
	const cached = readCache(cachePath);
	if (cached) return JSON.parse(cached) as RegistryItem;

	const res = await fetch(url);
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`${url} -> ${res.status}`);
	const json = (await res.json()) as RegistryItem;
	writeCache(cachePath, JSON.stringify(json));
	return json;
}

function resolveUpstreamRadixUiDir(): string | undefined {
	if (process.env.SHADCN_UI) {
		const dir = path.join(process.env.SHADCN_UI, "apps/v4/registry/bases/radix/ui");
		if (fs.existsSync(dir)) return dir;
	}
	const sibling = path.resolve(ROOT, "..", "..", "shadcn-ui", "apps/v4/registry/bases/radix/ui");
	if (fs.existsSync(sibling)) return sibling;
	return undefined;
}

async function fetchUpstreamBase(name: string): Promise<string | null> {
	const localDir = resolveUpstreamRadixUiDir();
	if (localDir) {
		const file = path.join(localDir, `${name}.tsx`);
		return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
	}

	const cachePath = path.join(CACHE_DIR, "bases", "radix", `${name}.tsx`);
	const cached = readCache(cachePath);
	if (cached) return cached;
	const url = `${UPSTREAM_BASE_RAW}/${name}.tsx`;
	const res = await fetch(url);
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`${url} -> ${res.status}`);
	const text = await res.text();
	writeCache(cachePath, text);
	return text;
}

function loadOurs(style: string, name: string): RegistryItem {
	return JSON.parse(
		fs.readFileSync(path.join(ROOT, "static/registry/styles", style, `${name}.json`), "utf8")
	) as RegistryItem;
}

function loadUiNames(style: string): string[] {
	const index = JSON.parse(
		fs.readFileSync(path.join(ROOT, "static/registry/styles", style, "index.json"), "utf8")
	) as IndexItem[];
	return index.filter((item) => item.type === "registry:ui").map((item) => item.name);
}

const TABLE_COLUMNS: TableColumn[] = [
	{ key: "item", header: "Item" },
	{ key: "parity", header: "Parity", align: "right" },
	{ key: "exact", header: "Exact", align: "right" },
	{ key: "equiv", header: "Equiv", align: "right" },
	{ key: "ignore", header: "Ignore", align: "right" },
	{ key: "fw", header: "FW", align: "right" },
	{ key: "diff", header: "Diff", align: "right" },
];

function addCounts(summary: KindCounts, counts: KindCounts) {
	summary.exact += counts.exact;
	summary.order += counts.order;
	summary.equivalent += counts.equivalent;
	summary.ignored += counts.ignored;
	summary.allowlist += counts.allowlist;
	summary.framework += counts.framework;
	summary.diff += counts.diff;
}

function countsFromPairs(pairs: Pair[]): KindCounts {
	const counts = emptyCounts();
	for (const pair of pairs) counts[pair.kind]++;
	return counts;
}

function rowFromCounts(name: string, counts: KindCounts): Record<string, string> {
	return {
		item: name,
		parity: `${parityPercent(counts)}%`,
		exact: String(counts.exact),
		equiv: String(counts.equivalent),
		ignore: String(counts.ignored),
		fw: String(counts.framework),
		diff: String(counts.diff),
	};
}

function interestingPairs(pairs: Pair[]): Pair[] {
	return pairs.filter((pair) => {
		if (pair.kind === "exact") return false;
		if (pair.kind === "ignored") return showIgnored;
		if (pair.kind === "equivalent") return verbose;
		return verbose ? true : pair.kind === "diff";
	});
}

function shouldReportDetails(counts: KindCounts): boolean {
	if (counts.diff > 0 || verbose) return true;
	return showIgnored && counts.ignored > 0;
}

function printInterestingPairs(heading: string, counts: KindCounts, pairs: Pair[]) {
	const interesting = interestingPairs(pairs);
	if (interesting.length === 0) return;
	console.log(`\n### ${heading}  ${parityPercent(counts)}%  diffs=${counts.diff}`);
	for (const pair of interesting) {
		if (pair.kind === "order") {
			printPairLabel("order-only", pair);
			printClassDiff(pair);
			continue;
		}
		if (
			pair.kind === "equivalent" ||
			pair.kind === "ignored" ||
			pair.kind === "allowlist" ||
			pair.kind === "framework"
		) {
			const reason =
				pair.kind === "ignored"
					? (pair.ours?.ignoredReason ?? pair.upstream?.ignoredReason)
					: undefined;
			printPairLabel(`${pair.kind}${reason ? ` (${reason})` : ""}`, pair);
			printClassDiff(pair);
			continue;
		}
		if (pair.ours && pair.upstream) printPairLabel("token-diff", pair);
		else if (pair.ours) printPairLabel("only-ours", pair);
		else printPairLabel("only-upstream", pair);
		printClassDiff(pair);
	}
}

function printFixResults(fixes: FixResult[]) {
	for (const fix of fixes) {
		console.log(
			`  ${dryRun ? "would patch" : "patched"} ${path.relative(ROOT, fix.path)}:${fix.line}`
		);
		console.log(`    - ${styleText("red", fix.before)}`);
		console.log(`    + ${styleText("green", fix.after)}`);
	}
}

function printSummary(summary: KindCounts, items: number, missingUpstream: string[]) {
	const summaryRows = [
		{ metric: "Parity", value: `${parityPercent(summary)}%` },
		{ metric: "Items", value: String(items) },
		{ metric: "Exact", value: String(summary.exact) },
		{ metric: "Order-only", value: String(summary.order) },
		...(excludeRuntimeEquivalent
			? [{ metric: "Runtime-equivalent", value: String(summary.equivalent) }]
			: []),
		{ metric: "Ignored", value: String(summary.ignored) },
		{ metric: "Allowlist", value: String(summary.allowlist) },
		{ metric: "Framework", value: String(summary.framework) },
		{ metric: "Remaining diffs", value: String(summary.diff) },
	];
	console.log(`\n## Summary`);
	console.log(
		formatTable(summaryRows, [
			{ key: "metric", header: "Metric" },
			{ key: "value", header: "Value", align: "right" },
		])
	);
	if (missingUpstream.length) {
		console.log(`Missing upstream items: ${missingUpstream.join(", ")}`);
	}
	if (!includeSkipped && !itemFilter) {
		console.log(
			`Skipped structural ports: ${[...SKIP_STRUCTURAL_ITEMS].join(", ")} (pass --include-skipped to compare)`
		);
	}
	if (isFix) {
		console.log(
			dryRun
				? "\nDry run only; pass without --dry-run to write source files."
				: "\nSource files updated. Rebuild the registry (`pnpm -F docs build:registry`) so JSON matches."
		);
	}
	if (check && summary.diff > 0) {
		console.error(
			`\nParity check failed: ${summary.diff} remaining class token diffs (${parityPercent(summary)}%)`
		);
		process.exit(1);
	}
}

function filterUiNames(allNames: string[]): { names: string[]; skipped: string[] } {
	const names = allNames.filter((name) => {
		if (itemFilter) return name === itemFilter;
		if (!includeSkipped && SKIP_STRUCTURAL_ITEMS.has(name)) return false;
		return true;
	});
	const skipped =
		includeSkipped || itemFilter ? [] : allNames.filter((name) => SKIP_STRUCTURAL_ITEMS.has(name));
	return { names, skipped };
}

async function runBase() {
	const localDir = resolveUpstreamRadixUiDir();
	const upstreamLabel = localDir ?? `${UPSTREAM_BASE_RAW}`;
	if (isFix) {
		console.log(
			`${dryRun ? "Dry-run f" : "F"}ixing ${itemFilter} against radix base (${upstreamLabel})`
		);
	} else {
		console.log(`Comparing UI source (before style injection) to radix base`);
		console.log(`Upstream: ${upstreamLabel}`);
		if (!localDir) console.log(cacheLabel());
		console.log(`Legend: ${styleText("red", "- upstream")}  ${styleText("green", "+ ours")}`);
	}

	const { names, skipped } = filterUiNames(loadUiNames("nova"));
	const summary = emptyCounts();
	const missingUpstream: string[] = [];
	let items = 0;
	const rows: Record<string, string>[] = [];
	const diffDetails: { name: string; counts: KindCounts; pairs: Pair[] }[] = [];

	for (const name of names) {
		const upstreamContent = await fetchUpstreamBase(name);
		if (!upstreamContent) {
			missingUpstream.push(name);
			continue;
		}

		items++;
		const base = loadOursBase(name, upstreamContent);
		const pairs = pairClassStrings(
			base.entries,
			extractClassStrings(upstreamContent),
			base.upstreamIgnores
		);
		const counts = countsFromPairs(pairs);
		addCounts(summary, counts);
		rows.push(rowFromCounts(name, counts));

		if (isFix && counts.diff > 0) {
			console.log(`\n### ${name}`);
			const fixes = applyFixes(pairs);
			printFixResults(fixes);
			if (fixes.length === 0) {
				console.log(
					"  (fix only rewrites existing quoted class strings; it cannot insert new props or APIs)"
				);
			}
		}
		if (shouldReportDetails(counts)) diffDetails.push({ name, counts, pairs });
	}

	rows.sort(
		(a, b) => Number(b.diff) - Number(a.diff) || (a.item ?? "").localeCompare(b.item ?? "")
	);
	console.log(
		`\n## base vs radix (${names.length} ui items${skipped.length ? `, skipped ${skipped.join(", ")}` : ""})`
	);
	if (rows.length) console.log(formatTable(rows, TABLE_COLUMNS));
	if (!isFix) {
		for (const detail of diffDetails) {
			printInterestingPairs(detail.name, detail.counts, detail.pairs);
		}
	}
	printSummary(summary, items, missingUpstream);
}

async function runVariants() {
	console.log(`Comparing generated registries to https://ui.shadcn.com/r/styles/radix-{style}`);
	console.log(cacheLabel());
	console.log(`Legend: ${styleText("red", "- upstream")}  ${styleText("green", "+ ours")}`);

	const summary = emptyCounts();
	const missingUpstream: string[] = [];
	let items = 0;

	for (const style of styles) {
		const { names, skipped } = filterUiNames(loadUiNames(style));
		if (itemFilter && names.length === 0) continue;
		const rows: Record<string, string>[] = [];
		const diffDetails: { name: string; counts: KindCounts; pairs: Pair[] }[] = [];

		for (const name of names) {
			const upstreamItem = await fetchUpstream(style, name);
			if (!upstreamItem) {
				missingUpstream.push(`${style}/${name}`);
				continue;
			}

			items++;
			const upstreamContent = (upstreamItem.files ?? [])
				.map((file) => file.content ?? "")
				.join("\n");
			const ours = extractItemContent(loadOurs(style, name), name, upstreamContent);
			const upstream = extractClassStrings(upstreamContent);
			const pairs = pairClassStrings(ours.entries, upstream, ours.upstreamIgnores);
			const counts = countsFromPairs(pairs);
			addCounts(summary, counts);
			rows.push(rowFromCounts(name, counts));
			if (shouldReportDetails(counts)) diffDetails.push({ name, counts, pairs });
		}

		rows.sort(
			(a, b) => Number(b.diff) - Number(a.diff) || (a.item ?? "").localeCompare(b.item ?? "")
		);
		console.log(
			`\n## ${style} vs radix-${style} (${names.length} ui items${skipped.length ? `, skipped ${skipped.join(", ")}` : ""})`
		);
		if (rows.length) console.log(formatTable(rows, TABLE_COLUMNS));
		for (const detail of diffDetails) {
			printInterestingPairs(`${style}/${detail.name}`, detail.counts, detail.pairs);
		}
	}

	printSummary(summary, items, missingUpstream);
}

export async function runParity(options: ParityRunOptions) {
	ROOT = options.root ?? defaultDocsRoot();
	verbose = Boolean(options.verbose);
	showIgnored = Boolean(options.ignored) || verbose;
	includeSkipped = Boolean(options.includeSkipped);
	check = Boolean(options.check);
	dryRun = Boolean(options.dryRun);
	excludeRuntimeEquivalent = options.excludeRuntimeEquivalent !== false;
	refresh = Boolean(options.refresh);
	isFix = options.command === "fix";
	mode = options.command === "variants" ? "variants" : "base";
	itemFilter = options.item;
	styleFilter = mode === "variants" ? options.style : undefined;
	styles = styleFilter
		? PRESET_STYLES.filter((style) => style === styleFilter)
		: [...PRESET_STYLES];
	if (styleFilter && styles.length === 0) {
		throw new Error(`Unknown style: ${styleFilter}`);
	}
	if (isFix && !itemFilter) {
		throw new Error("fix requires a component name, e.g. `parity fix empty`");
	}
	if (mode === "base") await runBase();
	else await runVariants();
}
