<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScroller } from "./message-scroller.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";

	const context = useMessageScroller();
	let { ref = $bindable(null), class: className, children, onscroll, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
	function refresh() {
		if (!ref) return;
		context.state.canScrollStart = ref.scrollTop > 1;
		context.state.canScrollEnd = ref.scrollTop + ref.clientHeight < ref.scrollHeight - 1;
	}

	function handleScroll(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		refresh();
		if (!context.state.programmatic) context.state.follow = context.state.autoScroll && !context.state.canScrollEnd;
		onscroll?.(event);
	}

	$effect(() => {
		context.setViewport(ref);
		if (!ref) return;
		const observer = new ResizeObserver(refresh);
		observer.observe(ref);
		refresh();
		return () => observer.disconnect();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={ref}
	data-slot="message-scroller-viewport"
	data-autoscrolling={context.state.programmatic || undefined}
	data-scrollable={context.state.canScrollStart || context.state.canScrollEnd || undefined}
	role="region"
	aria-label="Messages"
	tabindex="0"
	class={cn("size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain scroll-smooth", className)}
	onscroll={handleScroll}
	{...restProps}
>
	{@render children?.()}
</div>
