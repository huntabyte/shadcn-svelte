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
import { createSubscriber } from "svelte/reactivity";

export * from "@tanstack/virtual-core";

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
	const originalSetOptions = virtualizer.setOptions.bind(virtualizer);
	const boundFns = new Map<PropertyKey, (...args: unknown[]) => unknown>();
	let notify = () => {};
	let version = $state(0);
	let lastScrollElement: TScrollElement | null = null;
	let lastRangeKey = "";
	let notifyQueued = false;

	const notifyChange = () => {
		version += 1;
		notify();
	};

	const rangeKey = (instance: Virtualizer<TScrollElement, TItemElement>) => {
		const range = instance.range;

		return `${instance.options.count}:${range?.startIndex ?? ""}:${range?.endIndex ?? ""}:${instance.getTotalSize()}`;
	};

	const scheduleNotify = (instance: Virtualizer<TScrollElement, TItemElement>) => {
		const nextRangeKey = rangeKey(instance);

		if (nextRangeKey === lastRangeKey) {
			return;
		}

		lastRangeKey = nextRangeKey;

		if (notifyQueued) {
			return;
		}

		notifyQueued = true;
		queueMicrotask(() => {
			notifyQueued = false;
			notifyChange();
		});
	};

	const setOptions = (options: Partial<VirtualizerOptions<TScrollElement, TItemElement>>) => {
		const resolvedOptions = {
			...virtualizer.options,
			...options,
			onChange: options.onChange,
		};

		originalSetOptions({
			...resolvedOptions,
			onChange: (instance, sync) => {
				scheduleNotify(instance);
				resolvedOptions.onChange?.(instance, sync);
			},
		});

		virtualizer._willUpdate();
	};

	const subscribe = createSubscriber((update) => {
		notify = update;
		setOptions(initialOptions);
		lastScrollElement = (initialOptions.getScrollElement?.() ?? null) as TScrollElement | null;
		lastRangeKey = rangeKey(virtualizer);
		const unmount = virtualizer._didMount();

		return () => {
			unmount();
		};
	});

	return new Proxy(virtualizer, {
		get(target, prop, receiver) {
			if (prop === "setOptions") {
				return setOptions;
			}

			subscribe();
			void version;
			void initialOptions.count;

			const scrollElement = (initialOptions.getScrollElement?.() ?? null) as TScrollElement | null;

			if (scrollElement !== lastScrollElement) {
				lastScrollElement = scrollElement;
				untrack(() => {
					virtualizer._willUpdate();
				});
			}

			const value = Reflect.get(target, prop, receiver);

			if (typeof value === "function") {
				const cached = boundFns.get(prop);

				if (cached) {
					return cached;
				}

				const bound = value.bind(target);
				boundFns.set(prop, bound);
				return bound;
			}

			return value;
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
