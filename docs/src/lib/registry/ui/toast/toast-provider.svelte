<script lang="ts" generics="Data extends object = object">
	import { onMount, type Snippet } from "svelte";
	import { setProvider } from "./toast-context.js";
	import { createToastStore } from "./toast-store.js";
	import type { ToastManager } from "./toast-manager.js";
	let {
		timeout = 5000,
		limit = 3,
		toastManager,
		children,
	}: {
		timeout?: number;
		limit?: number;
		toastManager?: ToastManager<Data>;
		children?: Snippet;
	} = $props();
	const store = createToastStore();
	let version = $state(0);
	setProvider({
		store,
		get version() {
			return version;
		},
	});
	onMount(() => {
		const unsubscribe = store.subscribe(() => version++);
		return () => {
			unsubscribe();
			store.dispose();
		};
	});
	$effect(() => {
		store.configure(timeout, limit);
	});
	$effect(() => store.attach(toastManager));
</script>

{@render children?.()}
