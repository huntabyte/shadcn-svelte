<script lang="ts">
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";
	import type { TriggerProps } from "../types";

	type $$Props = TriggerProps;
	export let asChild = false;
	const trigger = ctx.getTrigger();
</script>

{#if asChild}
	<slot trigger={$trigger} />
{:else}
	<div use:melt={$trigger} {...$$restProps}>
		<slot trigger={$trigger} />
	</div>
{/if}
