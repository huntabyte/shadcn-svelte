<script lang="ts">
	import { Pagination as PaginationPrimitive, type WithoutChild } from "bits-ui";
	import {
		type Props as ButtonProps,
		buttonVariants,
	} from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	type Props = WithoutChild<PaginationPrimitive.PageProps> &
		ButtonProps & {
			isActive?: boolean;
		};

	let {
		ref = $bindable(null),
		class: className,
		size = "icon",
		isActive = false,
		page,
		children,
		...restProps
	}: Props = $props();
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

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
	children={children || Fallback}
/>
