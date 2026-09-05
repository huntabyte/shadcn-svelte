<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const bubbleReactionsVariants = tv({
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
		defaultVariants: {
			side: "bottom",
			align: "end",
		},
	});

	export type BubbleReactionsSide = VariantProps<typeof bubbleReactionsVariants>["side"];
	export type BubbleReactionsAlign = VariantProps<typeof bubbleReactionsVariants>["align"];
</script>

<script lang="ts">
	import { cn } from "cn";
	import type { WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		side = "bottom",
		align = "end",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		side?: BubbleReactionsSide;
		align?: BubbleReactionsAlign;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="bubble-reactions"
	data-align={align}
	data-side={side}
	class={cn(bubbleReactionsVariants({ side, align }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
