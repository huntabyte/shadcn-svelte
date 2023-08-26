<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import { Check, Minus } from "lucide-svelte";
	import { cn } from "$lib/utils";

	type $$Props = CheckboxPrimitive.Props;
	type $$Events = CheckboxPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = false;
	export { className as class };
</script>

<CheckboxPrimitive.Root
	bind:checked
	class={cn(
		"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
		className
	)}
	{...$$restProps}
	on:click
>
	<CheckboxPrimitive.Indicator
		class={cn("flex items-center justify-center text-current h-4 w-4")}
		let:isChecked
		let:isIndeterminate
	>
		{#if isChecked}
			<Check class="h-4 w-4" />
		{:else if isIndeterminate}
			<Minus class="h-4 w-4" />
		{/if}
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
