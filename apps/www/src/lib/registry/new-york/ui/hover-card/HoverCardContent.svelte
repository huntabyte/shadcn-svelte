<script lang="ts">
	import { HoverCard as HoverCardPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = HoverCardPrimitive.ContentProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<HoverCardPrimitive.Content
	class={cn(
		"z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90 mt-3",
		className
	)}
	{...$$restProps}
>
	<slot />
</HoverCardPrimitive.Content>
