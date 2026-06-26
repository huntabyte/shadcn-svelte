<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="message-header"
	class={cn(
		"text-muted-foreground flex max-w-full min-w-0 items-center px-3 text-xs font-medium group-has-data-[variant=ghost]/message:px-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
