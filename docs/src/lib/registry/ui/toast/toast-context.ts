import { getContext, setContext } from "svelte";
import type { ToastItem } from "./toast-manager.js";
import type { ToastStore } from "./toast-store.js";
const providerKey = Symbol.for("shadcn-svelte.toast.provider");
const rootKey = Symbol.for("shadcn-svelte.toast.root");
export type ProviderContext = { store: ToastStore; readonly version: number };
export type RootContext = {
	readonly toast: ToastItem;
	readonly index: number;
	readonly expanded: boolean;
	titleId?: string;
	descriptionId?: string;
};
export const setProvider = (value: ProviderContext) => setContext(providerKey, value);
export function getProvider(): ProviderContext {
	const context = getContext<ProviderContext>(providerKey);
	if (!context) throw new Error("Toast components must be inside ToastProvider or Toaster.");
	return context;
}
export const setRoot = (value: RootContext) => setContext(rootKey, value);
export function getRoot(): RootContext {
	const context = getContext<RootContext>(rootKey);
	if (!context) throw new Error("Toast parts must be inside Toast.");
	return context;
}
export function useToastManager() {
	const context = getProvider();
	return {
		get toasts() {
			void context.version;
			return context.store.toasts;
		},
		add: context.store.add,
		update: context.store.update,
		close: context.store.close,
		promise: context.store.promise,
	};
}
