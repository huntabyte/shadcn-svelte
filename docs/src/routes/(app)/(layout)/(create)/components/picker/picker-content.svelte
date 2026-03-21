<script lang="ts">
	import { resolveInlineSide, useDirection, type LogicalSide } from "$lib/localization.svelte.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		sideOffset = 20,
		portalProps,
		class: className,
		side = "end",
		submenu = false,
		...restProps
	}: Omit<DropdownMenuPrimitive.ContentProps, "side"> & {
		portalProps?: WithoutChildrenOrChild<DropdownMenuPrimitive.PortalProps>;
		side?: LogicalSide;
		submenu?: boolean;
	} = $props();

	const direction = useDirection();
	const resolvedSide = $derived(resolveInlineSide(direction.current, side));
</script>

{#if submenu}
	<DropdownMenuPrimitive.SubContent
		bind:ref
		data-slot="dropdown-menu-sub-content"
		side={resolvedSide}
		{sideOffset}
		class={cn(
			"bg-popover/90 text-popover-foreground ring-foreground/10 z-50 w-auto min-w-[96px] rounded-md p-1 shadow-lg ring-1 backdrop-blur-xs",
			className
		)}
		{...restProps}
	/>
{:else}
	<DropdownMenuPrimitive.Portal {...portalProps}>
		<DropdownMenuPrimitive.Content
			bind:ref
			data-slot="dropdown-menu-content"
			side={resolvedSide}
			{sideOffset}
			class={cn(
				"cn-menu-target no-scrollbar z-50 max-h-(--available-height) w-[calc(var(--available-width)-(--spacing(6)))] min-w-32 origin-(--transform-origin) translate-y-2 overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl outline-none data-[state=closed]:overflow-hidden md:w-52 dark:bg-neutral-800/90 dark:ring-neutral-700/50",
				className
			)}
			{...restProps}
		/>
	</DropdownMenuPrimitive.Portal>
{/if}
