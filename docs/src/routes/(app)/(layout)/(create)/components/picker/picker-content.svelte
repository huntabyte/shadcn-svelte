<script lang="ts">
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { setContext } from "svelte";

	let {
		ref = $bindable(null),
		sideOffset = 20,
		portalProps,
		class: className,
		submenu = false,
		...restProps
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<DropdownMenuPrimitive.PortalProps>;
		submenu?: boolean;
	} = $props();

	// Submenu items are theme-aware; standalone (non-submenu) items always use dark hardcoded colors.
	setContext("picker-is-submenu", submenu);
</script>

{#if submenu}
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.SubContent
			bind:ref
			data-slot="dropdown-menu-sub-content"
			{sideOffset}
			preventScroll={false}
			updatePositionStrategy="always"
			class={cn(
				"bg-popover/90 text-popover-foreground ring-foreground/10 z-50 w-52 rounded-md p-1 shadow-lg ring-1 backdrop-blur-xs",
				className
			)}
			{...restProps}
		/>
	</DropdownMenuPrimitive.Portal>
{:else}
	<DropdownMenuPrimitive.Portal {...portalProps}>
		<DropdownMenuPrimitive.Content
			bind:ref
			data-slot="dropdown-menu-content"
			{sideOffset}
			preventScroll={false}
			updatePositionStrategy="always"
			class={cn(
				"cn-menu-target no-scrollbar z-50 max-h-(--available-height) w-[calc(var(--available-width)-(--spacing(6)))] min-w-32 origin-(--transform-origin) translate-y-2 overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl outline-none data-[state=closed]:overflow-hidden md:w-52 dark:bg-neutral-800/90 dark:ring-neutral-700/50",
				className
			)}
			{...restProps}
		/>
	</DropdownMenuPrimitive.Portal>
{/if}
