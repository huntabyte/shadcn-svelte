<script lang="ts">
	import type { HeadingLevel } from "./index.js";
	import { type PrimitiveHeadingAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		level = "h5",
		children,
		...restProps
	}: PrimitiveHeadingAttributes & {
		level?: HeadingLevel;
	} = $props();
</script>

<svelte:element
	this={level}
	bind:this={ref}
	class={cn("mb-1 font-medium leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
