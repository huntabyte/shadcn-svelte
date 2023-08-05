<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { SubTriggerProps } from "../types";

	type $$Props = SubTriggerProps;
	const subTrigger = ctx.getSubTrigger();
</script>

<div use:melt={$subTrigger} {...$$restProps}>
	<slot />
</div>
