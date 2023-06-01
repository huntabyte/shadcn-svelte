<script lang="ts">
	import { page } from "$app/stores";
	import { Button } from "$components/ui/button";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let items: { href: string; title: string }[] = [];
</script>

<nav
	class={cn(
		"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
		className
	)}
	{...$$restProps}
>
	{#each items as item, i (i)}
		<Button
			href={item.href}
			variant="ghost"
			class={cn(
				$page.url.pathname === item.href
					? "bg-muted hover:bg-muted"
					: "hover:bg-transparent hover:underline",
				"justify-start"
			)}
		>
			{item.title}
		</Button>
	{/each}
</nav>
