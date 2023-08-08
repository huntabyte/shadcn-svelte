<script lang="ts">
	import { Progress as ProgressPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = ProgressPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let max: $$Props["max"] = 100;
	export let value: $$Props["value"] = undefined;
</script>

<ProgressPrimitive.Root
	class={cn(
		"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
		className
	)}
	{...$$restProps}
>
	<div
		class="h-full w-full flex-1 bg-primary transition-all"
		style={`transform: translateX(-${
			100 - (100 * (value ?? 0)) / (max ?? 1)
		}%)`}
	/>
</ProgressPrimitive.Root>
