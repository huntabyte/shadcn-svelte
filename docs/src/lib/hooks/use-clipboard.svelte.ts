type Options = {
	/** The time before the copied status is reset. */
	delay: number;
	/** Whether to reset the copied status after a delay. */
	reset: boolean;
};

/** Use this hook to copy text to the clipboard and show a copied state.
 *
 * ## Usage
 * ```svelte
 * <script lang="ts">
 * 		import { UseClipboard } from "$lib/hooks/use-clipboard.svelte";
 *
 * 		const clipboard = new UseClipboard();
 * </script>
 *
 * <button onclick={clipboard.copy('Hello, World!')}>
 *     {#if clipboard.copied === 'success'}
 *         Copied!
 *     {:else if clipboard.copied === 'failure'}
 *         Failed to copy!
 *     {:else}
 *         Copy
 *     {/if}
 * </button>
 * ```
 *
 */
export class UseClipboard {
	#copiedStatus = $state<"success" | "failure">();
	delay: number;
	reset: boolean;
	timeout: ReturnType<typeof setTimeout> | undefined = undefined;
	#lastCopied = $state<string | undefined>(undefined);
	constructor({ delay = 2000, reset = true }: Partial<Options> = {}) {
		this.delay = delay;
		this.reset = reset;
	}

	/** Copies the given text to the users clipboard.
	 *
	 * ## Usage
	 * ```ts
	 * clipboard.copy('Hello, World!');
	 * ```
	 *
	 * @param text
	 * @returns
	 */
	async copy(_text: string | number): Promise<"success" | "failure"> {
		const text = typeof _text === "number" ? _text.toString() : _text;
		if (this.timeout) {
			this.#copiedStatus = undefined;
			clearTimeout(this.timeout);
		}

		try {
			try {
				await navigator.clipboard.writeText(text);
			} catch {
				const textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.style.position = "fixed";
				textarea.style.opacity = "0";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}

			this.#copiedStatus = "success";
			this.#lastCopied = text;

			if (this.reset) {
				this.timeout = setTimeout(() => {
					this.#copiedStatus = undefined;
				}, this.delay);
			}
		} catch {
			// an error can occur when not in the browser or if the user hasn't given clipboard access
			this.#copiedStatus = "failure";

			if (this.reset) {
				this.timeout = setTimeout(() => {
					this.#copiedStatus = undefined;
				}, this.delay);
			}
		}

		return this.#copiedStatus;
	}

	/** True when the user has just copied to the clipboard. */
	get copied(): boolean {
		return this.#copiedStatus === "success";
	}

	/**	Indicates whether a copy has occurred
	 * and gives a status of either `success` or `failure`. */
	get status(): "success" | "failure" | undefined {
		return this.#copiedStatus;
	}

	/**
	 * The last copied text.
	 */
	get lastCopied(): string | undefined {
		return this.#lastCopied;
	}
}
