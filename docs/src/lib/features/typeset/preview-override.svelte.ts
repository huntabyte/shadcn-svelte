import { getContext, setContext } from "svelte";
import type { TypesetParams } from "./typeset.svelte.js";

export type TypesetPreviewOverride = Partial<TypesetParams> | null;

const PREVIEW_OVERRIDE_DEBOUNCE_MS = 50;
const PREVIEW_OVERRIDE_CONTEXT = Symbol("typeset-preview-override");

function sameOverride(a: TypesetPreviewOverride, b: TypesetPreviewOverride) {
	if (a === b) return true;
	if (!a || !b) return false;
	const aKeys = Object.keys(a) as (keyof TypesetParams)[];
	const bKeys = Object.keys(b) as (keyof TypesetParams)[];
	return aKeys.length === bKeys.length && aKeys.every((key) => a[key] === b[key]);
}

export class TypesetPreviewOverrideState {
	override = $state<TypesetPreviewOverride>(null);
	private timeout: ReturnType<typeof setTimeout> | undefined;

	set(next: Partial<TypesetParams>) {
		this.clearPending();
		this.timeout = setTimeout(() => {
			this.timeout = undefined;
			if (!sameOverride(this.override, next)) this.override = next;
		}, PREVIEW_OVERRIDE_DEBOUNCE_MS);
	}

	clear() {
		this.clearPending();
		this.override = null;
	}

	destroy() {
		this.clearPending();
	}

	private clearPending() {
		if (this.timeout !== undefined) {
			clearTimeout(this.timeout);
			this.timeout = undefined;
		}
	}
}

export function provideTypesetPreviewOverride(state: TypesetPreviewOverrideState) {
	setContext(PREVIEW_OVERRIDE_CONTEXT, state);
}

export function useTypesetPreviewOverride() {
	return getContext<TypesetPreviewOverrideState>(PREVIEW_OVERRIDE_CONTEXT);
}
