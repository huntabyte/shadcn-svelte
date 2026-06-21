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
		onpointerdown,
		onfocusin,
		children,
		...restProps
	}: WithoutChild<ComboboxPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ComboboxPortal>>;
	} = $props();

	const combobox = getContext<ComboboxContext | undefined>(COMBOBOX_CONTEXT);

	function activatePortal(event: Event, handler: unknown) {
		combobox?.setOpen(true);

		if (typeof handler === "function") {
			handler(event);
		}
	}
</script>

<ComboboxPortal {...portalProps}>
	<ComboboxPrimitive.Content
		bind:ref
		data-slot="combobox-content"
		data-chips={!!(customAnchor ?? combobox?.anchor)}
		{sideOffset}
		{align}
		customAnchor={customAnchor ?? combobox?.anchor ?? null}
		onpointerdown={(event) => activatePortal(event, onpointerdown)}
		onfocusin={(event) => activatePortal(event, onfocusin)}
		class={cn(
			"cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in! data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out! data-closed:fade-out-0 data-closed:zoom-out-95 relative isolate z-50 max-h-(--bits-combobox-content-available-height) w-(--bits-combobox-anchor-width) max-w-(--bits-combobox-content-available-width) min-w-[calc(var(--bits-combobox-anchor-width)+--spacing(7))] origin-(--bits-combobox-content-transform-origin) overflow-hidden duration-100 data-[chips=true]:min-w-(--bits-combobox-anchor-width)",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPortal>
