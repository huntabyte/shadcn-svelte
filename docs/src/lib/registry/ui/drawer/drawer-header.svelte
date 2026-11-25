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

<!-- parity-ignore: Current Base UI drawer spacing keeps the header and footer outside the scrolling content; the parity baseline still uses Vaul spacing. -->
<div
	bind:this={ref}
	data-slot="drawer-header"
	class={cn(
		"cn-drawer-header-base flex shrink-0 flex-col group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
