<script lang="ts">
	import Button from "$lib/registry/ui/button/button.svelte";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { page } from "$app/state";
	import type { NavItem } from "$lib/navigation.js";

	let {
		items,
		class: className,
		...restProps
	}: {
		items: NavItem[];
		class?: string;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<nav class={cn("items-center gap-0.5", className)} {...restProps}>
	{#each items as item (item.href)}
		<Button
			href={item.href}
			variant="ghost"
			size="sm"
			class={cn(page.url.pathname === item.href && "text-primary")}
		>
			{item.title}
		</Button>
	{/each}
</nav>
