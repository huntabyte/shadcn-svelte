<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { getContext } from "svelte";

	let {
		inset,
		class: className,
		...restProps
	}: DropdownMenuPrimitive.GroupHeadingProps & { inset?: boolean } = $props();

	const isSubmenu = (getContext<() => boolean>("picker-is-submenu") ?? (() => true))();
</script>

<DropdownMenuPrimitive.GroupHeading
	data-slot="dropdown-menu-label"
	data-inset={inset}
	class={cn(
		"px-2 py-1.5 text-xs font-medium data-inset:pl-8",
		isSubmenu ? "text-muted-foreground" : "text-neutral-400",
		className
	)}
	{...restProps}
/>
