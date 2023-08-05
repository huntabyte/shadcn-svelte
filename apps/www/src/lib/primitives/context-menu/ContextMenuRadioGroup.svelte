<script lang="ts">
	import { writable } from "svelte/store";
	import { ctx } from "./ctx";
	import type { RadioGroupProps } from "./types";
	import { melt } from "@melt-ui/svelte";

	type $$Props = RadioGroupProps;
	export let defaultValue: RadioGroupProps["defaultValue"] = undefined;
	export let value: RadioGroupProps["value"] = writable(defaultValue);
	export let onValueChange: RadioGroupProps["onValueChange"] = undefined;

	const radioGroup = ctx.setRadioGroup({
		defaultValue,
		value,
		onValueChange
	});
</script>

<div use:melt={$radioGroup} {...$$restProps}>
	<slot />
</div>
