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
	data-slot="empty-content"
	class={cn(
		"flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
