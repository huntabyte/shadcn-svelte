<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const attachmentVariants = tv({
		base: "cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
		variants: {
			size: {
				default: "cn-attachment-size-default",
				sm: "cn-attachment-size-sm",
				xs: "cn-attachment-size-xs",
			},
			orientation: {
				horizontal: "cn-attachment-orientation-horizontal items-center",
				vertical: "cn-attachment-orientation-vertical flex-col",
			},
		},
	});

	export type AttachmentSize = VariantProps<typeof attachmentVariants>["size"];
	export type AttachmentOrientation = VariantProps<typeof attachmentVariants>["orientation"];
	export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done";
</script>

<script lang="ts">
	import { cn } from "cn";
	import type { WithElementRef } from "$lib/utils.js";
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
		state?: AttachmentState;
		size?: AttachmentSize;
		orientation?: AttachmentOrientation;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="attachment"
	data-state={state}
	data-size={size}
	data-orientation={orientation}
	class={cn(attachmentVariants({ size, orientation }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
