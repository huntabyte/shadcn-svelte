<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = ScrollAreaPrimitive.ScrollbarProps & {
		orientation?: "vertical" | "horizontal";
	};

	let className: $$Props["class"] = undefined;
	export let orientation: $$Props["orientation"] = "vertical";
	export { className as class };
</script>

<ScrollAreaPrimitive.Scrollbar
	{orientation}
	class={cn(
		"flex touch-none select-none transition-colors",
		orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
		orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
		className
	)}
>
	<slot />
	<ScrollAreaPrimitive.Thumb
		class={cn("bg-border relative rounded-full", orientation === "vertical" && "flex-1")}
	/>
</ScrollAreaPrimitive.Scrollbar>
