<script lang="ts">
	import type { HeadingLevel } from "./index.js";
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		tag = "h3",
		children,
		...restProps
	}: PrimitiveElementAttributes & {
		tag?: HeadingLevel;
	} = $props();
</script>

<svelte:element
	this={tag}
	bind:this={ref}
	class={cn("font-semibold leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
