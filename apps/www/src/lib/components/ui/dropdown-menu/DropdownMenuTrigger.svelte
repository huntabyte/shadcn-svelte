<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { ctx, melt } from ".";
	export let asChild = false;

	type $$Props = HTMLButtonAttributes & {
		asChild?: boolean;
	};
	const trigger = ctx.getTrigger();
</script>

{#if asChild}
	<slot trigger={$trigger} />
{:else}
	<button use:melt={$trigger} {...$$restProps}>
		<slot trigger={$trigger} />
	</button>
{/if}
