<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { getContext } from "svelte";

	let {
		inset,
		variant = "default",
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
		variant?: "default" | "destructive";
	} = $props();

	const isSubmenu = getContext("picker-is-submenu") ?? true;
</script>

<DropdownMenuPrimitive.Item
	data-slot="dropdown-menu-item"
	data-inset={inset}
	data-variant={variant}
	class={cn(
		"group/dropdown-menu-item relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		isSubmenu
			? "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground"
			: "**:text-neutral-100 focus:bg-neutral-600 focus:text-neutral-100 focus:**:text-neutral-100 dark:focus:bg-neutral-700/80",
		className
	)}
	{...restProps}
/>
