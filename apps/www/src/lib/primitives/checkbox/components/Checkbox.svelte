<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { CheckboxProps } from "../types";

	type $$Props = CheckboxProps;
	export let checked: CheckboxProps["checked"] = undefined;
	export let disabled: CheckboxProps["disabled"] = undefined;
	export let name: CheckboxProps["name"] = undefined;
	export let required: CheckboxProps["required"] = undefined;
	export let value: CheckboxProps["value"] = undefined;

	const {
		elements: { root, input },
		states: { checked: localChecked },
		updateOption
	} = ctx.set({
		defaultChecked: checked,
		disabled,
		name,
		required,
		value,
		onCheckedChange: ({ next }) => {
			checked = next;
			return next;
		}
	});

	$: checked !== undefined && localChecked.set(checked);

	$: updateOption("disabled", disabled);
	$: updateOption("name", name);
	$: updateOption("required", required);
	$: updateOption("value", value);
</script>

<button use:melt={$root} {...$$restProps}>
	<slot />
	<input use:melt={$input} />
</button>
