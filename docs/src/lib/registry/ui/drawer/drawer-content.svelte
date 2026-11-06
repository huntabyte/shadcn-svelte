<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";
	import { cn } from "$lib/utils.js";
	import DrawerOverlay from "./drawer-overlay.svelte";
	import DrawerPortal from "./drawer-portal.svelte";
	import { getDrawerContext } from "./drawer-context.js";
	import type { ComponentProps } from "svelte";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: DrawerPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DrawerPortal>>;
	} = $props();

	const drawer = getDrawerContext();
	const direction = $derived(drawer?.direction ?? "bottom");
</script>

<DrawerPortal {...portalProps}>
	<DrawerOverlay />
	<DrawerPrimitive.Content
		bind:ref
		data-slot="drawer-content"
		data-swipe-direction={direction === "bottom" ? "down" : direction === "top" ? "up" : direction}
		data-swipe-axis={direction === "top" || direction === "bottom" ? "y" : "x"}
		class={cn(
			// parity-ignore: Use the current Base UI popup surface, viewport inset and sizing with Vaul positioning instead of the legacy Vaul surface.
			"cn-drawer-popup group/drawer-content group/drawer-popup fixed z-50 m-(--drawer-inset,0px) flex min-h-0 flex-col data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[calc(100dvh-6rem)] data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[calc(100dvh-6rem)] data-[swipe-axis=x]:flex-row data-[vaul-drawer-direction=left]:sm:max-w-96 data-[vaul-drawer-direction=right]:sm:max-w-96",
			className
		)}
		{...restProps}
	>
		{#if drawer?.showSwipeHandle}
			<!-- parity-ignore: Opt-in direction-aware swipe handle matches the current Base UI drawer instead of the always-visible Vaul bottom handle. -->
			<!-- parity-ignore: Current Base UI drawer separates the scrolling content from its popup surface and swipe handle. -->
		<div
				data-slot="drawer-swipe-handle"
				aria-hidden="true"
				class="cn-drawer-swipe-handle relative z-10 flex shrink-0 group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:order-last"
			></div>
		{/if}
		<div
			class="cn-drawer-content-base flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit]"
		>
			{@render children?.()}
		</div>
	</DrawerPrimitive.Content>
</DrawerPortal>
