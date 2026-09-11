<script lang="ts">
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn/svelte/message-scroller";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		scrollAnchor = false,
		...restProps
	}: MessageScrollerPrimitive.ItemProps = $props();
</script>

<MessageScrollerPrimitive.Item
	data-slot="message-scroller-item"
	{scrollAnchor}
	class={cn(
		"cn-message-scroller-item min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
		className
	)}
	{...restProps}
/>
