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
	data-slot="drawer-footer"
	class={cn("cn-drawer-footer-base mt-auto flex shrink-0 flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>
