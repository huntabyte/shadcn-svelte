<script lang="ts">
	import { type PrimitiveTdAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveTdAttributes = $props();
</script>

<td
	bind:this={ref}
	class={cn(
		"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
