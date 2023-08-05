<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { TriggerProps } from "../types";
	type $$Props = TriggerProps;

	const { trigger, props } = ctx.getTrigger();
</script>

<button use:melt={$trigger(props)} {...$$restProps} on:m-click on:m-keydown>
	<slot />
</button>
