<script lang="ts">
	import { Slider as SliderPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SliderPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: $$Props["value"] = [0];
</script>

<SliderPrimitive.Root
	bind:value
	class={cn(
		"relative flex w-full touch-none select-none items-center",
		className
	)}
	{...$$restProps}
>
	<span
		class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20"
	>
		<SliderPrimitive.Range class="absolute h-full bg-primary" />
	</span>
	<SliderPrimitive.Thumb
		class="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
	/>
</SliderPrimitive.Root>
