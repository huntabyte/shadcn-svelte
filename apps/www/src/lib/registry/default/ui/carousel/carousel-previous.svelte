<script lang="ts">
	import { Button, type Props, buttonVariants } from "@/registry/default/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { ArrowLeft } from "lucide-svelte";
	import type { VariantProps } from "tailwind-variants";
	import { getEmblaContext } from "./context.js";

	type $$Props = Props;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>["variant"] = "outline";
	export let size: VariantProps<typeof buttonVariants>["size"] = "icon";

	const { orientation, canScrollPrev, scrollPrev, handleKeyDown } =
		getEmblaContext("<Carousel.Previous/>");
</script>

<Button
	{variant}
	{size}
	class={cn(
		"absolute h-8 w-8 rounded-full touch-manipulation",
		$orientation === "horizontal"
			? "-left-12 top-1/2 -translate-y-1/2"
			: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
		className
	)}
	disabled={!$canScrollPrev}
	on:click={scrollPrev}
	on:keydown={handleKeyDown}
	{...$$restProps}
>
	<ArrowLeft class="h-4 w-4" />
	<span class="sr-only">Previous slide</span>
</Button>
