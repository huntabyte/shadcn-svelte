<script lang="ts">
	import { Menubar as MenubarPrimitive } from "@huntabyte/bits-ui";
	import { cn, transition } from "$lib/utils";

	type $$Props = MenubarPrimitive.SubContentProps;
	type $$Events = MenubarPrimitive.SubContentEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<MenubarPrimitive.SubContent
	{transition}
	transitionConfig={{ x: -10, y: 0 }}
	class={cn(
		"z-50 min-w-[9rem] rounded-md border bg-popover p-1 text-popover-foreground focus:outline-none",
		className
	)}
	{...$$restProps}
	on:focusout
	on:pointermove
	on:keydown
>
	<slot />
</MenubarPrimitive.SubContent>
