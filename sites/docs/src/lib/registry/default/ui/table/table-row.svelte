<script lang="ts">
	import { type PrimitiveTrAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveTrAttributes = $props();
</script>

<tr
	bind:this={ref}
	class={cn(
		"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</tr>
