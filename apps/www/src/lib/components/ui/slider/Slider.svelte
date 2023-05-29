<script lang="ts">
	import type { SliderRootProps } from "radix-svelte";
	import { Slider as SliderPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: SliderRootProps["value"] = 0;
</script>

<SliderPrimitive.Root
	bind:value
	class={cn(
		"relative flex w-full touch-none select-none items-center",
		className
	)}
	{...$$restProps}
>
	<SliderPrimitive.Track
		class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
	>
		<SliderPrimitive.Range class="absolute h-full bg-primary" />
	</SliderPrimitive.Track>
	<SliderPrimitive.Thumb
		class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
	/>
</SliderPrimitive.Root>
