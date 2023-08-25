<script lang="ts">
	import { Popover as PopoverPrimitive } from "@huntabyte/bits-ui";
	import { cn, transition } from "$lib/utils";

	type $$Props = PopoverPrimitive.ContentProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<PopoverPrimitive.Content
	{transition}
	class={cn(
		"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
		className
	)}
	{...$$restProps}
>
	<slot />
</PopoverPrimitive.Content>
