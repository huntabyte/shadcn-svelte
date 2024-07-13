<script lang="ts">
	import { type PrimitiveUlAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveUlAttributes = $props();
</script>

<ul bind:this={ref} class={cn("flex flex-row items-center gap-1", className)} {...restProps}>
	{@render children?.()}
</ul>
