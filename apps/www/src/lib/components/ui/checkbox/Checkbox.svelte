<script lang="ts">
	import {
		createCheckbox,
		melt,
		type CreateCheckboxProps
	} from "@melt-ui/svelte";
	import { Check, Minus } from "lucide-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let checked: CreateCheckboxProps["checked"] = undefined;
	export let defaultChecked: CreateCheckboxProps["defaultChecked"] =
		undefined;
	export let onCheckedChange: CreateCheckboxProps["onCheckedChange"] =
		undefined;
	export let disabled: CreateCheckboxProps["disabled"] = undefined;
	export let name: CreateCheckboxProps["name"] = undefined;
	export let required: CreateCheckboxProps["required"] = undefined;
	export let value: CreateCheckboxProps["value"] = undefined;

	const {
		elements: { root },
		helpers: { isChecked, isIndeterminate }
	} = createCheckbox({
		checked,
		defaultChecked,
		onCheckedChange,
		disabled,
		name,
		required,
		value
	});
</script>

<button
	use:melt={$root}
	class={cn(
		"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
		className
	)}
	{...$$restProps}
>
	<div class={cn("flex items-center justify-center text-current")}>
		{#if $isChecked}
			<Check class="h-4 w-4" />
		{:else if $isIndeterminate}
			<Minus class="h-4 w-4" />
		{/if}
	</div>
</button>
