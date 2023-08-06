<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;
	export let orientation: $$Props["orientation"] = undefined;
	export let activateOnFocus: $$Props["activateOnFocus"] = undefined;
	export let loop: $$Props["loop"] = undefined;
	export let autoSet: $$Props["autoSet"] = undefined;
	export let value: $$Props["value"] = undefined;

	const {
		elements: { root },
		states: { value: localValue },
		updateOption
	} = ctx.set({
		orientation,
		activateOnFocus,
		loop,
		autoSet,
		defaultValue: value,
		onValueChange: ({ next }) => {
			value = next;
			return next;
		}
	});

	$: value !== undefined && localValue.set(value);
	$: updateOption("orientation", orientation);
	$: updateOption("activateOnFocus", activateOnFocus);
	$: updateOption("loop", loop);
	$: updateOption("autoSet", autoSet);
</script>

<div use:melt={$root} {...$$restProps}>
	<slot />
</div>
