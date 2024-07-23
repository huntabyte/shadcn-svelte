<script lang="ts">
	import { type PrimitiveTableSectionAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveTableSectionAttributes = $props();
</script>

<tfoot
	bind:this={ref}
	class={cn("bg-primary text-primary-foreground font-medium", className)}
	{...restProps}
>
	{@render children?.()}
</tfoot>
