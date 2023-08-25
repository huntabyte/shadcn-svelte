<script lang="ts">
	import { LinkPreview as HoverCardPrimitive } from "@huntabyte/bits-ui";
	import { cn, transition } from "$lib/utils";

	type $$Props = HoverCardPrimitive.ContentProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<HoverCardPrimitive.Content
	{transition}
	class={cn(
		"z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none mt-3",
		className
	)}
	{...$$restProps}
>
	<slot />
</HoverCardPrimitive.Content>
