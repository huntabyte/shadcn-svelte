<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ListProps = $props();
</script>

<NavigationMenuPrimitive.List
	bind:ref
	data-slot="navigation-menu-list"
	class={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
	{...restProps}
/>
