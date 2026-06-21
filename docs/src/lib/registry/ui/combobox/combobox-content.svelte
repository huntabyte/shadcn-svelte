<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { getContext } from "svelte";
	import ComboboxPortal from "./combobox-portal.svelte";
	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils.js";
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

<ComboboxPortal {...portalProps}>
	<ComboboxPrimitive.Content
		bind:ref
		data-slot="combobox-content"
		data-chips={!!(customAnchor ?? combobox?.anchor)}
		{sideOffset}
		{align}
		customAnchor={customAnchor ?? combobox?.anchor ?? null}
		class={cn(
			"cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative isolate z-50 max-h-(--bits-combobox-content-available-height) w-(--bits-combobox-anchor-width) max-w-(--bits-combobox-content-available-width) min-w-[calc(var(--bits-combobox-anchor-width)+--spacing(7))] origin-(--bits-combobox-content-transform-origin) data-[chips=true]:min-w-(--bits-combobox-anchor-width)",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPortal>
