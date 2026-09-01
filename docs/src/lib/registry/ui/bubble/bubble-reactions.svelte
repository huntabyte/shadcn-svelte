<script lang="ts" module>
	import { tv } from "tailwind-variants";

	const bubbleReactionsVariants = tv({
		base: "cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center",
		variants: {
			side: {
				top: "cn-bubble-reactions-side-top",
				bottom: "cn-bubble-reactions-side-bottom",
			},
			align: {
				start: "cn-bubble-reactions-align-start",
				end: "cn-bubble-reactions-align-end",
			},
		},
		defaultVariants: { side: "bottom", align: "end" },
	});
</script>

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
	class={cn(bubbleReactionsVariants({ side, align }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
