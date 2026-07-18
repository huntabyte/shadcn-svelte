<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
</script>

<div bind:this={ref} data-slot="attachment-group" class={cn("flex min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain [&>[data-slot=attachment]]:flex-none [&>[data-slot=attachment]]:snap-start", className)} {...restProps}>
	{@render children?.()}
</div>
