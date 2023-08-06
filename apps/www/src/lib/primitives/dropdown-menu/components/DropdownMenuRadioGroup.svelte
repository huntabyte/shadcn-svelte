<script lang="ts">
	import { ctx } from "../ctx";
	import type { RadioGroupProps } from "../types";
	import { melt } from "@melt-ui/svelte";

	type $$Props = RadioGroupProps;
	export let value: $$Props["value"] = undefined;

	const {
		elements: { radioGroup },
		states: { value: localValue }
	} = ctx.setRadioGroup({
		defaultValue: value,
		onValueChange: ({ next }) => {
			if (next) {
				value = next;
			}
			return next;
		}
	});

	$: value !== undefined && localValue.set(value);
</script>

<div use:melt={$radioGroup} {...$$restProps}>
	<slot />
</div>
