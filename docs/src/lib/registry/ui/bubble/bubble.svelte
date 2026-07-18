<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const bubbleVariants = tv({
		base: "group/bubble relative flex w-fit min-w-0 max-w-[80%] flex-col",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				secondary: "bg-secondary text-secondary-foreground",
				muted: "bg-muted text-foreground",
				tinted: "bg-primary/10 text-foreground",
				outline: "border bg-background text-foreground",
				ghost: "max-w-full text-foreground",
				destructive: "bg-destructive/10 text-destructive",
			},
			align: { start: "self-start", end: "self-end" },
		},
		defaultVariants: { variant: "default", align: "start" },
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

<div bind:this={ref} data-slot="bubble" data-variant={variant} data-align={align} class={cn(bubbleVariants({ variant, align }), className)} {...restProps}>
	{@render children?.()}
</div>
