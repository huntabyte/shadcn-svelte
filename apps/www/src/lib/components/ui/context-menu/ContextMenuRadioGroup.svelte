<script lang="ts">
	import { writable } from "svelte/store";
	import { ctx, melt, type ContextRadioGroupProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: ContextRadioGroupProps["defaultValue"] = undefined;
	export let value: ContextRadioGroupProps["value"] = writable(defaultValue);
	export let onValueChange: ContextRadioGroupProps["onValueChange"] =
		undefined;

	const radioGroup = ctx.setRadioGroup({
		defaultValue,
		value,
		onValueChange
	});

	$: console.log($value);
</script>

<div use:melt={$radioGroup} class={className} {...$$restProps}>
	<slot />
</div>
