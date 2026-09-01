<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScroller } from "./message-scroller.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";

	const context = useMessageScroller();
	let {
		ref = $bindable(null),
		class: className,
		messageId,
		scrollAnchor = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { messageId?: string; scrollAnchor?: boolean } = $props();
	$effect(() => {
		if (!ref || !messageId) return;
		return context.registerItem(messageId, ref);
	});
</script>

<div bind:this={ref} data-slot="message-scroller-item" data-message-id={messageId} data-scroll-anchor={scrollAnchor || undefined} class={cn("min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]", className)} {...restProps}>
	{@render children?.()}
</div>
