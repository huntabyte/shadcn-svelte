<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";
	import { cn } from "$lib/utils.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	import DrawerOverlay from "./drawer-overlay.svelte";
	import DrawerPortal from "./drawer-portal.svelte";
	import type { ComponentProps } from "svelte";
	import { getDrawerContext } from "./drawer-context.js";

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
			"cn-drawer-popup group/drawer-content group/drawer-popup fixed z-50 m-(--drawer-inset,0px) flex min-h-0 flex-col data-[swipe-axis=x]:flex-row data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[calc(100dvh-6rem)] data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[calc(100dvh-6rem)] data-[vaul-drawer-direction=left]:sm:max-w-96 data-[vaul-drawer-direction=right]:sm:max-w-96",
			className
		)}
		{...restProps}
	>
		{#if drawer?.showSwipeHandle}
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
