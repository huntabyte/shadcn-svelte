<script lang="ts">
	import { ctx } from "../ctx";
	import type { IndicatorProps } from "../types";

	type $$Props = IndicatorProps;
	const { isChecked, isIndeterminate } = ctx.getIndicator();
</script>

<div {...$$restProps}>
	<slot isChecked={$isChecked} isIndeterminate={$isIndeterminate} />
</div>
