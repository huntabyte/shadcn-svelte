<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const bubbleVariants = tv({
		base: "cn-bubble group/bubble relative flex w-fit min-w-0 flex-col",
		variants: {
			variant: {
				default: "cn-bubble-variant-default",
				secondary: "cn-bubble-variant-secondary",
				muted: "cn-bubble-variant-muted",
				tinted: "cn-bubble-variant-tinted",
				outline: "cn-bubble-variant-outline",
				ghost: "cn-bubble-variant-ghost",
				destructive: "cn-bubble-variant-destructive",
			},
		},
		defaultVariants: { variant: "default" },
	});

	export type BubbleVariant = VariantProps<typeof bubbleVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		align = "start",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: BubbleVariant;
		align?: "start" | "end";
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="bubble"
	data-variant={variant}
	data-align={align}
	class={cn(bubbleVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
