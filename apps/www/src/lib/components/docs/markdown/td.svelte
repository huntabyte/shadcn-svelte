<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<td
	class={cn(
		"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
