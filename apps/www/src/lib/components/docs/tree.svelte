<script lang="ts">
	import type { TableOfContents } from "$lib/types/docs.js";
	import { cn } from "$lib/utils.js";

	export let tree: TableOfContents = {
		items: [],
	};
	export let activeItem: string | undefined;
	export let level = 1;
</script>

<ul class={cn("m-0 list-none", { "pl-4": level !== 1 })}>
	{#if tree.items && tree.items.length}
		{#each tree.items as item, i (i)}
			<li class={cn("mt-0 pt-2")}>
				<a
					href={item.url}
					class={cn(
						"hover:text-foreground inline-block no-underline transition-colors",
						item.url === `#${activeItem}` ||
							item.items?.some((i) => i.url === `#${activeItem}`)
							? "text-foreground font-medium"
							: "text-muted-foreground"
					)}
				>
					{item.title}
				</a>
				{#if item.items && item.items.length}
					<svelte:self tree={item} level={level + 1} {activeItem} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
