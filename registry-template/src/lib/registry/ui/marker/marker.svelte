<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const markerVariants = tv({
		base: "inline-flex items-center gap-2 text-xs font-medium text-muted-foreground",
		variants: { variant: { default: "", success: "text-green-600", warning: "text-yellow-600", destructive: "text-destructive" } },
		defaultVariants: { variant: "default" },
	});
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, variant, children, ...restProps }: HTMLAttributes<HTMLDivElement> & VariantProps<typeof markerVariants> = $props();
</script>

<div data-slot="marker" class={cn(markerVariants({ variant }), className)} {...restProps}>
	{@render children?.()}
</div>
