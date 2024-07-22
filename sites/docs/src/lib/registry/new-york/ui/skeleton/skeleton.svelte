<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveDivAttributes = $props();
</script>

<div bind:this={ref} class={cn("animate-pulse rounded-md bg-primary/10", className)} {...restProps}>
	{@render children?.()}
</div>
