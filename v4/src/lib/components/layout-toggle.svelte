<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { LayoutContext } from "$lib/layout.js";
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import GalleryHorizontalIcon from "@lucide/svelte/icons/gallery-horizontal";

	let { class: className, ...restProps }: ComponentProps<typeof Button> = $props();
	const layout = LayoutContext.get();
</script>

<Button
	variant="ghost"
	size="icon"
	class={cn("size-8", className)}
	onclick={() => {
		layout.current = layout.current === "full" ? "fixed" : "full";
	}}
	{...restProps}
	title="Toggle layout"
>
	<span class="sr-only"> Toggle layout </span>
	<GalleryHorizontalIcon />
</Button>
