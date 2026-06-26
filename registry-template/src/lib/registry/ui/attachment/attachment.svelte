<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const attachmentVariants = tv({
		base: "group/attachment inline-flex min-w-0 items-center gap-2 rounded-md border bg-background text-sm transition-colors",
		variants: {
			size: { sm: "px-2 py-1 text-xs", default: "px-3 py-2", lg: "px-4 py-3" },
			state: { default: "", loading: "opacity-70", error: "border-destructive text-destructive" },
		},
		defaultVariants: { size: "default", state: "default" },
	});
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let { class: className, size, state, children, href, ...restProps }: HTMLAnchorAttributes & VariantProps<typeof attachmentVariants> = $props();
</script>

<a data-slot="attachment" class={cn(attachmentVariants({ size, state }), className)} {href} {...restProps}>
	{@render children?.()}
</a>
