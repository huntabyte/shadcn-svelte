<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let {
		class: className,
		children,
		balanced = true,
		...restProps
	}: PrimitiveElementAttributes & { balanced?: boolean } = $props();
</script>

<p
	class={cn(
		"text-muted-foreground max-w-[750px] text-center text-lg sm:text-xl",
		balanced && "text-balance",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</p>
