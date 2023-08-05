<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { AlertDialogActionProps } from "./types";

	type $$Props = AlertDialogActionProps;
	export let asChild = false;
	const action = ctx.getClose();
</script>

{#if asChild}
	<slot action={$action} />
{:else}
	<button use:melt={$action} {...$$restProps}>
		<slot />
	</button>
{/if}
