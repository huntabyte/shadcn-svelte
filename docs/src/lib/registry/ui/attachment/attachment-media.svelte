<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "icon",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { variant?: "icon" | "image" } = $props();
</script>

<div bind:this={ref} data-slot="attachment-media" data-variant={variant} class={cn("flex aspect-square size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_img]:size-full [&_img]:object-cover", variant === "image" && "size-24", className)} {...restProps}>
	{@render children?.()}
</div>
