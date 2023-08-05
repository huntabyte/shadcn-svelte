<script lang="ts">
	import { ctx } from "./ctx";
	import type { IndicatorProps } from "./types";
	const { isChecked, isIndeterminate } = ctx.getIndicator();

	type $$Props = IndicatorProps;
</script>

<div {...$$restProps}>
	<slot isChecked={$isChecked} isIndeterminate={$isIndeterminate} />
</div>
