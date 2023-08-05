<script lang="ts">
	import type { Props } from "../types";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";
	import type { HTMLDivAttributes } from "$primitives/internal";

	type $$Props = HTMLDivAttributes & Props;

	export let multiple: Props["multiple"] = false;
	export let disabled: Props["disabled"] = false;
	export let defaultValue: Props["defaultValue"] = undefined;
	export let value: Props["value"] = undefined;
	export let onValueChange: Props["onValueChange"] = undefined;

	const root = ctx.set({
		value,
		multiple,
		disabled,
		defaultValue,
		onValueChange
	});
</script>

<div use:melt={$root} {...$$restProps}>
	<slot />
</div>
