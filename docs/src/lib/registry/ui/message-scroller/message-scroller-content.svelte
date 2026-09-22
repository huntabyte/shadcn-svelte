<script lang="ts">
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn-svelte/primitives/message-scroller";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: MessageScrollerPrimitive.ContentProps = $props();
</script>

<MessageScrollerPrimitive.Content
	data-slot="message-scroller-content"
	class={cn("cn-message-scroller-content flex h-max min-h-full flex-col", className)}
	{...restProps}
/>
