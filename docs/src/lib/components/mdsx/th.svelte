<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLThAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLThAttributes = $props();
</script>

<th
	class={cn(
		"px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>
