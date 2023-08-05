<script lang="ts">
	import type { CheckboxItemProps } from "../types";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";

	type $$Props = CheckboxItemProps;
	export let checked: CheckboxItemProps["checked"] = undefined;
	export let disabled: CheckboxItemProps["disabled"] = undefined;
	export let defaultChecked: CheckboxItemProps["defaultChecked"] = undefined;
	export let onCheckedChange: CheckboxItemProps["onCheckedChange"] =
		undefined;

	const { checkboxItem } = ctx.getCheckboxItem({
		checked,
		disabled,
		defaultChecked,
		onCheckedChange
	});
</script>

<div use:melt={$checkboxItem} {...$$restProps}>
	<slot />
</div>
