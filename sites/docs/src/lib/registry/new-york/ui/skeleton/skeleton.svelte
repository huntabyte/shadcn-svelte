<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveDivAttributes = $props();
</script>

<div bind:this={ref} class={cn("bg-primary/10 animate-pulse rounded-md", className)} {...restProps}>
	{@render children?.()}
</div>
