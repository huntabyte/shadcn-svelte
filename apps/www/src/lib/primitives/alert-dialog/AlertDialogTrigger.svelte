<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type $$Props = HTMLButtonAttributes & {
		asChild?: boolean;
	};

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
