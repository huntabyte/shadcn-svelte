<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { LabelProps } from "../types";

	type $$Props = LabelProps;
	const { groupLabel, id } = ctx.getGroupLabel();
</script>

<div use:melt={$groupLabel(id)} {...$$restProps}>
	<slot />
</div>
