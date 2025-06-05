<script lang="ts">
	import {
		type CarouselAPI,
		type CarouselProps,
		type EmblaContext,
		setEmblaContext,
	} from "./context.js";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		opts = {},
		plugins = [],
		setApi = () => {},
		orientation = "horizontal",
		class: className,
		children,
		...restProps
	}: WithElementRef<CarouselProps> = $props();

	let scrollSnaps = $state.raw<number[]>([]);
	let selectedIndex = $state<number>(0);
	let canScrollNext = $state<boolean>(false);
	let canScrollPrev = $state<boolean>(false);
	let api = $state.raw<CarouselAPI | undefined>(undefined);

	let carouselState = $state<EmblaContext>({
		get api() {
			return api;
		},
		scrollPrev,
		scrollNext,
		get orientation() {
			return orientation;
		},
		get canScrollNext() {
			return canScrollNext;
		},
		get canScrollPrev() {
			return canScrollPrev;
		},
		handleKeyDown,
		get options() {
			return opts;
		},
		get plugins() {
			return plugins;
		},
		onInit,
		get scrollSnaps() {
			return scrollSnaps;
		},
		get selectedIndex() {
			return selectedIndex;
		},
		scrollTo,
	});

	setEmblaContext(carouselState);

	function scrollPrev() {
		api?.scrollPrev();
	}

	function scrollNext() {
		api?.scrollNext();
	}

	function scrollTo(index: number, jump?: boolean) {
		api?.scrollTo(index, jump);
	}

	function onSelect() {
		if (!api) return;
		selectedIndex = api.selectedScrollSnap();
	}

	function onReInit() {
		if (!api) return;
		selectedIndex = api.selectedScrollSnap();
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

	function onInit(event: CustomEvent<CarouselAPI>) {
		api = event.detail;
		setApi(api);

		onSelect();
		api.on("select", onSelect);
		api.on("reInit", onReInit);
		scrollSnaps = api.scrollSnapList();
	}

	$effect(() => {
		return () => {
			api?.off("select", onSelect);
			api?.off("reInit", onReInit);
		};
	});
</script>

<div
	bind:this={ref}
	data-slot="carousel"
	class={cn("relative", className)}
	role="region"
	aria-roledescription="carousel"
	{...restProps}
>
	{@render children?.()}
</div>
