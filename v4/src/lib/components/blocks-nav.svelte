<script lang="ts">
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import { page } from "$app/state";
	import { registryCategories } from "$lib/registry/registry-categories.js";
</script>

{#snippet BlocksNavLink({
	category,
	isActive,
}: {
	category: (typeof registryCategories)[number];
	isActive: boolean;
})}
	{#if !category.hidden}
		<a
			href="/blocks/{category.slug}"
			class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
			data-active={isActive}
		>
			{category.name}
		</a>
	{/if}
{/snippet}

<div class="relative overflow-hidden">
	<ScrollArea class="max-w-none" orientation="both" scrollbarXClasses="invisible">
		<div class="flex items-center">
			{@render BlocksNavLink({
				category: { name: "Featured", slug: "", hidden: false },
				isActive: page.url.pathname === "/blocks",
			})}
			{#each registryCategories as category (category.slug)}
				{@render BlocksNavLink({
					category,
					isActive: page.url.pathname === `/blocks/${category.slug}`,
				})}
			{/each}
		</div>
	</ScrollArea>
</div>
