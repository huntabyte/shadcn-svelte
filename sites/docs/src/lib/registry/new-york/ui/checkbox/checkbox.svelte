<script lang="ts">
	import { Checkbox as CheckboxPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import Check from "svelte-radix/Check.svelte";
	import Minus from "svelte-radix/Minus.svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	class={cn(
		"border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content size-4 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
		className
	)}
	bind:checked
	bind:ref
	{...restProps}
>
	{#snippet children({ checked })}
		<span class="flex size-4 items-center justify-center text-current">
			{#if checked === "indeterminate"}
				<Minus class="size-3.5" />
			{:else}
				<Check class={cn("size-3.5", !checked && "text-transparent")} />
			{/if}
		</span>
	{/snippet}
</CheckboxPrimitive.Root>
