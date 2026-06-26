<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="message-scroller-viewport"
	class={cn(
		"scroll-fade-b scrollbar-thin scrollbar-gutter-stable data-autoscrolling:scrollbar-none size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
