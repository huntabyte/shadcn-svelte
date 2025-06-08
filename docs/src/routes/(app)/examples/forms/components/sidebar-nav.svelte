<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { page } from "$app/state";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";

	let { items, class: className }: { items: { href: string; title: string }[]; class?: string } =
		$props();
</script>

<nav class={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
	{#each items as item (item)}
		{@const isActive = page.url.pathname === item.href}
		<Button
			href={item.href}
			variant="ghost"
			class={cn(
				buttonVariants({ variant: "ghost" }),
				isActive ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
				"justify-start"
			)}
			data-sveltekit-noscroll
		>
			{item.title}
		</Button>
	{/each}
</nav>
