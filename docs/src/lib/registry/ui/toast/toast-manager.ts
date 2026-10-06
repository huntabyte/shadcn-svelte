import { toast as sonner } from "svelte-sonner";
import Toast from "./toast.svelte";
import type { Component } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ToastType = "success" | "info" | "warning" | "error" | "loading";
export type ToastId = string;
export type ToastOptions = {
	id?: ToastId;
	title?: string;
	description?: string;
	type?: ToastType;
	/** Milliseconds before dismissal. Zero keeps the toast open. */
	timeout?: number;
	priority?: "low" | "high";
	actionProps?: Omit<HTMLButtonAttributes, "children"> & { children: string };
	onClose?: () => void;
};
export type ToastItem = ToastOptions & { id: ToastId };
export type PromiseMessage<T> =
	| string
	| Omit<ToastOptions, "id" | "type">
	| ((value: T) => string | Omit<ToastOptions, "id" | "type">);
export type ToastPromiseOptions<T> = {
	loading: string | Omit<ToastOptions, "id" | "type">;
	success: PromiseMessage<T>;
	error: PromiseMessage<unknown>;
};

let managerCount = 0;

/** Adapts the stacked Base UI manager API to svelte-sonner's public custom renderer. */
export function createToastManager() {
	const toasterId = `shadcn-toast-${managerCount++}`;
	let count = 0;
	const records = new Map<ToastId, { item: ToastItem; notify: () => void }>();

	function render(item: ToastItem, notify: () => void) {
		sonner.custom(Toast as Component<{ item: ToastItem; close: () => void }>, {
			id: `${toasterId}:${item.id}`,
			toasterId,
			componentProps: { item, close: () => close(item.id) },
			duration: item.type === "loading" || item.timeout === 0 ? Infinity : item.timeout,
			important: item.priority === "high",
			onDismiss: notify,
			onAutoClose: notify,
		});
	}

	function add(options: ToastOptions): ToastId {
		const id = options.id ?? `${toasterId}-${count++}`;
		// Sonner's state is browser-only; never retain notification data between SSR requests.
		if (typeof window === "undefined") return id;
		const current = records.get(id);
		if (current) {
			update(id, options);
			return id;
		}
		const record = {
			item: { ...options, id },
			notify: () => {
				if (records.get(id) !== record) return;
				records.delete(id);
				record.item.onClose?.();
			},
		};
		records.set(id, record);
		render(record.item, record.notify);
		return id;
	}

	function update(id: ToastId, options: Partial<ToastOptions>): void {
		const record = records.get(id);
		if (!record) return;
		record.item = { ...record.item, ...options, id };
		render(record.item, record.notify);
	}

	function close(id?: ToastId): void {
		const ids = id === undefined ? [...records.keys()] : [id];
		for (const toastId of ids) {
			const record = records.get(toastId);
			if (!record) continue;
			sonner.dismiss(`${toasterId}:${toastId}`);
			record.notify();
		}
	}

	async function promise<T>(
		task: Promise<T> | (() => Promise<T>),
		options: ToastPromiseOptions<T>
	): Promise<T> {
		const loading =
			typeof options.loading === "string" ? { title: options.loading } : options.loading;
		const id = add({ ...loading, type: "loading" });
		function settle(
			message: PromiseMessage<T> | PromiseMessage<unknown>,
			value: T | unknown,
			type: "success" | "error"
		) {
			const result =
				typeof message === "function"
					? (message as (value: unknown) => string | ToastOptions)(value)
					: message;
			// Explicitly clear loading-only fields instead of leaking them into the settled toast.
			update(id, {
				title: undefined,
				description: undefined,
				actionProps: undefined,
				timeout: undefined,
				...(typeof result === "string" ? { title: result } : result),
				type,
			});
		}
		try {
			const result = await (typeof task === "function" ? task() : task);
			settle(options.success, result, "success");
			return result;
		} catch (error) {
			settle(options.error, error, "error");
			throw error;
		}
	}

	return { toasterId, add, update, close, promise };
}

export type ToastManager = ReturnType<typeof createToastManager>;
export const toast = createToastManager();
