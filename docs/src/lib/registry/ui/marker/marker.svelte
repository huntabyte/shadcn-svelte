<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const markerVariants = tv({
		base: "group/marker relative flex w-full items-center gap-2 text-sm text-muted-foreground",
		variants: {
			variant: {
				default: "",
				border: "border-b py-3",
				separator: "before:bg-border after:bg-border before:h-px before:flex-1 after:h-px after:flex-1 justify-center gap-3 py-2 text-xs",
			},
		},
		defaultVariants: { variant: "default" },
	});

	export type MarkerVariant = VariantProps<typeof markerVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		child,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: MarkerVariant;
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const mergedProps = $derived({
		class: cn(markerVariants({ variant }), className),
		"data-slot": "marker",
		"data-variant": variant,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
