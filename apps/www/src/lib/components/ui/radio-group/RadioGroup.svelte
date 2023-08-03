<script lang="ts">
	import { cn } from "$lib/utils";
	import { melt, ctx, type RadioGroupProps } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	export let required: RadioGroupProps["required"] = undefined;
	export let disabled: RadioGroupProps["disabled"] = undefined;
	export let defaultValue: RadioGroupProps["defaultValue"] = undefined;
	export let value: RadioGroupProps["value"] = undefined;
	export let onValueChange: RadioGroupProps["onValueChange"] = undefined;
	export let loop: RadioGroupProps["loop"] = undefined;
	export let orientation: RadioGroupProps["orientation"] = undefined;

	const root = ctx.set({
		required,
		disabled,
		defaultValue,
		value,
		onValueChange,
		loop,
		orientation
	});
</script>

<div use:melt={$root} class={cn("grid gap-2", className)} {...$$restProps}>
	<slot />
</div>
