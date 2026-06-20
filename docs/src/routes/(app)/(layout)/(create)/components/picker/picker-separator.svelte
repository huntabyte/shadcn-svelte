<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SeparatorProps = $props();
</script>

<DropdownMenuPrimitive.Separator
	bind:ref
	data-slot="dropdown-menu-separator"
	class={cn(
		"[[data-slot=dropdown-menu-sub-content]_&]:bg-border -mx-1.5 my-1.5 h-px bg-neutral-600 dark:bg-neutral-700",
		className
	)}
	{...restProps}
/>
