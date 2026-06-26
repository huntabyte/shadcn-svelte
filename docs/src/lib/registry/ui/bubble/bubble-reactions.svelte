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
	class={cn(
		"bg-muted ring-card absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-1.5 py-0.5 text-sm ring-3 has-[button]:p-0 data-[align=end]:right-3 data-[align=start]:left-3 data-[side=bottom]:bottom-0 data-[side=bottom]:translate-y-3/4 data-[side=top]:top-0 data-[side=top]:-translate-y-3/4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
