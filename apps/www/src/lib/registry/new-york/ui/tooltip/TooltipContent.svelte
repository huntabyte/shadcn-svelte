<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = TooltipPrimitive.ContentProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let sideOffset: $$Props["sideOffset"] = 4;
</script>

<TooltipPrimitive.Content
	{sideOffset}
	class={cn(
		"z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
		className
	)}
	{...$$restProps}
>
	<slot />
</TooltipPrimitive.Content>
