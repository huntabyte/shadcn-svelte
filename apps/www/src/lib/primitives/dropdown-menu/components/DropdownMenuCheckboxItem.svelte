<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { CheckboxItemProps } from "../types";

	type $$Props = CheckboxItemProps;
	export let checked: $$Props["checked"] = undefined;
	export let disabled: $$Props["disabled"] = undefined;

	const {
		elements: { checkboxItem },
		states: { checked: localChecked },
		updateOption
	} = ctx.setCheckboxItem({
		disabled,
		defaultChecked: checked,
		onCheckedChange: ({ next }) => {
			checked = next;
			return next;
		}
	});

	$: checked !== undefined && localChecked.set(checked);
	$: updateOption("disabled", disabled);
</script>

<div use:melt={$checkboxItem} {...$$restProps}>
	<slot />
</div>
