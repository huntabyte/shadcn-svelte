<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "@huntabyte/primitives";
	import { Check, Minus } from "radix-icons-svelte";
	import { cn } from "$lib/utils";

	type $$Props = CheckboxPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CheckboxPrimitive.Root
	class={cn(
		"peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
		className
	)}
	{...$$restProps}
>
	<CheckboxPrimitive.Indicator
		class={cn("flex items-center justify-center text-current")}
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
