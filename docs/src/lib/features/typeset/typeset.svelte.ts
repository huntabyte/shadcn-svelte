import { browser } from "$app/environment";
import { replaceState } from "$app/navigation";
import { page } from "$app/state";
import { SvelteSet, SvelteURLSearchParams } from "svelte/reactivity";
import { FONT_DEFINITIONS } from "$lib/font-definitions.js";
import { CONTENT_OPTIONS, type FixtureName } from "./fixtures/index.js";

export { CONTENT_OPTIONS } from "./fixtures/index.js";

const EXCLUDED_FONTS = ["instrument-serif", "eb-garamond", "playfair-display"];

export const FONTS = FONT_DEFINITIONS.filter(
	(definition) => !EXCLUDED_FONTS.includes(definition.name)
).map((definition) => ({
	id: definition.name,
	label: definition.title,
	type: definition.type,
	value: `var(${definition.previewVariable}, ${definition.family})`,
	definition,
}));

export const TYPESET_SIZES = [
	{ value: "14", label: "14px" },
	{ value: "15", label: "15px" },
	{ value: "16", label: "16px" },
	{ value: "18", label: "18px" },
] as const;
export const TYPESET_LEADINGS = [
	{ value: "1.6", label: "Tight (1.6)" },
	{ value: "1.75", label: "Regular (1.75)" },
	{ value: "1.9", label: "Loose (1.9)" },
] as const;
export const TYPESET_FLOWS = [
	{ value: "1em", label: "Compact (1em)" },
	{ value: "1.25em", label: "Regular (1.25em)" },
	{ value: "2em", label: "Airy (2em)" },
] as const;
export const TYPESET_MEASURES = [
	{ value: "60", label: "60ch", width: "28em" },
	{ value: "70", label: "70ch", width: "33em" },
	{ value: "80", label: "80ch", width: "37em" },
	{ value: "90", label: "90ch", width: "42em" },
] as const;

export type TypesetParams = {
	body: string;
	heading: string;
	mono: string;
	scale: string;
	measure: string;
	flow: string;
	leading: string;
	item: FixtureName;
};
export type LockableParam = Exclude<keyof TypesetParams, "item">;

export const DEFAULT_TYPESET_PARAMS: TypesetParams = {
	body: "geist",
	heading: "inherit",
	mono: "geist-mono",
	scale: "15",
	measure: "80",
	flow: "1.25em",
	leading: "1.75",
	item: "docs",
};

const VALUES: Record<keyof TypesetParams, readonly string[]> = {
	body: FONTS.map((font) => font.id),
	heading: ["inherit", ...FONTS.map((font) => font.id)],
	mono: FONTS.map((font) => font.id),
	scale: TYPESET_SIZES.map((option) => option.value),
	measure: TYPESET_MEASURES.map((option) => option.value),
	flow: TYPESET_FLOWS.map((option) => option.value),
	leading: TYPESET_LEADINGS.map((option) => option.value),
	item: CONTENT_OPTIONS.map((option) => option.value),
};

export function coerceTypesetValue<K extends keyof TypesetParams>(key: K, value: string) {
	return VALUES[key].includes(value) ? (value as TypesetParams[K]) : null;
}

export function parseTypesetParams(query: URLSearchParams): TypesetParams {
	const params = { ...DEFAULT_TYPESET_PARAMS };
	for (const key of Object.keys(params) as (keyof TypesetParams)[]) {
		const value = query.get(key);
		if (value === null) continue;
		const coerced = coerceTypesetValue(key, value);
		if (coerced !== null) (params as Record<string, string>)[key] = coerced;
	}
	return params;
}

const random = <T>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];

export function findFont(id: string | null | undefined) {
	return FONTS.find((font) => font.id === id);
}

export function serializeTypesetParams(path: string, params: TypesetParams) {
	const query = new SvelteURLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== DEFAULT_TYPESET_PARAMS[key as keyof TypesetParams]) query.set(key, value);
	}
	const suffix = query.toString();
	return suffix ? `${path}?${suffix}` : path;
}

export class TypesetState {
	openPicker = $state<LockableParam | "menu" | null>(null);
	params = $state<TypesetParams>({ ...DEFAULT_TYPESET_PARAMS });
	locks = new SvelteSet<LockableParam>();
	history = $state<TypesetParams[]>([]);
	historyIndex = $state(-1);

	init() {
		if (!browser) return;
		this.params = parseTypesetParams(page.url.searchParams);
		this.history = [{ ...this.params }];
		this.historyIndex = 0;
	}

	update(patch: Partial<TypesetParams>) {
		const next = { ...this.params, ...patch };
		if (
			(Object.keys(next) as (keyof TypesetParams)[]).every((key) => next[key] === this.params[key])
		)
			return;
		this.params = next;
		this.history = [...this.history.slice(0, this.historyIndex + 1), { ...this.params }];
		this.historyIndex = this.history.length - 1;
		this.syncUrl();
	}

	private syncUrl() {
		if (browser) replaceState(serializeTypesetParams("/typeset", this.params), page.state);
	}

	toggleLock(param: LockableParam) {
		this.locks.has(param) ? this.locks.delete(param) : this.locks.add(param);
	}

	shuffle() {
		const bodyFonts = FONTS.filter((font) => font.type !== "mono").map((font) => font.id);
		const monoFonts = FONTS.filter((font) => font.type === "mono").map((font) => font.id);
		const next: Partial<TypesetParams> = {
			body: random(bodyFonts),
			heading: random(["inherit", ...bodyFonts]),
			mono: random(monoFonts),
			scale: random(TYPESET_SIZES).value,
			measure: random(TYPESET_MEASURES).value,
			leading: random(TYPESET_LEADINGS).value,
			flow: random(TYPESET_FLOWS).value,
		};
		for (const lock of this.locks) delete next[lock];
		this.update(next);
	}

	reset() {
		this.update({ ...DEFAULT_TYPESET_PARAMS });
	}

	undo() {
		if (this.historyIndex <= 0) return;
		this.historyIndex -= 1;
		this.params = { ...this.history[this.historyIndex] };
		this.syncUrl();
	}

	redo() {
		if (this.historyIndex >= this.history.length - 1) return;
		this.historyIndex += 1;
		this.params = { ...this.history[this.historyIndex] };
		this.syncUrl();
	}

	get canUndo() {
		return this.historyIndex > 0;
	}
	get canRedo() {
		return this.historyIndex >= 0 && this.historyIndex < this.history.length - 1;
	}
}
