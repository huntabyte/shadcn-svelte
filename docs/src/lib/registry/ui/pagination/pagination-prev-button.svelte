<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "../button/index.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		text = "Previous",
		...restProps
	}: PaginationPrimitive.PrevButtonProps & { text?: string } = $props();
</script>

{#snippet Fallback()}
	<IconPlaceholder
		lucide="ChevronLeftIcon"
		tabler="IconChevronLeft"
		hugeicons="ArrowLeftIcon"
		phosphor="CaretLeftIcon"
		remixicon="RiArrowLeftSLine"
		class={cn("cn-rtl-flip size-4", className)}
	/>
	<span>{text}</span>
{/snippet}

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(buttonVariants({ variant: "ghost" }), "cn-pagination-previous", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.PrevButton>
