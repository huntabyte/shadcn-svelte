<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const attachmentMediaVariants = tv({
		base: "cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none",
		variants: {
			variant: {
				icon: "cn-attachment-media-variant-icon",
				image:
					"cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
			},
		},
		defaultVariants: {
			variant: "icon",
		},
	});

	export type AttachmentMediaVariant = VariantProps<typeof attachmentMediaVariants>["variant"];
</script>

<script lang="ts">
	import { cn } from "cn";
	import type { WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "icon",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AttachmentMediaVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="attachment-media"
	data-variant={variant}
	class={cn(attachmentMediaVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
