<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	import SelectPortal from "./select-portal.svelte";
	import SelectScrollDownButton from "./select-scroll-down-button.svelte";
	import SelectScrollUpButton from "./select-scroll-up-button.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		portalProps,
		children,
		preventScroll = true,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SelectPortal>>;
	} = $props();
</script>

<!-- parity-ignore-upstream: data-[align-trigger=true]:animate-none | Radix marks its item-aligned mode with data-align-trigger; Bits only positions the content as a popper -->
<!-- parity-ignore-upstream: data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 | Radix offsets popper content with per-side translates; Bits takes the same gap as the sideOffset prop, which also works for the logical sides -->
<!-- parity-ignore-upstream: data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width) | Radix gates the viewport sizing behind its popper mode; Bits anchors the viewport to the trigger box unconditionally -->
<SelectPortal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		{preventScroll}
		data-slot="select-content"
		class={cn(
			"cn-select-content cn-select-content-logical cn-menu-target cn-menu-translucent relative z-50 max-h-(--bits-select-content-available-height) origin-(--bits-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
			className
		)}
		{...restProps}
	>
		<SelectScrollUpButton />
		<SelectPrimitive.Viewport
			class={cn(
				// parity-ignore: Bits anchors the viewport to the trigger box unconditionally; Radix gates the same sizing behind data-[position=popper]
				"cn-select-viewport h-(--bits-select-anchor-height) w-full min-w-(--bits-select-anchor-width) scroll-my-1"
			)}
		>
			{@render children?.()}
		</SelectPrimitive.Viewport>
		<SelectScrollDownButton />
	</SelectPrimitive.Content>
</SelectPortal>
