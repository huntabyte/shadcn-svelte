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
	let cancelled = false;

	function cancel() {
		cancelled = true;
		for (const { scroller } of positions) {
			scroller.removeEventListener("pointerdown", cancel);
			scroller.removeEventListener("touchstart", cancel);
			scroller.removeEventListener("wheel", cancel);
		}
	}

	for (const { scroller } of positions) {
		scroller.addEventListener("pointerdown", cancel, { passive: true, once: true });
		scroller.addEventListener("touchstart", cancel, { passive: true, once: true });
		scroller.addEventListener("wheel", cancel, { passive: true, once: true });
	}

	function restore() {
		if (cancelled) return;

		for (const { scroller, scrollLeft } of positions) {
			scroller.scrollLeft = scrollLeft;
		}

		if (performance.now() - startedAt < 2000) {
			requestAnimationFrame(restore);
		} else {
			cancel();
		}
	}

	requestAnimationFrame(restore);
}
