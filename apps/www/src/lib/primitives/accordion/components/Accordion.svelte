<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { AccordionProps } from "../types";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";

	type $$Props = HTMLAttributes<HTMLDivElement> & AccordionProps;

	export let multiple: AccordionProps["multiple"] = false;
	export let disabled: AccordionProps["disabled"] = false;
	export let defaultValue: AccordionProps["defaultValue"] = undefined;
	export let value: AccordionProps["value"] = undefined;
	export let onValueChange: AccordionProps["onValueChange"] = undefined;

	const root = ctx.set({
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
