<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
</script>

<div bind:this={ref} data-slot="message-footer" class={cn("flex max-w-full min-w-0 items-center gap-2 group-data-[align=end]/message:justify-end", className)} {...restProps}>
	{@render children?.()}
</div>
