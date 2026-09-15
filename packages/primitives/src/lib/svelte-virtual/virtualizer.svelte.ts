import { untrack } from "svelte";
import { createSubscriber } from "svelte/reactivity";
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

export * from "@tanstack/virtual-core";

export type SvelteVirtualizer<
	TScrollElement extends Element | Window,
	TItemElement extends Element,
> = Omit<Virtualizer<TScrollElement, TItemElement>, "setOptions"> & {
	setOptions: (options: Partial<VirtualizerOptions<TScrollElement, TItemElement>>) => void;
};

function useVirtualizerBase<
	TScrollElement extends Element | Window,
	TItemElement extends Element,
>(
	initialOptions: VirtualizerOptions<TScrollElement, TItemElement>
): SvelteVirtualizer<TScrollElement, TItemElement> {
	const virtualizer = new Virtualizer(initialOptions);
	const originalSetOptions = virtualizer.setOptions.bind(virtualizer);
	let notify = () => {};

	const setOptions = (options: Partial<VirtualizerOptions<TScrollElement, TItemElement>>) => {
		const resolvedOptions = {
			...virtualizer.options,
			...options,
			onChange: options.onChange,
		};

		originalSetOptions({
			...resolvedOptions,
			onChange: (instance, sync) => {
				notify();
				resolvedOptions.onChange?.(instance, sync);
			},
		});

		virtualizer._willUpdate();
	};

	const subscribe = createSubscriber((update) => {
		notify = update;
		setOptions(initialOptions);
		return virtualizer._didMount();
	});

	return new Proxy(virtualizer, {
		get(target, prop, receiver) {
			if (prop === "setOptions") {
				return setOptions;
			}

			subscribe();
			void initialOptions.count;
			void initialOptions.getScrollElement?.();

			untrack(() => {
				setOptions(initialOptions);
			});

			const value = Reflect.get(target, prop, receiver);
			return typeof value === "function" ? value.bind(target) : value;
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
