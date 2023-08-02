<script lang="ts">
	import { melt, type CreateAccordionProps, accordion } from ".";

	export let multiple: CreateAccordionProps["multiple"] = false;
	export let disabled: CreateAccordionProps["disabled"] = false;
	export let defaultValue: CreateAccordionProps["defaultValue"] = undefined;
	export let value: CreateAccordionProps["value"] = undefined;
	export let onValueChange: CreateAccordionProps["onValueChange"] = undefined;

	const root = accordion.set({
		value,
		multiple,
		disabled,
		defaultValue,
		onValueChange
	});
</script>

<div use:melt={$root} {...$$restProps}>
	<slot />
</div>
