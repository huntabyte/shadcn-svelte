<script lang="ts">
	import { cn } from "cn";
	import { type WithElementRef } from "$lib/utils.js";
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
	data-slot="dropdown-menu-shortcut"
	class={cn(
		"ml-auto text-xs tracking-widest text-neutral-400 group-focus/dropdown-menu-item:text-neutral-100",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
