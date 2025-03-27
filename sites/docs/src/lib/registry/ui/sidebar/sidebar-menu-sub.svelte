<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLUListElement>> = $props();
</script>

<ul
	bind:this={ref}
	data-sidebar="menu-sub"
	class={cn(
		"border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
		"group-data-[collapsible=icon]:hidden",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</ul>
