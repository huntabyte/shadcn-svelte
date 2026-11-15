<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import {
		resolveSide,
		useDirection,
		type DirectionalSide,
	} from "$lib/registry/ui/direction/index.js";
	import { cn } from "$lib/utils.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	import ContextMenuPortal from "./context-menu-portal.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		dir,
		// parity-ignore: logical side prop default is adapted to Bits UI, not a class token
		side = "inline-end",
		portalProps,
		class: className,
		...restProps
	}: Omit<ContextMenuPrimitive.ContentProps, "side"> & {
		side?: DirectionalSide;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ContextMenuPortal>>;
	} = $props();

	const direction = useDirection();
	const resolvedSide = $derived(resolveSide(side, dir ?? direction.current));
</script>

<ContextMenuPortal {...portalProps}>
	<ContextMenuPrimitive.Content
		bind:ref
		{dir}
		side={resolvedSide}
		data-slot="context-menu-content"
		class={cn(
			"cn-context-menu-content cn-context-menu-content-logical cn-menu-target cn-menu-translucent z-50 max-h-(--bits-context-menu-content-available-height) origin-(--bits-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto",
			className
		)}
		{...restProps}
	/>
</ContextMenuPortal>
