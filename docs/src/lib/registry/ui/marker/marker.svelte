<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const markerVariants = tv({
		base: "group/marker text-muted-foreground [a]:hover:text-foreground relative flex min-h-4 w-full items-center gap-2 text-left text-sm [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3",
		variants: {
			variant: {
				default: "",
				separator:
					"before:bg-border after:bg-border before:mr-1 before:h-px before:min-w-0 before:flex-1 after:ml-1 after:h-px after:min-w-0 after:flex-1",
				border: "border-border border-b pb-2",
			},
		},
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

	const attrs = $derived({
		"data-slot": "marker",
		"data-variant": variant,
		class: cn(markerVariants({ variant }), className),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div bind:this={ref} {...attrs}>
		{@render children?.()}
	</div>
{/if}
