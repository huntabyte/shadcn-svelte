<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { TriggerProps } from "../types";

	type $$Props = TriggerProps;
	const trigger = ctx.getTrigger();
</script>

<button use:melt={$trigger} {...$$restProps}>
	<slot />
</button>
