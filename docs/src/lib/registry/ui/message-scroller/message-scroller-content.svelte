<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn-svelte/primitives/message-scroller";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MessageScrollerPrimitive.ContentProps = $props();
</script>

<MessageScrollerPrimitive.Content
	bind:ref
	data-slot="message-scroller-content"
	class={cn("cn-message-scroller-content flex h-max min-h-full flex-col", className)}
	{...restProps}
/>
