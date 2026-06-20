export function preservePickerScroll(target?: EventTarget | null) {
	if (typeof document === "undefined") return;

	const scrollers = new Set<HTMLElement>();
	const element = target instanceof HTMLElement ? target : null;
	const closestScroller = element?.closest('[data-slot="picker-scroll"]');

	if (closestScroller instanceof HTMLElement) {
		scrollers.add(closestScroller);
	} else {
		document
			.querySelectorAll<HTMLElement>('[data-slot="picker-scroll"]')
			.forEach((scroller) => scrollers.add(scroller));
	}

	if (scrollers.size === 0) return;

	const positions = Array.from(scrollers, (scroller) => ({
		scroller,
		scrollLeft: scroller.scrollLeft,
	}));
	const startedAt = performance.now();

	function restore() {
		for (const { scroller, scrollLeft } of positions) {
			scroller.scrollLeft = scrollLeft;
		}

		if (performance.now() - startedAt < 600) {
			requestAnimationFrame(restore);
		}
	}

	requestAnimationFrame(restore);
}
