<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { TriggerProps } from "../types";

	type $$Props = TriggerProps;
	export let asChild: boolean = false;
	const trigger = ctx.get().elements.trigger;
</script>

{#if !asChild}
	<button use:melt={$trigger} {...$$restProps}>
		<slot />
	</button>
{:else}
	<slot trigger={$trigger} />
{/if}
