<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveDivAttributes = $props();
</script>

<div
	bind:this={ref}
	class={cn("mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className)}
	{...restProps}
>
	{@render children?.()}
</div>
