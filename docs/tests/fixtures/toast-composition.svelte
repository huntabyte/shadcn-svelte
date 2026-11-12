<script lang="ts">
	import ToastCustomList from "./toast-custom-list.svelte";
	import {
		ToastProvider,
		ToastPortal,
		ToastViewport,
		type ToastManager,
	} from "../../src/lib/registry/ui/toast/index.js";
	let { manager }: { manager: ToastManager } = $props();
</script>

<button id="trigger">Previous focus</button>
<ToastProvider toastManager={manager}
	><ToastPortal><ToastViewport><ToastCustomList /></ToastViewport></ToastPortal></ToastProvider
>
