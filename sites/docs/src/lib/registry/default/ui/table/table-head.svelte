<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLThAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<th
	class={cn(
		"text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
