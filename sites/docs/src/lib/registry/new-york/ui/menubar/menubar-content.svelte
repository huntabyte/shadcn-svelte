<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 8,
		alignOffset = -4,
		align = "start",
		...restProps
	}: MenubarPrimitive.ContentProps = $props();
</script>

<MenubarPrimitive.Content
	bind:ref
	{sideOffset}
	{align}
	{alignOffset}
	class={cn(
		"bg-popover text-popover-foreground z-50 min-w-[12rem] rounded-md border p-1 shadow-md focus:outline-none",
		className
	)}
	{...restProps}
/>
