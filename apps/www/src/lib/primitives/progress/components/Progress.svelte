<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;

	export let max: $$Props["max"] = undefined;
	export let value: $$Props["value"] = undefined;

	const {
		elements: { root },
		states: { value: localValue },
		updateOption
	} = ctx.set({
		max,
		defaultValue: value,
		onValueChange: ({ next }) => {
			value = next;
			return next;
		}
	});

	$: value !== undefined && localValue.set(value);
	$: updateOption("max", max);
</script>

<div use:melt={$root} {...$$restProps}>
	<slot />
</div>
