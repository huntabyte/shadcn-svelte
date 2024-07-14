<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveElementAttributes = $props();
</script>

<caption bind:this={ref} class={cn("mt-4 text-sm text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</caption>
