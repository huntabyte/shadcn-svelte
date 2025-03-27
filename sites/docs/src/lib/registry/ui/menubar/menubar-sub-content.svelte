<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.SubContentProps = $props();
</script>

<MenubarPrimitive.SubContent
	bind:ref
	class={cn(
		"bg-popover text-popover-foreground z-50 min-w-max rounded-md border p-1 focus:outline-none",
		className
	)}
	{...restProps}
/>
