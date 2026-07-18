<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScroller } from "./message-scroller.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";

	const context = useMessageScroller();
	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
	$effect(() => {
		context.state.content = ref;
		if (!ref) return;
		let previousHeight = ref.scrollHeight;
		const observer = new MutationObserver((records) => {
			const viewport = context.state.viewport;
			if (!viewport) return;
			const nextHeight = ref.scrollHeight;
			const addedAboveViewport = records.some((record) =>
				Array.from(record.addedNodes).some(
					(node) => node instanceof HTMLElement && node.getBoundingClientRect().bottom <= viewport.getBoundingClientRect().top
				)
			);
			if (context.state.follow) context.scrollToEnd("auto");
			else if (addedAboveViewport) viewport.scrollTop += nextHeight - previousHeight;
			previousHeight = nextHeight;
		});
		observer.observe(ref, { childList: true, subtree: true, characterData: true });
		return () => observer.disconnect();
	});
</script>

<div bind:this={ref} data-slot="message-scroller-content" role="log" aria-relevant="additions" class={cn("flex h-max min-h-full flex-col", className)} {...restProps}>
	{@render children?.()}
</div>
