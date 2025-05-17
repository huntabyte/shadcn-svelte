<script lang="ts">
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import { cn } from "$lib/utils";
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		title,
		children,
		href,
		class: className,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes & { href: string }> = $props();
</script>

<li>
	<NavigationMenu.Link>
		{#snippet child()}
			<a
				{href}
				bind:this={ref}
				class={cn(
					"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
					className
				)}
				{...restProps}
			>
				<div class="text-sm font-medium leading-none">{title}</div>
				<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
					{@render children?.()}
				</p>
			</a>
		{/snippet}
	</NavigationMenu.Link>
</li>
