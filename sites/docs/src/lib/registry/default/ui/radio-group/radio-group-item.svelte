<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import Circle from "lucide-svelte/icons/circle";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
	bind:ref
	class={cn(
		"border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square size-4 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<div class="flex items-center justify-center">
			{#if checked}
				<Circle class="size-2.5 fill-current text-current" />
			{/if}
		</div>
	{/snippet}
</RadioGroupPrimitive.Item>
