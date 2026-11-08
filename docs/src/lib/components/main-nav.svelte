<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/registry/ui/button/button.svelte";
	import type { NavItem } from "$lib/navigation.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		items,
		class: className,
		...restProps
	}: {
		items: NavItem[];
		class?: string;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<nav class={cn("items-center gap-0", className)} {...restProps}>
	{#each items as item (item.href)}
		<Button
			href={item.href}
			variant="ghost"
			size="sm"
			class={cn(
				"h-8 gap-1.5 rounded-md px-2.5 text-sm font-medium active:translate-y-0",
				page.url.pathname === item.href && "text-primary"
			)}
		>
			{item.title}
		</Button>
	{/each}
</nav>
