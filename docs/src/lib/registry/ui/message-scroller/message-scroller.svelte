<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
</script>

<div bind:this={ref} data-slot="message-scroller" class={cn("group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", className)} {...restProps}>
	{@render children?.()}
</div>
