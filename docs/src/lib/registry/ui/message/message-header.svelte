<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
</script>

<div bind:this={ref} data-slot="message-header" class={cn("flex max-w-full min-w-0 items-center gap-2 text-sm", className)} {...restProps}>
	{@render children?.()}
</div>
