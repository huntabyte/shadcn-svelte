<script lang="ts">
	import emblaCarouselSvelte from "embla-carousel-svelte";
	import { setEmblaContex, type CarouselProps, type CarouselAPI } from "./context.js";
	import { cn } from "$lib/utils.js";
	import { writable } from "svelte/store";
	import { onDestroy } from "svelte";

	type $$Props = CarouselProps;

	export let opts = {};
	export let plugins: NonNullable<$$Props["plugins"]> = [];
	export let api: $$Props["api"] = undefined;
	export let orientation: NonNullable<$$Props["orientation"]> = "horizontal";

	let className: $$Props["class"] = undefined;
	export { className as class };

	const apiStore = writable<CarouselAPI | undefined>(undefined);
	const orientationStore = writable(orientation);
	const canScrollPrev = writable(false);
	const canScrollNext = writable(false);

	$: orientationStore.set(orientation);

	function scrollPrev() {
		api?.scrollPrev();
	}
	function scrollNext() {
		api?.scrollNext();
	}

	function onSelect(api: CarouselAPI) {
		if (!api) return;
		canScrollPrev.set(api.canScrollPrev());
		canScrollNext.set(api.canScrollNext());
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			scrollPrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			scrollNext();
		}
	}

	$: if (api) {
		onSelect(api);
		api.on("select", onSelect);
		api.on("reInit", onSelect);
	}

	setEmblaContex({
		api: apiStore,
		scrollPrev,
		scrollNext,
		orientation: orientationStore,
		canScrollNext,
		canScrollPrev,
		handleKeyDown
	});

	function onInit(event: CustomEvent<CarouselAPI>) {
		api = event.detail;
		apiStore.set(api);
	}

	onDestroy(() => {
		api?.off("select", onSelect);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn("relative", className)}
	use:emblaCarouselSvelte={{
		options: {
			container: "[data-embla-container]",
			slides: "[data-embla-slide]",
			...opts,
			axis: $orientationStore === "horizontal" ? "x" : "y"
		},
		plugins
	}}
	on:emblaInit={onInit}
	on:mouseenter
	on:mouseleave
	role="region"
	aria-roledescription="carousel"
	{...$$restProps}
>
	<slot />
</div>
