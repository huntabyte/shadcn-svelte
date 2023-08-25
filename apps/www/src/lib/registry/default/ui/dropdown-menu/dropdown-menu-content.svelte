<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "@huntabyte/bits-ui";
	import { cn, transition } from "$lib/utils";

	type $$Props = DropdownMenuPrimitive.ContentProps;
	type $$Events = DropdownMenuPrimitive.ContentEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Content
	{transition}
	class={cn(
		"z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none",
		className
	)}
	{...$$restProps}
	on:keydown
>
	<slot />
</DropdownMenuPrimitive.Content>
