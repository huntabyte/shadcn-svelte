<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScroller, type ScrollDirection } from "./message-scroller.svelte.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	const context = useMessageScroller();
	let {
		ref = $bindable(null),
		class: className,
		direction = "end",
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & { direction?: ScrollDirection } = $props();

	const active = $derived(direction === "end" ? context.state.canScrollEnd : context.state.canScrollStart);
</script>

<button
	bind:this={ref}
	data-slot="message-scroller-button"
	data-direction={direction}
	data-active={active}
	aria-label={direction === "end" ? "Scroll to end" : "Scroll to start"}
	aria-hidden={!active}
	tabindex={active ? undefined : -1}
	disabled={!active}
	class={cn("absolute left-1/2 z-10 -translate-x-1/2 rounded-full border bg-background px-3 py-1 text-sm shadow-sm transition data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[direction=end]:bottom-4 data-[direction=start]:top-4", className)}
	onclick={() => (direction === "end" ? context.scrollToEnd() : context.scrollToStart())}
	{...restProps}
>
	{@render children?.()}
</button>
