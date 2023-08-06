<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;
	export let disabled: $$Props["disabled"] = undefined;
	export let pressed: $$Props["pressed"] = undefined;

	const {
		elements: { root },
		states: { pressed: localPressed },
		updateOption
	} = ctx.set({
		disabled,
		defaultPressed: pressed,
		onPressedChange: ({ next }) => {
			pressed = next;
			return next;
		}
	});

	$: pressed !== undefined && localPressed.set(pressed);
	$: updateOption("disabled", disabled);
</script>

<button use:melt={$root} {...$$restProps}>
	<slot />
</button>
