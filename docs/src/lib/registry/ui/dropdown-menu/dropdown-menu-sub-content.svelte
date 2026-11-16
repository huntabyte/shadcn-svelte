<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import {
		resolveSide,
		useDirection,
		type DirectionalSide,
	} from "$lib/registry/ui/direction/index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import DropdownMenuPortal from "./dropdown-menu-portal.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		dir,
		// parity-ignore: logical side prop default is adapted to Bits UI, not a class token
		side = "inline-end",
		class: className,
		align = "start",
		alignOffset = -3,
		portalProps,
		...restProps
	}: Omit<DropdownMenuPrimitive.SubContentProps, "side"> & {
		side?: DirectionalSide;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DropdownMenuPortal>>;
	} = $props();

	const direction = useDirection();
	const resolvedSide = $derived(resolveSide(side, dir ?? direction.current));
</script>

<DropdownMenuPortal {...portalProps}>
	<DropdownMenuPrimitive.SubContent
		bind:ref
		{dir}
		side={resolvedSide}
		data-slot="dropdown-menu-sub-content"
		{align}
		{alignOffset}
		class={cn(
			"cn-dropdown-menu-sub-content cn-menu-target cn-menu-translucent z-50 origin-(--bits-dropdown-menu-content-transform-origin) overflow-hidden",
			className
		)}
		{...restProps}
	/>
</DropdownMenuPortal>
