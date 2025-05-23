<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { NavigationMenu as NavigationMenuPrimitive, type WithoutChild } from "bits-ui";
	import NavigationMenuViewport from "./navigation-menu-viewport.svelte";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		viewport = true,
		class: className,
		children,
		...restProps
	}: WithoutChild<NavigationMenuPrimitive.RootProps> & { viewport?: boolean } = $props();
</script>

<NavigationMenuPrimitive.Root
	bind:ref
	bind:value
	data-slot="navigation-menu"
	data-viewport={viewport}
	class={cn(
		"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	{#if viewport}
		<NavigationMenuViewport />
	{/if}
</NavigationMenuPrimitive.Root>
