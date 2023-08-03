<script lang="ts">
	import { ctx, melt } from ".";

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
