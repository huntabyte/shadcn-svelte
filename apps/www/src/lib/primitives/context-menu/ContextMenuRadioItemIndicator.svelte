<script lang="ts">
	import type { RadioItemIndicatorProps } from "./types";
	import { ctx } from "./ctx";
	type $$Props = RadioItemIndicatorProps;
	const { isChecked, value } = ctx.getRadioIndicator();
</script>

<div {...$$restProps}>
	{#if $isChecked(value)}
		<slot />
	{/if}
</div>
