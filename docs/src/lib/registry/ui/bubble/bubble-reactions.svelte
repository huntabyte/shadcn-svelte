<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		side = "bottom",
		align = "end",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		side?: "top" | "bottom";
		align?: "start" | "end";
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="bubble-reactions"
	data-side={side}
	data-align={align}
	class={cn("absolute z-10 flex w-fit items-center justify-center rounded-full border bg-background px-1 py-0.5 text-xs shadow-sm data-[side=bottom]:-bottom-3 data-[side=top]:-top-3 data-[align=end]:right-2 data-[align=start]:left-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>
