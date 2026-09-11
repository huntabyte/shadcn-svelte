<script lang="ts">
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn/svelte/message-scroller";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: MessageScrollerPrimitive.RootProps = $props();
</script>

<MessageScrollerPrimitive.Root
	bind:ref
	data-slot="message-scroller"
	class={cn(
		"cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
		className
	)}
	{...restProps}
/>
