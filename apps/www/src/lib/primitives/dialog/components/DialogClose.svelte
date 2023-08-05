<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { CloseProps } from "../types";

	type $$Props = CloseProps;
	export let asChild = false;
	const close = ctx.getClose();
</script>

{#if asChild}
	<slot close={$close} />
{:else}
	<button use:melt={$close} {...$$restProps}>
		<slot close={$close} />
	</button>
{/if}
