<script lang="ts">
	import ToastAction from "./toast-action.svelte";
	import ToastClose from "./toast-close.svelte";
	import ToastContent from "./toast-content.svelte";
	import ToastDescription from "./toast-description.svelte";
	import ToastIcon from "./toast-icon.svelte";
	import ToastTitle from "./toast-title.svelte";
	import Toast from "./toast.svelte";
	import { useToastManager } from "./toast-context.js";
	const manager = useToastManager();
</script>

{#each manager.toasts as item (item.id)}
	<Toast toast={item}>
		<ToastContent>
			<ToastIcon type={item.type} />
			<div class="flex min-w-0 flex-1 flex-col gap-1"><ToastTitle /><ToastDescription /></div>
			<ToastAction /><ToastClose />
		</ToastContent>
	</Toast>
{/each}
