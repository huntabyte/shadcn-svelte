<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLTdAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLTdAttributes = $props();
</script>

<td
	class={cn(
		"whitespace-nowrap px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
