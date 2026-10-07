/**
 * Svelte adaptation of Base UI Toast (https://github.com/mui/base-ui).
 * MIT License
 *
 * Copyright (c) 2019 Material-UI SAS
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
import {
	createToastManager,
	type ToastItem,
	type ToastOptions,
	type ToastUpdate,
	type ToastPromiseOptions,
	type ToastManager,
} from "./toast-manager.js";

type Timer = {
	handle?: ReturnType<typeof setTimeout>;
	start: number;
	remaining: number;
	delay: number;
};
export function createToastStore() {
	let toasts: ToastItem[] = [];
	let timeout = 5000;
	let limit = 3;
	let hovering = false;
	let focused = false;
	let isWindowFocused = true;
	let viewport: HTMLElement | null = null;
	let previousFocus: HTMLElement | null = null;
	const listeners = new Set<() => void>();
	const timers = new Map<string, Timer>();
	const manager = createToastManager();
	const publish = () => listeners.forEach((listener) => listener());
	const expanded = () => hovering || focused;
	const paused = () => expanded() || !isWindowFocused;
	function applyLimit() {
		let index = 0;
		toasts = toasts.map((item) =>
			item.transitionStatus === "ending" ? item : { ...item, limited: index++ >= limit }
		);
	}
	function clearTimer(id: string) {
		clearTimeout(timers.get(id)?.handle);
		timers.delete(id);
	}
	function schedule(id: string, delay: number) {
		clearTimer(id);
		if (delay <= 0) return;
		const timer: Timer = { start: Date.now(), remaining: delay, delay };
		if (!paused()) timer.handle = setTimeout(() => store.close(id), delay);
		timers.set(id, timer);
	}
	function pause() {
		for (const timer of timers.values()) {
			if (timer.handle === undefined) continue;
			clearTimeout(timer.handle);
			timer.handle = undefined;
			timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.start));
		}
	}
	function resume() {
		if (paused()) return;
		for (const [id, timer] of timers) {
			if (timer.handle !== undefined) continue;
			timer.remaining = timer.remaining > 0 ? timer.remaining : timer.delay;
			timer.start = Date.now();
			timer.handle = setTimeout(() => store.close(id), timer.remaining);
		}
	}
	function interaction() {
		paused() ? pause() : resume();
		publish();
	}
	const store = {
		get toasts() {
			return toasts;
		},
		get expanded() {
			return expanded();
		},
		get focused() {
			return focused;
		},
		get hovering() {
			return hovering;
		},
		get viewport() {
			return viewport;
		},
		get previousFocus() {
			return previousFocus;
		},
		subscribe(listener: () => void) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		configure(nextTimeout: number, nextLimit: number) {
			if (timeout === nextTimeout && limit === nextLimit) return;
			timeout = nextTimeout;
			limit = nextLimit;
			applyLimit();
			publish();
		},
		attach<Data extends object = object>(
			external: ToastManager<Data> = manager as ToastManager<Data>
		) {
			return external[" subscribe"]((event) => {
				switch (event.action) {
					case "add":
						store.add(event.options);
						break;
					case "update":
						store.update(
							event.id,
							typeof event.updates === "function"
								? (previous) => {
										const update = event.updates;
										return typeof update === "function"
											? update(previous as ToastItem<Data>)
											: update;
									}
								: event.updates
						);
						break;
					case "close":
						store.close(event.id);
						break;
					case "promise":
						event.setPromise(store.promise(event.task, event.options));
						break;
				}
			});
		},
		add(options: ToastOptions): string {
			const id = options.id || `toast-local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
			const existing = toasts.find((item) => item.id === id);
			if (existing && existing.transitionStatus !== "ending") {
				store.update(id, options, true);
				return id;
			}
			if (existing) {
				toasts = toasts.filter((item) => item.id !== id);
				clearTimer(id);
			}
			const item = { ...options, id, updateKey: 0, transitionStatus: "starting" as const };
			toasts = [item, ...toasts];
			applyLimit();
			if (item.type !== "loading") schedule(id, item.timeout ?? timeout);
			publish();
			return id;
		},
		update(id: string, updates: ToastUpdate | ((prev: ToastItem) => ToastUpdate), reset = false) {
			let previous = toasts.find((item) => item.id === id);
			if (!previous || previous.transitionStatus === "ending") return;
			const resolved = typeof updates === "function" ? updates(previous) : updates;
			previous = toasts.find((item) => item.id === id);
			if (!previous || previous.transitionStatus === "ending") return;
			const next = { ...previous, ...resolved, id, updateKey: (previous.updateKey ?? 0) + 1 };
			toasts = toasts.map((item) => (item.id === id ? next : item));
			const duration = next.timeout ?? timeout;
			if (next.type === "loading" || duration <= 0) clearTimer(id);
			else if (
				!timers.has(id) ||
				reset ||
				Object.hasOwn(resolved, "timeout") ||
				previous.type === "loading"
			)
				schedule(id, duration);
			publish();
		},
		measure(id: string, height: number, ref: HTMLElement) {
			const item = toasts.find((item) => item.id === id);
			if (
				!item ||
				item.transitionStatus === "ending" ||
				(item.height === height && item.ref === ref && !item.transitionStatus)
			)
				return;
			toasts = toasts.map((item) =>
				item.id === id ? { ...item, height, ref, transitionStatus: undefined } : item
			);
			publish();
		},
		close(id?: string) {
			const closing = toasts.filter(
				(item) => (id === undefined || item.id === id) && item.transitionStatus !== "ending"
			);
			if (!closing.length) return;
			const active = viewport?.ownerDocument.activeElement;
			const shouldFocus =
				typeof HTMLElement !== "undefined" &&
				active instanceof HTMLElement &&
				viewport?.contains(active) &&
				active.matches(":focus-visible");
			const currentIndex = toasts.findIndex((item) => item.id === id);
			const closingIds = new Set(closing.map((item) => item.id));
			for (const item of closing) clearTimer(item.id);
			toasts = toasts.map((item) =>
				closingIds.has(item.id) ? { ...item, transitionStatus: "ending", height: 0 } : item
			);
			applyLimit();
			if (!toasts.some((item) => item.transitionStatus !== "ending")) {
				hovering = false;
				focused = false;
			}
			publish();
			for (const item of closing) item.onClose?.();
			if (shouldFocus) {
				const next =
					id === undefined
						? undefined
						: (toasts.slice(currentIndex + 1).find((item) => item.transitionStatus !== "ending") ??
							toasts
								.slice(0, currentIndex)
								.reverse()
								.find((item) => item.transitionStatus !== "ending"));
				if (next) next.ref?.focus({ preventScroll: true });
				else store.restoreFocus();
			}
		},
		remove(id: string, expected?: ToastItem) {
			const item = toasts.find((item) => item.id === id);
			if (!item || (expected && item !== expected)) return;
			item.onRemove?.();
			toasts = toasts.filter((item) => item.id !== id);
			applyLimit();
			if (!toasts.length) {
				hovering = false;
				focused = false;
			}
			publish();
		},
		promise<T>(task: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> {
			const resolve = <V>(
				message: string | ToastUpdate | ((value: V) => string | ToastUpdate),
				value: V
			): ToastUpdate => {
				const result = typeof message === "function" ? message(value) : message;
				return typeof result === "string" ? { title: result } : result;
			};
			const id = store.add({ ...resolve(options.loading, undefined), type: "loading" });
			return task
				.then((result) => {
					const resolved = resolve(options.success, result);
					store.update(id, { ...resolved, type: "success", timeout: resolved.timeout });
					return result;
				})
				.catch((error: unknown) => {
					const resolved = resolve(options.error, error);
					store.update(id, { ...resolved, type: "error", timeout: resolved.timeout });
					throw error;
				});
		},
		setViewport(element: HTMLElement | null) {
			viewport = element;
		},
		setHovering(value: boolean) {
			if (hovering === value) return;
			hovering = value;
			interaction();
		},
		setFocused(value: boolean) {
			if (focused === value) return;
			focused = value;
			interaction();
		},
		setWindowFocused(value: boolean) {
			isWindowFocused = value;
			interaction();
		},
		saveFocus() {
			const active = viewport?.ownerDocument.activeElement;
			previousFocus = active instanceof HTMLElement ? active : null;
			publish();
		},
		restoreFocus() {
			previousFocus?.focus({ preventScroll: true });
		},
		dispose() {
			for (const id of timers.keys()) clearTimer(id);
			listeners.clear();
		},
	};
	return store;
}
export type ToastStore = ReturnType<typeof createToastStore>;
