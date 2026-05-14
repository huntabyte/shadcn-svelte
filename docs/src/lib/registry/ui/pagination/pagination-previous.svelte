<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: PaginationPrimitive.PrevButtonProps = $props();
</script>

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(
		buttonVariants({ variant: "ghost", size: "default" }),
		"cn-pagination-previous",
		className
	)}
	{...restProps}
>
	<IconPlaceholder
		lucide="ChevronLeftIcon"
		tabler="IconChevronLeft"
		hugeicons="ArrowLeft01Icon"
		phosphor="CaretLeftIcon"
		remixicon="RiArrowLeftSLine"
		data-icon="inline-start"
	/>
	<span class="cn-pagination-previous-text hidden sm:block">Previous</span>
</PaginationPrimitive.PrevButton>
