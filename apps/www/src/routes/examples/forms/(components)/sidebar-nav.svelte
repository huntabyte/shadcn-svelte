<script lang="ts">
	import { cn } from "@/utils";
	import { page } from "$app/stores";
	import { Button } from "@/registry/new-york/ui/button";
	let className: string | undefined | null = undefined;
	export let items: { href: string; title: string }[];
	export { className as class };
</script>

<nav
	class={cn(
		"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
		className
	)}
>
	{#each items as item}
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
