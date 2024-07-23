<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveElementAttributes = $props();
</script>

<p bind:this={ref} class={cn("text-muted-foreground text-sm", className)} {...restProps}>
	{@render children?.()}
</p>
