<script lang="ts">
	import * as ResizablePrimitive from "paneforge";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		direction,
		paneGroup = $bindable(),
		children,
		...restProps
	}: ResizablePrimitive.PaneGroupProps = $props();
</script>

<ResizablePrimitive.PaneGroup
	bind:paneGroup
	{direction}
	class={cn("flex h-full w-full data-[direction=vertical]:flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</ResizablePrimitive.PaneGroup>
