<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn-svelte/primitives/message-scroller";

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
