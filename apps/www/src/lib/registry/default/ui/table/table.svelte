<script lang="ts">
	import { type PrimitiveTableAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveTableAttributes = $props();
</script>

<div class="relative w-full overflow-auto">
	<table bind:this={ref} class={cn("w-full caption-bottom text-sm", className)} {...restProps}>
		{@render children?.()}
	</table>
</div>
