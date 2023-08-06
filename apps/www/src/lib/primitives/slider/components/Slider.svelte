<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;

	export let disabled: $$Props["disabled"] = undefined;
	export let min: $$Props["min"] = undefined;
	export let max: $$Props["max"] = undefined;
	export let step: $$Props["step"] = undefined;
	export let orientation: $$Props["orientation"] = undefined;
	export let value: $$Props["value"] = undefined;

	const {
		elements: { root },
		states: { value: localValue },
		updateOption
	} = ctx.set({
		disabled,
		min,
		max,
		step,
		orientation,
		defaultValue: value,
		onValueChange: ({ next }) => {
			value = next;
			return next;
		}
	});

	$: value !== undefined && localValue.set(value);
	$: updateOption("disabled", disabled);
	$: updateOption("min", min);
	$: updateOption("max", max);
	$: updateOption("step", step);
	$: updateOption("orientation", orientation);
</script>

<span use:melt={$root} {...$$restProps}>
	<slot />
</span>
