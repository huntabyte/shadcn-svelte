<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const messageVariants = tv({
		base: "group/message flex w-full items-end gap-3",
		variants: {
			side: { left: "justify-start", right: "justify-end" },
			spacing: { default: "py-2", compact: "py-1", spacious: "py-4" },
		},
		defaultVariants: { side: "left", spacing: "default" },
	});
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, side, spacing, children, ...restProps }: HTMLAttributes<HTMLDivElement> & VariantProps<typeof messageVariants> = $props();
</script>

<div data-slot="message" class={cn(messageVariants({ side, spacing }), className)} {...restProps}>
	{@render children?.()}
</div>
