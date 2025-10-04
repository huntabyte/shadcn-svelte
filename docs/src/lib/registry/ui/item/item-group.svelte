<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	role="list"
	data-slot="item-group"
	class={cn("group/item-group flex flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>
