<script lang="ts">
	import { Checkbox as CheckboxPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import Check from "@lucide/svelte/icons/check";
	import Minus from "@lucide/svelte/icons/minus";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(
		"border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer size-4 shrink-0 rounded-[4px] border outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked })}
		<div
			data-slot="checkbox-indicator"
			class="flex items-center justify-center text-current transition-none"
		>
			{#if checked}
				<Check class="size-3.5" />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>
