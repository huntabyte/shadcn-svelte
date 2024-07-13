<script lang="ts">
	import { Pagination as PaginationPrimitive, type WithoutChild } from "bits-ui";
	import { type Props, buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		size = "icon",
		isActive = false,
		page,
		children,
		...restProps
	}: WithoutChild<PaginationPrimitive.PageProps> &
		Props & {
			isActive: boolean;
		} = $props();
</script>

<PaginationPrimitive.Page
	{page}
	bind:ref
	class={cn(
		buttonVariants({
			variant: isActive ? "outline" : "ghost",
			size,
		}),
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{page.value}
	{/if}
</PaginationPrimitive.Page>
