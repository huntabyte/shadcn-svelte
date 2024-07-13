<script lang="ts">
	import emblaCarouselSvelte from "embla-carousel-svelte";
	import { getEmblaContext } from "./context.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PrimitiveDivAttributes = $props();

	const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
</script>

<div
	class="overflow-hidden"
	use:emblaCarouselSvelte={{
		options: {
			container: "[data-embla-container]",
			slides: "[data-embla-slide]",
			...$options,
			axis: $orientation === "horizontal" ? "x" : "y",
		},
		plugins: $plugins,
	}}
	on:emblaInit={onInit}
>
	<div
		bind:this={ref}
		class={cn("flex", $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
		data-embla-container=""
		{...restProps}
	>
		{@render children?.()}
	</div>
</div>
