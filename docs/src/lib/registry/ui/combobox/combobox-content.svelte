<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import ComboboxPortal from "./combobox-portal.svelte";
	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 6,
		align = "start",
		portalProps,
		children,
		...restProps
	}: WithoutChild<ComboboxPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ComboboxPortal>>;
	} = $props();
</script>

<ComboboxPortal {...portalProps}>
	<ComboboxPrimitive.Content
		bind:ref
		data-slot="combobox-content"
		{sideOffset}
		{align}
		class={cn(
			"cn-combobox-content cn-menu-target cn-menu-translucent bg-popover text-popover-foreground relative isolate z-50 max-h-96 w-(--bits-floating-anchor-width) min-w-0 overflow-hidden rounded-md shadow-md outline-hidden",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPortal>
