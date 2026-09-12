<script lang="ts">
	import { cn } from "cn";
	import { type WithElementRef } from "$lib/utils.js";
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
	data-slot="avatar-group-count"
	class={cn(
		"cn-avatar-group-count relative flex shrink-0 items-center justify-center ring-2 ring-background",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
