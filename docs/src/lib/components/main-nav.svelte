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
			aria-current={page.url.pathname === item.href ? "page" : undefined}
			class="h-8 gap-1.5 rounded-md border-0 px-2.5 text-sm font-medium text-black hover:bg-accent hover:text-accent-foreground active:translate-y-0 dark:text-white dark:hover:bg-accent/50 dark:hover:text-accent-foreground"
		>
			{item.title}
		</Button>
	{/each}
</nav>
