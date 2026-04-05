<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SeparatorProps = $props();

	const isSubmenu = getContext("picker-is-submenu") ?? true;
</script>

<DropdownMenuPrimitive.Separator
	bind:ref
	data-slot="dropdown-menu-separator"
	class={cn(
		"-mx-1.5 my-1.5 h-px",
		isSubmenu ? "bg-border" : "bg-neutral-600 dark:bg-neutral-700",
		className
	)}
	{...restProps}
/>
