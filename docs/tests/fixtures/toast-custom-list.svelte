<script lang="ts">
	import {
		Toast,
		ToastContent,
		ToastTitle,
		ToastDescription,
		ToastAction,
		ToastClose,
		useToastManager,
	} from "../../src/lib/registry/ui/toast/index.js";
	const manager = useToastManager();
</script>

{#each manager.toasts as item (item.id)}
	<Toast toast={item}>
		{#snippet child({ props })}
			<section {...props}>
				<ToastContent><ToastTitle /><ToastDescription /><ToastAction /><ToastClose /></ToastContent>
			</section>
		{/snippet}
	</Toast>
{/each}
