<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";
	import { setDrawerContext } from "./drawer-context.js";

	let {
		shouldScaleBackground = false,
		showSwipeHandle = false,
		direction = "bottom",
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		...restProps
	}: DrawerPrimitive.RootProps & {
		showSwipeHandle?: boolean;
	} = $props();

	setDrawerContext({
		get showSwipeHandle() {
			return showSwipeHandle;
		},
		get direction() {
			return direction;
		},
	});
</script>

<DrawerPrimitive.Root
	{shouldScaleBackground}
	{direction}
	bind:open
	bind:activeSnapPoint
	{...restProps}
/>
