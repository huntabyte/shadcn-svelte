<script lang="ts">
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		sideOffset = 4,
		portalProps,
		class: className,
		submenu = false,
		...restProps
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<DropdownMenuPrimitive.PortalProps>;
		submenu?: boolean;
	} = $props();
</script>

{#if submenu}
	<DropdownMenuPrimitive.SubContent
		bind:ref
		data-slot="dropdown-menu-content"
		{sideOffset}
		class={cn(
			"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground cn-menu-target ring-foreground/10 no-scrollbar z-50 max-h-(--available-height) w-[calc(var(--available-width)-(--spacing(3.5)))] min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border-0 p-1 shadow-md ring-1 duration-100 outline-none data-[state=closed]:overflow-hidden md:w-52",
			className
		)}
		{...restProps}
	/>
{:else}
	<DropdownMenuPrimitive.Portal {...portalProps}>
		<DropdownMenuPrimitive.Content
			bind:ref
			data-slot="dropdown-menu-content"
			{sideOffset}
			class={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground cn-menu-target ring-foreground/10 no-scrollbar z-50 max-h-(--available-height) w-[calc(var(--available-width)-(--spacing(3.5)))] min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border-0 p-1 shadow-md ring-1 duration-100 outline-none data-[state=closed]:overflow-hidden md:w-52",
				className
			)}
			{...restProps}
		/>
	</DropdownMenuPrimitive.Portal>
{/if}
