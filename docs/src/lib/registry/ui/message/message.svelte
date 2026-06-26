<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		align = "start",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		align?: "start" | "end";
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="message"
	data-align={align}
	class={cn(
		"group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
