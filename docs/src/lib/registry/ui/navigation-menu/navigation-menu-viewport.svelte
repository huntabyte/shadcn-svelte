<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div
	class={cn(
		"cn-navigation-menu-viewport-wrapper absolute start-0 top-full isolate z-50 flex justify-center"
	)}
>
	<!-- parity-ignore-upstream: h-(--radix-navigation-menu-viewport-height) md:w-(--radix-navigation-menu-viewport-width) | Bits viewport is sized 1rem larger than the measured content (kept from the initial port) -->
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			"cn-navigation-menu-viewport origin-top-center relative mt-1.5 w-full overflow-hidden",
			// parity-ignore: Bits viewport is sized 1rem larger than the measured content (kept from the initial port)
			"h-[calc(var(--bits-navigation-menu-viewport-height)+1rem)] md:w-[calc(var(--bits-navigation-menu-viewport-width)+1rem)]",
			className
		)}
		{...restProps}
	/>
</div>
