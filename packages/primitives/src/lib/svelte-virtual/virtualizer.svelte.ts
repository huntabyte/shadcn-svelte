import {
	Virtualizer,
	elementScroll,
	observeElementOffset,
	observeElementRect,
	observeWindowOffset,
	observeWindowRect,
	windowScroll,
	type PartialKeys,
	type VirtualizerOptions,
} from "@tanstack/virtual-core";
import { untrack } from "svelte";

export type SvelteVirtualizer<
	TScrollElement extends Element | Window,
	TItemElement extends Element,
> = Omit<Virtualizer<TScrollElement, TItemElement>, "setOptions"> & {
	setOptions: (options: Partial<VirtualizerOptions<TScrollElement, TItemElement>>) => void;
};

function useVirtualizerBase<TScrollElement extends Element | Window, TItemElement extends Element>(
	initialOptions: VirtualizerOptions<TScrollElement, TItemElement>
): SvelteVirtualizer<TScrollElement, TItemElement> {
	const virtualizer = new Virtualizer(initialOptions);
	const originalSetOptions = virtualizer.setOptions;

	// Bumped every time the virtualizer reports a change. Reading it inside the
	// proxy's `get` trap is what makes property access on the returned object
	// reactive, so templates re-run whenever the virtualizer updates.
	let version = $state(0);

	const setOptions = (options: Partial<VirtualizerOptions<TScrollElement, TItemElement>>) => {
		const resolvedOptions = {
			...virtualizer.options,
			...options,
			onChange: options.onChange,
		};
		originalSetOptions({
			...resolvedOptions,
			onChange: (instance, sync) => {
				version += 1;
				resolvedOptions.onChange?.(instance, sync);
			},
		});
		virtualizer._willUpdate();
		// Force an update in case the range didn't change (e.g. count increased
		// but scroll position stayed the same). Without this, `version` only
		// bumps when onChange fires (on range change), so changes like a new
		// count that don't shift the visible range would not trigger a re-render.
		version += 1;
	};

	$effect(() => {
		// Spreading evaluates any reactive getters on the options object (e.g.
		// `get count() { return items.length }`), so this effect re-runs whenever
		// one of those values changes.
		const options = { ...initialOptions };
		// Read the scroll element too, so binding it after mount (e.g. via
		// `bind:this`) re-runs `_willUpdate` and attaches the observers.
		options.getScrollElement();
		untrack(() => setOptions(options));
	});

	$effect(() => virtualizer._didMount());

	return new Proxy(virtualizer, {
		get(target, prop, receiver) {
			if (prop === "setOptions") return setOptions;
			// Subscribe the caller to changes.
			void version;
			return Reflect.get(target, prop, receiver);
		},
	}) as SvelteVirtualizer<TScrollElement, TItemElement>;
}

export function useVirtualizer<TScrollElement extends Element, TItemElement extends Element>(
	options: PartialKeys<
		VirtualizerOptions<TScrollElement, TItemElement>,
		"observeElementRect" | "observeElementOffset" | "scrollToFn"
	>
): SvelteVirtualizer<TScrollElement, TItemElement> {
	return useVirtualizerBase<TScrollElement, TItemElement>({
		observeElementRect: observeElementRect,
		observeElementOffset: observeElementOffset,
		scrollToFn: elementScroll,
		...options,
	});
}

export function useWindowVirtualizer<TItemElement extends Element>(
	options: PartialKeys<
		VirtualizerOptions<Window, TItemElement>,
		"getScrollElement" | "observeElementRect" | "observeElementOffset" | "scrollToFn"
	>
): SvelteVirtualizer<Window, TItemElement> {
	return useVirtualizerBase<Window, TItemElement>({
		getScrollElement: () => (typeof document !== "undefined" ? window : null),
		observeElementRect: observeWindowRect,
		observeElementOffset: observeWindowOffset,
		scrollToFn: windowScroll,
		initialOffset: () => (typeof document !== "undefined" ? window.scrollY : 0),
		...options,
	});
}
