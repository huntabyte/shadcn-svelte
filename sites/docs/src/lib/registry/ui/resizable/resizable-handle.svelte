<script lang="ts">
	import GripVertical from "@lucide/svelte/icons/grip-vertical";
	import * as ResizablePrimitive from "paneforge";
	import type { WithoutChildrenOrChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		withHandle = false,
		...restProps
	}: WithoutChildrenOrChild<ResizablePrimitive.PaneResizerProps> & {
		withHandle?: boolean;
	} = $props();
</script>

<ResizablePrimitive.PaneResizer
	bind:ref
	data-slot="resizable-handle"
	class={cn(
		"bg-border focus-visible:ring-ring focus-visible:outline-hidden relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 data-[pane-group-direction=vertical]:h-px data-[pane-group-direction=vertical]:w-full data-[pane-group-direction=vertical]:after:left-0 data-[pane-group-direction=vertical]:after:h-1 data-[pane-group-direction=vertical]:after:w-full data-[pane-group-direction=vertical]:after:-translate-y-1/2 data-[pane-group-direction=vertical]:after:translate-x-0 [&[data-pane-group-direction=vertical]>div]:rotate-90",
		className
	)}
	{...restProps}
>
	{#if withHandle}
		<div class="bg-border rounded-xs z-10 flex h-4 w-3 items-center justify-center border">
			<GripVertical class="size-2.5" />
		</div>
	{/if}
</ResizablePrimitive.PaneResizer>
