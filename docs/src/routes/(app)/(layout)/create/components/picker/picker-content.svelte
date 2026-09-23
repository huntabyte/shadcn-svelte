<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { setContext } from "svelte";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { usePreviewOverride } from "../preview-override-context.svelte.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		sideOffset = 20,
		portalProps,
		class: className,
		submenu = false,
		children,
		...restProps
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<DropdownMenuPrimitive.PortalProps>;
		submenu?: boolean;
		children?: Snippet;
	} = $props();

	// Submenu items are theme-aware; standalone (non-submenu) items always use dark hardcoded colors.
	setContext("picker-is-submenu", () => submenu);
	const previewOverride = usePreviewOverride();
	const isMobile = new IsMobile();
</script>

{#if submenu}
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.SubContent
			bind:ref
			data-slot="dropdown-menu-sub-content"
			{sideOffset}
			preventScroll={false}
			updatePositionStrategy="always"
			onmouseleave={previewOverride.clearOverride}
			onpointerleave={previewOverride.clearOverride}
			class={cn(
				"z-50 w-52 overflow-x-hidden rounded-md bg-popover/90 p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur-xs",
				className
			)}
			{...restProps}
		>
			{@render children?.()}
		</DropdownMenuPrimitive.SubContent>
	</DropdownMenuPrimitive.Portal>
{:else}
	<DropdownMenuPrimitive.Portal {...portalProps}>
		<DropdownMenuPrimitive.Content
			bind:ref
			data-slot="dropdown-menu-content"
			{sideOffset}
			customAnchor={isMobile.current ? '[data-slot="customizer-card"]' : undefined}
			preventScroll={false}
			updatePositionStrategy="always"
			onmouseleave={previewOverride.clearOverride}
			onpointerleave={previewOverride.clearOverride}
			{...restProps}
		>
			{#snippet child({ props, wrapperProps })}
				<div
					onmouseleave={previewOverride.clearOverride}
					onpointerleave={previewOverride.clearOverride}
					{...wrapperProps}
				>
					<div
						{...props}
						class={cn(
							"cn-menu-target z-50 no-scrollbar max-h-(--bits-dropdown-menu-content-available-height) w-[calc(100dvw-2rem)] origin-(--bits-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl outline-none md:w-52 md:min-w-32 md:translate-y-2 dark:bg-neutral-800/90 dark:ring-neutral-700/50 data-closed:overflow-hidden",
							className
						)}
					>
						{@render children?.()}
					</div>
				</div>
			{/snippet}
		</DropdownMenuPrimitive.Content>
	</DropdownMenuPrimitive.Portal>
{/if}
