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
	class={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</span>
