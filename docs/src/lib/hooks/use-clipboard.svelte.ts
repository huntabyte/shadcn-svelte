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
	async copy(text: string | number): Promise<"success" | "failure"> {
		if (this.timeout) {
			this.#copiedStatus = undefined;
			clearTimeout(this.timeout);
		}

		this.#copiedStatus = await copyText(text.toString());

		this.timeout = setTimeout(() => {
			this.#copiedStatus = undefined;
		}, this.delay);

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

export async function copyText(text: string): Promise<"success" | "failure"> {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return "success";
		}

		// when navigator.clipboard is unavailable we fallback to this for wider browser compatibility
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.top = "0";
		textArea.style.left = "0";
		document.body.appendChild(textArea);
		textArea.select();

		const successful = document.execCommand("copy");

		document.body.removeChild(textArea);

		return successful ? "success" : "failure";
	} catch {
		return "failure";
	}
}
