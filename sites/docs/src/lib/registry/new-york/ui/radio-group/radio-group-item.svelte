<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import Circle from "@lucide/svelte/icons/circle";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> & {
		value: string;
	} = $props();
</script>

<RadioGroupPrimitive.Item
	bind:ref
	class={cn(
		"border-primary text-primary focus-visible:ring-ring aspect-square size-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<div class="flex items-center justify-center">
			{#if checked}
				<Circle class="fill-primary size-3.5" />
			{/if}
		</div>
	{/snippet}
</RadioGroupPrimitive.Item>
