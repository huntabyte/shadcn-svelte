<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLSpanElement>
	> = $props();
</script>

<span bind:this={ref} data-slot="attachment-title" class={cn("block max-w-full truncate font-medium group-data-[state=processing]/attachment:animate-pulse group-data-[state=uploading]/attachment:animate-pulse", className)} {...restProps}>
	{@render children?.()}
</span>
