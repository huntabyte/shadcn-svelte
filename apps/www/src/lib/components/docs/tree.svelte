<script lang="ts">
	import type { TableOfContents } from "$lib/types/docs";
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";

	export let tree: TableOfContents = {
		items: []
	};
	export let level = 1;
</script>

<ul class={cn("m-0 list-none", { "pl-4": level !== 1 })}>
	{#if tree.items && tree.items.length}
		{#each tree.items as item, i (i)}
			<li class={cn("mt-0 pt-2")}>
				<a
					href={item.url}
					class={cn(
						"inline-block no-underline transition-colors hover:text-foreground",
						item.url === $page.url.hash
							? "font-medium text-foreground"
							: "text-muted-foreground"
					)}
				>
					{item.title}
				</a>
				{#if item.items && item.items.length}
					<svelte:self tree={item} level={level + 1} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
