<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { resolveInlineSide, useDirection, type LogicalSide } from "$lib/localization.svelte.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		side = "end",
		...restProps
	}: Omit<MenubarPrimitive.SubContentProps, "side"> & {
		side?: LogicalSide;
	} = $props();

	const direction = useDirection();
	const resolvedSide = $derived(resolveInlineSide(direction.current, side));
</script>

<MenubarPrimitive.SubContent
	bind:ref
	data-slot="menubar-sub-content"
	side={resolvedSide}
	class={cn("cn-menubar-sub-content cn-menu-target cn-menu-translucent", className)}
	{...restProps}
/>
