<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		viewport = true,
		children,
		...restProps
	}: NavigationMenuPrimitive.RootProps & {
		viewport?: boolean;
	} = $props();
</script>

<NavigationMenuPrimitive.Root
	bind:ref
	data-slot="navigation-menu"
	class={cn(
		"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
		className
	)}
	{...restProps}
/>
