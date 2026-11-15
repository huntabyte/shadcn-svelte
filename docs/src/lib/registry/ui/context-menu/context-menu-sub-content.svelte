<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import {
		resolveSide,
		useDirection,
		type DirectionalSide,
	} from "$lib/registry/ui/direction/index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import ContextMenuPortal from "./context-menu-portal.svelte";
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
	}: Omit<ContextMenuPrimitive.SubContentProps, "side"> & {
		side?: DirectionalSide;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ContextMenuPortal>>;
	} = $props();

	const direction = useDirection();
	const resolvedSide = $derived(resolveSide(side, dir ?? direction.current));
</script>

<ContextMenuPortal {...portalProps}>
	<ContextMenuPrimitive.SubContent
		bind:ref
		{dir}
		side={resolvedSide}
		data-slot="context-menu-sub-content"
		{align}
		{alignOffset}
		class={cn(
			"cn-context-menu-sub-content cn-menu-target cn-menu-translucent z-50 origin-(--bits-context-menu-content-transform-origin) overflow-hidden",
			className
		)}
		{...restProps}
	/>
</ContextMenuPortal>
