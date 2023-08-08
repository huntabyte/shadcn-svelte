<script lang="ts">
	import { Separator as SeparatorPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SeparatorPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let orientation: $$Props["orientation"] = "horizontal";
	export let decorative: $$Props["decorative"] = undefined;
</script>

<SeparatorPrimitive.Root
	class={cn(
		"shrink-0 bg-border",
		orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
		className
	)}
	{orientation}
	{decorative}
	{...$$restProps}
/>
