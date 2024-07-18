<script lang="ts">
	import type { AlertHeadingLevel } from "./index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		level = 5,
		children,
		...restProps
	}: PrimitiveDivAttributes & {
		level?: AlertHeadingLevel;
	} = $props();
</script>

<div
	role="heading"
	aria-level={level}
	bind:this={ref}
	class={cn("mb-1 font-medium leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</div>
