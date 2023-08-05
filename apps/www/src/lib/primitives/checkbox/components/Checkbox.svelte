<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { CheckboxProps } from "../types";

	type $$Props = CheckboxProps;
	export let checked: CheckboxProps["checked"] = undefined;
	export let defaultChecked: CheckboxProps["defaultChecked"] = undefined;
	export let onCheckedChange: CheckboxProps["onCheckedChange"] = undefined;
	export let disabled: CheckboxProps["disabled"] = undefined;
	export let name: CheckboxProps["name"] = undefined;
	export let required: CheckboxProps["required"] = undefined;
	export let value: CheckboxProps["value"] = undefined;

	const { root, input } = ctx.set({
		checked,
		defaultChecked,
		onCheckedChange,
		disabled,
		name,
		required,
		value
	});
</script>

<button use:melt={$root} {...$$restProps}>
	<slot />
	<input use:melt={$input} />
</button>
