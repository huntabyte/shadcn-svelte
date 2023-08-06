<script lang="ts">
	import type { CheckboxItemIndicatorProps } from "../types";
	import { ctx } from "../ctx";

	type $$Props = CheckboxItemIndicatorProps;
	const checked = ctx.getCheckboxIndicator();
</script>

<div {...$$restProps}>
	{#if $checked}
		<slot checked={$checked} />
	{/if}
</div>
