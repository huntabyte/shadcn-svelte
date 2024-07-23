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
	bind:this={ref}
	class={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
	{...restProps}
>
	{@render children?.()}
</span>
