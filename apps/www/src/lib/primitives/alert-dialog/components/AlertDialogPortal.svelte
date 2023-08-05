<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { AlertDialogPortalProps } from "../types";

	type $$Props = AlertDialogPortalProps;
	const { portal, open } = ctx.getPortal();
</script>

<div use:melt={$portal} {...$$restProps}>
	{#if $open}
		<slot />
	{/if}
</div>
