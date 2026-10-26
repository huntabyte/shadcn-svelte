<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		sideOffset = 20,
		preventScroll = false,
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ContentProps = $props();
</script>

<DropdownMenuPrimitive.Portal>
	<DropdownMenuPrimitive.Content
		bind:ref
		data-slot="dropdown-menu-content"
		{sideOffset}
		{preventScroll}
		class={cn(
			"cn-menu-target z-40 no-scrollbar max-h-(--bits-dropdown-menu-content-available-height) w-[calc(var(--bits-dropdown-menu-content-available-width)-(--spacing(6)))] min-w-32 origin-(--bits-dropdown-menu-content-transform-origin) translate-y-2 overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl outline-none data-[state=closed]:overflow-hidden md:w-52 dark:bg-neutral-800/90 dark:ring-neutral-700/50",
			className
		)}
		{...restProps}
	/>
</DropdownMenuPrimitive.Portal>
