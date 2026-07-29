<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

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
</script>

{#if submenu}
	<DropdownMenuPrimitive.SubContent
		bind:ref
		data-slot="dropdown-menu-sub-content"
		{sideOffset}
		class={cn(
			"z-50 w-auto min-w-[96px] rounded-md bg-popover/90 p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur-xs",
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
				"cn-menu-target z-50 no-scrollbar max-h-(--available-height) w-[calc(var(--available-width)-(--spacing(6)))] min-w-32 origin-(--transform-origin) translate-y-2 overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 outline-none data-[state=closed]:overflow-hidden md:w-52 dark:bg-neutral-800 dark:ring-neutral-700/50 [&.cn-menu-translucent]:bg-neutral-950/80 [&.cn-menu-translucent]:backdrop-blur-xl dark:[&.cn-menu-translucent]:bg-neutral-800/90",
				className
			)}
			{...restProps}
		/>
	</DropdownMenuPrimitive.Portal>
{/if}
