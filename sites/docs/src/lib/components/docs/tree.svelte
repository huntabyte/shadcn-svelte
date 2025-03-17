<script lang="ts">
	import Tree from "./tree.svelte";
	import type { TableOfContents, TableOfContentsItem } from "$lib/types/docs.js";
	import { cn } from "$lib/utils.js";

	type Props = {
		tree?: TableOfContents | TableOfContentsItem;
		activeItem: string | undefined;
		level?: number;
	};

	let { tree = { items: [] }, activeItem, level = 1 }: Props = $props();
</script>

<ul class={cn("m-0 list-none", { "pl-4": level !== 1 })}>
	{#if tree.items && tree.items.length}
		{#each tree.items as item (item)}
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
					<Tree tree={item} level={level + 1} {activeItem} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
