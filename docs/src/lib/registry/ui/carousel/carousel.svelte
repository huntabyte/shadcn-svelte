<script lang="ts">
	import { useDirection } from "$lib/registry/ui/direction/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import {
		type CarouselAPI,
		type CarouselProps,
		type EmblaContext,
		setEmblaContext,
	} from "./context.js";

	let {
		ref = $bindable(null),
		opts = {},
		dir,
		plugins = [],
		setApi = () => {},
		orientation = "horizontal",
		class: className,
		children,
		...restProps
	}: WithElementRef<CarouselProps> = $props();

	const direction = useDirection();
	const resolvedDirection = $derived(opts.direction ?? dir ?? direction.current);

	// svelte-ignore state_referenced_locally
	let carouselState = $state<EmblaContext>({
		api: undefined,
		scrollPrev,
		scrollNext,
		orientation,
		canScrollNext: false,
		canScrollPrev: false,
		handleKeyDown,
		get options() {
			return { ...opts, direction: resolvedDirection };
		},
		plugins,
		onInit,
		scrollSnaps: [],
		selectedIndex: 0,
		scrollTo,
	});

	setEmblaContext(carouselState);

	function scrollPrev() {
		carouselState.api?.scrollPrev();
	}

	function scrollNext() {
		carouselState.api?.scrollNext();
	}

	function scrollTo(index: number, jump?: boolean) {
		carouselState.api?.scrollTo(index, jump);
	}

	function onSelect() {
		if (!carouselState.api) return;
		carouselState.selectedIndex = carouselState.api.selectedScrollSnap();
		carouselState.canScrollNext = carouselState.api.canScrollNext();
		carouselState.canScrollPrev = carouselState.api.canScrollPrev();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			if (resolvedDirection === "rtl") scrollNext();
			else scrollPrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			if (resolvedDirection === "rtl") scrollPrev();
			else scrollNext();
		}
	}

	function onInit(event: CustomEvent<CarouselAPI>) {
		carouselState.api = event.detail;
		setApi(carouselState.api);

		carouselState.scrollSnaps = carouselState.api.scrollSnapList();
		carouselState.api.on("select", onSelect);
		onSelect();
	}

	$effect(() => {
		return () => {
			carouselState.api?.off("select", onSelect);
		};
	});
</script>

<div
	bind:this={ref}
	dir={resolvedDirection}
	data-slot="carousel"
	class={cn("relative", className)}
	role="region"
	aria-roledescription="carousel"
	{...restProps}
>
	{@render children?.()}
</div>
