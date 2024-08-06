<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveDivAttributes = $props();

	export { className as class };
</script>

<div bind:this={ref} class={cn("mt-auto flex flex-col gap-2 p-4", className)} {...restProps}>
	{@render children?.()}
</div>
