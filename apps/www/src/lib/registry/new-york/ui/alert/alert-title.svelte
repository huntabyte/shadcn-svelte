<script lang="ts">
	import type { AlertHeadingLevel } from "./index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		level = 3,
		...restProps
	}: PrimitiveDivAttributes & {
		level?: AlertHeadingLevel;
	} = $props();


</script>

<div
	bind:this={ref}
	aria-level={level}
	class={cn("mb-1 font-medium leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</div>
