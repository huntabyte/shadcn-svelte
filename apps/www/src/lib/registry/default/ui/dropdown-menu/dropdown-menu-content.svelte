<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		sideOffset = 4,
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ContentProps = $props()

</script>

<DropdownMenuPrimitive.Content
bind:ref
	{sideOffset}
	class={cn(
		"z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none",
		className
	)}
	{...restProps}
/>
