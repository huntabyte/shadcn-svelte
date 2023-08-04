<script lang="ts">
	import { type SwitchProps, melt, ctx } from ".";
	import { cn } from "$lib/utils";
	import { writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultChecked: SwitchProps["required"] = undefined;
	export let checked: SwitchProps["checked"] = undefined;
	export let onCheckedChange: SwitchProps["onCheckedChange"] = undefined;
	export let disabled: SwitchProps["disabled"] = undefined;
	export let name: SwitchProps["name"] = undefined;
	export let value: SwitchProps["value"] = undefined;

	const { root, isChecked } = ctx.get({
		checked,
		defaultChecked,
		onCheckedChange,
		disabled,
		name,
		value
	});
</script>

<button
	use:melt={$root}
	class={cn(
		"peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
		className
	)}
	{...$$restProps}
>
	<span
		data-state={$isChecked ? "checked" : "unchecked"}
		class={cn(
			"pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
		)}
	/>
</button>
