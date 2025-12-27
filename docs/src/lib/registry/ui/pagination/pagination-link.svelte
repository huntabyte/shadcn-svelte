<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { buttonVariants, type ButtonSize } from "../button/index.js";

	type PaginationLinkProps = WithElementRef<Omit<HTMLAnchorAttributes, "href" | "type">> & {
		isActive?: boolean;
		size?: ButtonSize;
		href: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		isActive = false,
		size = "icon",
		href,
		children,
		...restProps
	}: PaginationLinkProps = $props();
</script>

<a
	bind:this={ref}
	{href}
	data-size={size}
	data-variant={isActive ? "outline" : "ghost"}
	class={cn(
		buttonVariants({ size, variant: isActive ? "outline" : "ghost" }),
		"cn-pagination-link",
		className
	)}
	aria-current={isActive ? "page" : undefined}
	data-slot="pagination-link"
	data-active={isActive}
	{...restProps}
>
	{@render children?.()}
</a>
