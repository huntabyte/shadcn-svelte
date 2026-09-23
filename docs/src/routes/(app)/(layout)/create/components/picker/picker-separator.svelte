<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { getContext } from "svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SeparatorProps = $props();

	const isSubmenu = (getContext<() => boolean>("picker-is-submenu") ?? (() => false))();
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
