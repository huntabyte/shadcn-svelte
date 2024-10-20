<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		align = "center",
		sideOffset = 4,
		...restProps
	}: PopoverPrimitive.ContentProps = $props();
</script>

<PopoverPrimitive.Portal>
	<PopoverPrimitive.Content
		bind:ref
		{align}
		{sideOffset}
		class={cn(
			"bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none",
			className
		)}
		{...restProps}
	/>
</PopoverPrimitive.Portal>
