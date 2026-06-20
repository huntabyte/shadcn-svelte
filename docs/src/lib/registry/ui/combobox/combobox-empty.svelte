<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="combobox-empty"
	class={cn("text-muted-foreground w-full py-2 text-center text-sm", className)}
	{...restProps}
>
	{@render children?.()}
</div>
