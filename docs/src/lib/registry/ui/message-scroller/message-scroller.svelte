<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { MESSAGE_SCROLLER_CONTEXT, type MessageScrollerContextValue } from "./context.js";

	const controller = getContext<MessageScrollerContextValue | null>(MESSAGE_SCROLLER_CONTEXT);

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	$effect(() => {
		controller?.setRootElement(ref);
		return () => controller?.setRootElement(null);
	});
</script>

<div
	bind:this={ref}
	data-slot="message-scroller"
	class={cn(
		"group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
