<script lang="ts">
	import { type PrimitiveSpanAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveSpanAttributes = $props();
</script>

<span
	class={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
	{...restProps}
	bind:this={ref}
>
	{@render children?.()}
</span>
