<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const attachmentVariants = tv({
		base: "group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap overflow-hidden rounded-lg border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
		variants: {
			size: {
				default: "gap-3 p-3 text-sm",
				sm: "gap-2 p-2 text-sm",
				xs: "gap-1.5 p-1.5 text-xs",
			},
			orientation: { horizontal: "items-center", vertical: "flex-col" },
		},
		defaultVariants: { size: "default", orientation: "horizontal" },
	});

	export type AttachmentSize = VariantProps<typeof attachmentVariants>["size"];
	export type AttachmentOrientation = VariantProps<typeof attachmentVariants>["orientation"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		state = "done",
		size = "default",
		orientation = "horizontal",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		state?: "idle" | "uploading" | "processing" | "error" | "done";
		size?: AttachmentSize;
		orientation?: AttachmentOrientation;
	} = $props();
</script>

<div bind:this={ref} data-slot="attachment" data-state={state} data-size={size} data-orientation={orientation} class={cn(attachmentVariants({ size, orientation }), className)} {...restProps}>
	{@render children?.()}
</div>
