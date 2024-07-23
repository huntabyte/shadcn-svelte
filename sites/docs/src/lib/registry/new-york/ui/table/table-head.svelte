<script lang="ts">
	import { type PrimitiveThAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveThAttributes = $props();
</script>

<th
	bind:this={ref}
	class={cn(
		"text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>
