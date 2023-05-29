<script lang="ts">
	import type { ProgressRootProps } from "radix-svelte";
	import { Progress as ProgressPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: ProgressRootProps["value"] = null;
	export let max: ProgressRootProps["max"] = 100;
</script>

<ProgressPrimitive.Root
	class={cn(
		"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
		className
	)}
	{value}
	{max}
	{...$$restProps}
>
	<ProgressPrimitive.Indicator
		class="h-full w-full flex-1 bg-primary transition-all"
		style={`transform: translateX(-${
			100 - (100 * (value ?? 0)) / (max ?? 1)
		}%)`}
	/>
</ProgressPrimitive.Root>
