<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const bubbleVariants = tv({
		base: "group/bubble relative flex w-fit max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm break-words whitespace-pre-wrap",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				secondary: "bg-secondary text-secondary-foreground",
				outline: "border bg-background",
				ghost: "bg-transparent",
			},
			side: {
				left: "self-start rounded-bl-sm",
				right: "self-end rounded-br-sm",
			},
		},
		defaultVariants: { variant: "default", side: "left" },
	});
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, variant, side, children, ...restProps }: HTMLAttributes<HTMLDivElement> & VariantProps<typeof bubbleVariants> = $props();
</script>

<div data-slot="bubble" class={cn(bubbleVariants({ variant, side }), className)} {...restProps}>
	{@render children?.()}
</div>
