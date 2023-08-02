<script lang="ts">
	import { type CreateAccordionProps, ctx } from ".";

	export let multiple: CreateAccordionProps["multiple"] = false;
	export let disabled: CreateAccordionProps["disabled"] = false;
	export let defaultValue: CreateAccordionProps["defaultValue"] = undefined;
	export let value: CreateAccordionProps["value"] = undefined;
	export let onValueChange: CreateAccordionProps["onValueChange"] = undefined;

	const root = ctx.set({
		value,
		multiple,
		disabled,
		defaultValue,
		onValueChange
	});
</script>

<div use:root {...$root} {...$$restProps}>
	<slot />
</div>
