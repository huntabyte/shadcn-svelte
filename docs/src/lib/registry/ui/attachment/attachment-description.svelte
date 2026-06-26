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
	data-slot="attachment-description"
	class={cn(
		"text-muted-foreground group-data-[state=error]/attachment:text-destructive/80 mt-0.5 block max-w-full min-w-0 truncate text-xs",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
