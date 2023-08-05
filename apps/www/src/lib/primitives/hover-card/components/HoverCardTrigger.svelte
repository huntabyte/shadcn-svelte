<script lang="ts">
	import { ctx, melt } from "../ctx";
	import type { TriggerProps } from "../types";

	type $$Props = TriggerProps;
	const trigger = ctx.getTrigger();
</script>

<svelte:element this={"a"} use:melt={$trigger} {...$$restProps}>
	<slot />
</svelte:element>
