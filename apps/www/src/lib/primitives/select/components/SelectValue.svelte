<script lang="ts">
	import { ctx } from "../ctx";
	import type { ValueProps } from "../types";

	type $$Props = ValueProps;
	export let placeholder: $$Props["placeholder"] = "";
	const valueLabel = ctx.getValue();
</script>

<span {...$$restProps}>
	{$valueLabel ? $valueLabel : placeholder}
</span>
