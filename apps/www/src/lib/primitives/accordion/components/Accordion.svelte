<script lang="ts">
	import type { Props } from "../types";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";

	type $$Props = Props;

	export let multiple: $$Props["multiple"] = false;
	export let disabled: $$Props["disabled"] = false;
	export let value: $$Props["value"] = undefined;

	const {
		elements: { root },
		states: { value: localValue },
		updateOption
	} = ctx.set({
		multiple,
		disabled,
		defaultValue: value,
		onValueChange: ({ next }) => {
			value = next;
			return next;
		}
	});

	$: value !== undefined && localValue.set(value);

	$: updateOption("multiple", multiple);
	$: updateOption("disabled", disabled);
</script>

<div use:melt={$root} {...$$restProps}>
	<slot />
</div>
