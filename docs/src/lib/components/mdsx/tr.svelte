<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr class={cn("m-0 border-b", className)} {...restProps}>
	{@render children?.()}
</tr>
