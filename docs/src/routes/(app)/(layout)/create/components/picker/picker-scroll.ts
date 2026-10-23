let cancelActivePreservation: (() => void) | undefined;

type PickerScrollPosition = {
	scroller: HTMLElement;
	scrollLeft: number;
	scrollTop: number;
};

export function capturePickerScroll(target?: EventTarget | null): PickerScrollPosition[] {
	if (typeof document === "undefined") return [];

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

	return Array.from(scrollers, (scroller) => ({
		scroller,
		scrollLeft: scroller.scrollLeft,
		scrollTop: scroller.scrollTop,
	}));
}

export function preservePickerScroll(
	target?: EventTarget | null,
	captured?: PickerScrollPosition[]
) {
	const positions = captured ?? capturePickerScroll(target);
	if (positions.length === 0) return;

	cancelActivePreservation?.();
	const startedAt = performance.now();
	let cancelled = false;

	function cancel() {
		cancelled = true;
		if (cancelActivePreservation === cancel) cancelActivePreservation = undefined;
		for (const { scroller } of positions) {
			scroller.removeEventListener("pointerdown", cancel);
			scroller.removeEventListener("touchstart", cancel);
			scroller.removeEventListener("wheel", cancel);
		}
	}
	cancelActivePreservation = cancel;

	for (const { scroller } of positions) {
		scroller.addEventListener("pointerdown", cancel, { passive: true, once: true });
		scroller.addEventListener("touchstart", cancel, { passive: true, once: true });
		scroller.addEventListener("wheel", cancel, { passive: true, once: true });
	}

	function restore() {
		if (cancelled) return;

		for (const { scroller, scrollLeft, scrollTop } of positions) {
			scroller.scrollLeft = scrollLeft;
			scroller.scrollTop = scrollTop;
		}

		if (performance.now() - startedAt < 2000) {
			requestAnimationFrame(restore);
		} else {
			cancel();
		}
	}

	restore();
}
