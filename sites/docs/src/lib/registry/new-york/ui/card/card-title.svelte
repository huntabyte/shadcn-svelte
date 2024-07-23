<script lang="ts">
	import type { CardHeadingLevel } from "./index.js";
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		level = 3,
		children,
		...restProps
	}: PrimitiveElementAttributes & {
		level?: CardHeadingLevel;
	} = $props();
</script>

<div
	role="heading"
	aria-level={level}
	bind:this={ref}
	class={cn("font-semibold leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</div>
