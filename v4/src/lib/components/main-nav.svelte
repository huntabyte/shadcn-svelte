<script lang="ts">
	import Button from "$lib/registry/ui/button/button.svelte";
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import { page } from "$app/state";

	let {
		items,
		class: className,
		...restProps
	}: {
		items: { href: string; label: string }[];
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
			{item.label}
		</Button>
	{/each}
</nav>
