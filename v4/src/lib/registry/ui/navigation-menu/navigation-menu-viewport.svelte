<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div class={cn("perspective-[2000px] absolute left-0 top-full isolate z-50 flex justify-center")}>
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--bits-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md border shadow transition-[width,_height] md:w-[var(--bits-navigation-menu-viewport-width)]",
			className
		)}
		{...restProps}
	/>
</div>
