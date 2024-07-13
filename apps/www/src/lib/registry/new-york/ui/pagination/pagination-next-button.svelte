<script lang="ts">
	import { Pagination as PaginationPrimitive, type WithoutChild } from "bits-ui";
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<PaginationPrimitive.NextButtonProps> = $props();
</script>

<PaginationPrimitive.NextButton bind:ref {...restProps}>
	{#snippet child({ props })}
		<Button variant="ghost" class={cn("gap-1 pr-2.5", className)} {...props}>
			{#if children}
				{@render children?.()}
			{:else}
				<span>Next</span>
				<ChevronRight class="size-4" />
			{/if}
		</Button>
	{/snippet}
</PaginationPrimitive.NextButton>
