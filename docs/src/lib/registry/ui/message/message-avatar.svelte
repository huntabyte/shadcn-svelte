<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
</script>

<div bind:this={ref} data-slot="message-avatar" class={cn("flex size-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted", className)} {...restProps}>
	{@render children?.()}
</div>
