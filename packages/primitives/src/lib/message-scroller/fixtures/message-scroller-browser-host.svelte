<script lang="ts">
	import Thread, { type BrowserTestItem } from "./message-scroller-browser-thread.svelte";
	import type { MessageScrollerDefaultScrollPosition } from "../types.js";

	export type ThreadProps = {
		autoScroll?: boolean;
		defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
		items: BrowserTestItem[];
		itemClass?: string;
		scrollPreviousItemPeek?: number;
		showButton?: boolean;
		showJumpButton?: boolean;
		showVisibility?: boolean;
	};

	let { initial }: { initial: ThreadProps } = $props();

	// `initial` is intentionally only read once; tests drive updates via `setProps`.
	// svelte-ignore state_referenced_locally
	let options = $state(initial);

	export function setProps(next: ThreadProps) {
		options = next;
	}
</script>

<Thread {...options} />
