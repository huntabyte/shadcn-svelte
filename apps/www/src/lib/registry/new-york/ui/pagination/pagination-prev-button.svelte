<script lang="ts">
	import { Pagination as PaginationPrimitive, type WithoutChild } from "bits-ui";
	import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<PaginationPrimitive.PrevButtonProps> = $props();
</script>

<PaginationPrimitive.PrevButton {...restProps} bind:ref>
	{#snippet child({ props })}
		<Button variant="ghost" class={cn("gap-1 pl-2.5", className)} {...props}>
			{#if children}
				{@render children?.()}
			{:else}
				<ChevronLeft class="size-4" />
				<span>Previous</span>
			{/if}
		</Button>
	{/snippet}
</PaginationPrimitive.PrevButton>
