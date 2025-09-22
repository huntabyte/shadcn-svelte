<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div class={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			"origin-top-center relative mt-1.5 h-(--bits-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-(--bits-navigation-menu-viewport-width)",
			className
		)}
		{...restProps}
	/>
</div>
