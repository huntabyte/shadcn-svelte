import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ToastType = "success" | "info" | "warning" | "error" | "loading" | (string & {});
export type ToastId = string;
export type ToastMessage = string | number | Snippet;
export type ToastOptions<Data extends object = object> = {
	id?: ToastId;
	title?: ToastMessage;
	description?: ToastMessage;
	type?: ToastType;
	timeout?: number;
	priority?: "low" | "high";
	actionProps?: Omit<HTMLButtonAttributes, "children"> & { children?: ToastMessage };
	onClose?: () => void;
	onRemove?: () => void;
	data?: Data;
};
export type ToastItem<Data extends object = object> = ToastOptions<Data> & {
	id: ToastId;
	transitionStatus?: "starting" | "ending";
	updateKey?: number;
	limited?: boolean;
	height?: number;
	ref?: HTMLElement;
};
export type ToastUpdate<Data extends object = object> = Partial<Omit<ToastOptions<Data>, "id">>;
export type PromiseMessage<T, Data extends object = object> =
	| string
	| ToastUpdate<Data>
	| ((value: T) => string | ToastUpdate<Data>);
export type ToastPromiseOptions<T, Data extends object = object> = {
	loading: string | ToastUpdate<Data>;
	success: PromiseMessage<T, Data>;
	error: PromiseMessage<unknown, Data>;
};
export type ToastEvent<Data extends object = object> =
	| { action: "add"; options: ToastItem<Data> }
	| {
			action: "update";
			id: string;
			updates: ToastUpdate<Data> | ((prev: ToastItem<Data>) => ToastUpdate<Data>);
	  }
	| { action: "close"; id?: string }
	| {
			action: "promise";
			task: Promise<unknown>;
			options: ToastPromiseOptions<unknown, Data>;
			setPromise: (promise: Promise<unknown>) => void;
	  };
let count = 0;
export function createToastManager<Data extends object = object>() {
	const listeners = new Set<(event: ToastEvent<Data>) => void>();
	const emit = (event: ToastEvent<Data>) => listeners.forEach((listener) => listener(event));
	return {
		" subscribe": (listener: (event: ToastEvent<Data>) => void) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		add(options: ToastOptions<Data>): string {
			const id = options.id || `toast-${count++}`;
			emit({ action: "add", options: { ...options, id, transitionStatus: "starting" } });
			return id;
		},
		update(
			id: string,
			updates: ToastUpdate<Data> | ((prev: ToastItem<Data>) => ToastUpdate<Data>)
		) {
			emit({ action: "update", id, updates });
		},
		close(id?: string) {
			emit({ action: "close", id });
		},
		promise<T>(task: Promise<T>, options: ToastPromiseOptions<T, Data>): Promise<T> {
			let handled = task;
			emit({
				action: "promise",
				task,
				options: options as ToastPromiseOptions<unknown, Data>,
				setPromise: (promise) => {
					handled = promise as Promise<T>;
				},
			});
			return handled;
		},
	};
}
export type ToastManager<Data extends object = object> = ReturnType<
	typeof createToastManager<Data>
>;
export const toast = createToastManager();
