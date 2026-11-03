<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { getContext } from "svelte";
	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils.js";
	import ComboboxPortal from "./combobox-portal.svelte";
	import { COMBOBOX_CONTEXT, type ComboboxContext } from "./context.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 6,
		align = "start",
		portalProps,
		customAnchor,
		children,
		...restProps
	}: WithoutChild<ComboboxPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ComboboxPortal>>;
	} = $props();

	const combobox = getContext<ComboboxContext | undefined>(COMBOBOX_CONTEXT);
</script>

<!-- parity-ignore-upstream: cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width) | Bits combines Popup and Positioner, uses component-prefixed dimensions, and anchors the entire input group rather than just its text input -->
<ComboboxPortal {...portalProps}>
	<ComboboxPrimitive.Content
		bind:ref
		data-slot="combobox-content"
		{sideOffset}
		{align}
		customAnchor={customAnchor ?? combobox?.anchor ?? null}
		class={cn(
			// parity-ignore: Bits combines positioning and popup styles; use Bits dimensions and the full input-group width
			"cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative isolate z-50 max-h-(--bits-combobox-content-available-height) w-(--bits-combobox-anchor-width) max-w-(--bits-combobox-content-available-width) min-w-(--bits-combobox-anchor-width) origin-(--bits-combobox-content-transform-origin)",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPortal>
