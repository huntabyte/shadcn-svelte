<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { TriggerProps } from "../types";

	type $$Props = TriggerProps;
	export let asChild = false;
	const trigger = ctx.getTrigger();
</script>

{#if asChild}
	<slot trigger={$trigger} />
{:else}
	<button use:melt={$trigger} {...$$restProps}>
		<slot trigger={$trigger} />
	</button>
{/if}
