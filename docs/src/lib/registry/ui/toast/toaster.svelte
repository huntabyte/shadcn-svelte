<script lang="ts" generics="Data extends object = object">
	import ToastList from "./toast-list.svelte";
	import ToastPortal from "./toast-portal.svelte";
	import ToastProvider from "./toast-provider.svelte";
	import ToastViewport from "./toast-viewport.svelte";
	import { toast, type ToastManager } from "./toast-manager.js";
	import type { Snippet } from "svelte";
	let {
		toastManager,
		timeout = 5000,
		limit = 3,
		children,
	}: {
		toastManager?: ToastManager<Data>;
		timeout?: number;
		limit?: number;
		children?: Snippet;
	} = $props();
	const manager = $derived((toastManager ?? toast) as ToastManager<Data>);
</script>

<ToastProvider toastManager={manager} {timeout} {limit}>
	{@render children?.()}
	<ToastPortal><ToastViewport><ToastList /></ToastViewport></ToastPortal>
</ToastProvider>
