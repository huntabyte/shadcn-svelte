<script lang="ts">
	import { Menubar as MenubarPrimitive } from "@huntabyte/bits-ui";
	import { cn, transition } from "$lib/utils";

	type $$Props = MenubarPrimitive.ContentProps;
	type $$Events = MenubarPrimitive.ContentEvents;

	let className: $$Props["class"] = undefined;
	export let sideOffset: $$Props["sideOffset"] = 4;
	export { className as class };
</script>

<MenubarPrimitive.Content
	{transition}
	{sideOffset}
	class={cn(
		"z-50 min-w-[12rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none",
		className
	)}
	{...$$restProps}
	on:keydown
>
	<slot />
</MenubarPrimitive.Content>
