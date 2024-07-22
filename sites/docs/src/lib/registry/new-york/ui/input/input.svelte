<script lang="ts">
	import { type PrimitiveInputAttributes, cn } from "$lib/utils.js";

	let {
		value = $bindable(),
		ref = $bindable(null),
		class: className,
		...restProps
	}: PrimitiveInputAttributes = $props();
</script>

<input
	bind:this={ref}
	class={cn(
		"border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	bind:value
	{...restProps}
/>
