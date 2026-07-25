<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="attachment-title"
	class={cn(
		"cn-attachment-title group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block max-w-full min-w-0 truncate",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
