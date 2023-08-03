<script lang="ts">
	import { cn } from "$lib/utils";
	import { writable } from "svelte/store";
	import { melt, ctx, type ProgressProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let max: ProgressProps["max"] = 100;
	export let defaultValue: ProgressProps["defaultValue"] = undefined;
	export let value: ProgressProps["value"] = writable(defaultValue);
	export let onValueChange: ProgressProps["onValueChange"] = undefined;

	const progress = ctx.getProgress({
		max,
		value,
		defaultValue,
		onValueChange
	});
</script>

<div
	use:melt={$progress}
	class={cn(
		"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
		className
	)}
	{...$$restProps}
>
	<div
		class="h-full w-full flex-1 bg-primary transition-all"
		style={`transform: translateX(-${
			100 - (100 * ($value ?? 0)) / (max ?? 1)
		}%)`}
	/>
</div>
