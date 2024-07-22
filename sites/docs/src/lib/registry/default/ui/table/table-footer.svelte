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
	class={cn("bg-primary font-medium text-primary-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</tfoot>
