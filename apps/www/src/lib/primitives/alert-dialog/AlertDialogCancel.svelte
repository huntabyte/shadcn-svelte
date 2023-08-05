<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { AlertDialogCancelProps } from "./types";

	type $$Props = AlertDialogCancelProps;

	export let asChild = false;
	const cancel = ctx.getClose();
</script>

{#if asChild}
	<slot cancel={$cancel} />
{:else}
	<button use:melt={$cancel} on:m-click on:m-keydown {...$$restProps}>
		<slot cancel={$cancel} />
	</button>
{/if}
