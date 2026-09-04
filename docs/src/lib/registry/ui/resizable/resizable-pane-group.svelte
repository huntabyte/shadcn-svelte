<script lang="ts">
	import * as ResizablePrimitive from "paneforge";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		this: paneGroup = $bindable(),
		class: className,
		orientation,
		direction,
		...restProps
	}: Omit<ResizablePrimitive.PaneGroupProps, "direction"> & {
		this?: ResizablePrimitive.PaneGroup;
		direction?: ResizablePrimitive.PaneGroupProps["direction"];
		orientation?: "horizontal" | "vertical";
	} = $props();

	const resolvedDirection = $derived(orientation ?? direction ?? "horizontal");
</script>

<ResizablePrimitive.PaneGroup
	bind:ref
	bind:this={paneGroup}
	data-slot="resizable-pane-group"
	class={cn(
		"cn-resizable-panel-group flex h-full w-full data-[direction=vertical]:flex-col",
		className
	)}
	direction={resolvedDirection}
	{...restProps}
/>
