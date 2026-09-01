<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
</script>

<div bind:this={ref} data-slot="bubble-group" class={cn("flex min-w-0 flex-col gap-1", className)} {...restProps}>
	{@render children?.()}
</div>
