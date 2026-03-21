<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { resolveInlineSide, useDirection, type LogicalSide } from "$lib/localization.svelte.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		side = "end",
		...restProps
	}: Omit<DropdownMenuPrimitive.SubContentProps, "side"> & {
		side?: LogicalSide;
	} = $props();

	const direction = useDirection();
	const resolvedSide = $derived(resolveInlineSide(direction.current, side));
</script>

<DropdownMenuPrimitive.SubContent
	bind:ref
	data-slot="dropdown-menu-sub-content"
	side={resolvedSide}
	class={cn("cn-dropdown-menu-sub-content cn-menu-target cn-menu-translucent w-auto", className)}
	{...restProps}
/>
