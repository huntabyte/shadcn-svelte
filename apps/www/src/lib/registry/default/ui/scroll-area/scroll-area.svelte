<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = ScrollAreaPrimitive.Props & {
		orientation?: "vertical" | "horizontal" | "both";
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let orientation = "vertical";
</script>

<ScrollAreaPrimitive.Root {...$$restProps} class={cn("relative overflow-hidden", className)}>
	<ScrollAreaPrimitive.Viewport class="h-full w-full rounded-[inherit]">
		<ScrollAreaPrimitive.Content>
			<slot />
		</ScrollAreaPrimitive.Content>
	</ScrollAreaPrimitive.Viewport>
	{#if orientation === "vertical" || orientation === "both"}
		<ScrollAreaPrimitive.Scrollbar orientation="vertical" />
	{/if}
	{#if orientation === "horizontal" || orientation === "both"}
		<ScrollAreaPrimitive.Scrollbar orientation="horizontal" />
	{/if}
	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
