<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import { resolveInlineSide, useDirection, type LogicalSide } from "$lib/localization.svelte.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		side = "end",
		...restProps
	}: Omit<ContextMenuPrimitive.SubContentProps, "side"> & {
		side?: LogicalSide;
	} = $props();

	const direction = useDirection();
	const resolvedSide = $derived(resolveInlineSide(direction.current, side));
</script>

<ContextMenuPrimitive.SubContent
	bind:ref
	data-slot="context-menu-sub-content"
	side={resolvedSide}
	class={cn("cn-context-menu-sub-content cn-menu-target cn-menu-translucent", className)}
	{...restProps}
/>
