import { Context } from "runed";
import type { PresetConfig } from "shadcn-svelte/preset";

export type PreviewOverride = Partial<PresetConfig>;

const PREVIEW_OVERRIDE_DEBOUNCE_MS = 50;

export class PreviewOverrideState {
	override = $state<PreviewOverride | null>(null);
	#timeout: ReturnType<typeof setTimeout> | undefined;

	setOverride(next: PreviewOverride) {
		this.clearPendingOverride();
		this.#timeout = setTimeout(() => {
			this.#timeout = undefined;
			this.override = next;
		}, PREVIEW_OVERRIDE_DEBOUNCE_MS);
	}

	clearOverride() {
		this.clearPendingOverride();
		this.override = null;
	}

	private clearPendingOverride() {
		if (this.#timeout !== undefined) {
			clearTimeout(this.#timeout);
			this.#timeout = undefined;
		}
	}
}

export const PreviewOverrideContext = new Context<PreviewOverrideState>("PreviewOverrideContext");

export function setupPreviewOverride() {
	return PreviewOverrideContext.set(new PreviewOverrideState());
}

export function usePreviewOverride() {
	return PreviewOverrideContext.get();
}
