<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ItemProps } from "../types";

	type $$Props = ItemProps;

	export let value: $$Props["value"];
	export let disabled: $$Props["disabled"] = undefined;
	export let label: $$Props["label"] = undefined;
	const item = ctx.setItem(value);
</script>

<div use:melt={$item({ value, disabled, label })} {...$$restProps}>
	<slot>
		{label ? label : value}
	</slot>
</div>
