<script lang="ts">
	import DocsSidebarNavItems from "./docs-sidebar-nav-items.svelte";
	import type { SidebarNavItem } from "$lib/types/nav.js";
	import { cn } from "$lib/utils.js";

	export let items: SidebarNavItem[] = [];
</script>

{#if items.length}
	<div class="w-full">
		{#each items as item, index (index)}
			<div class={cn("pb-4")}>
				<h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
					{item.title}
				</h4>
				{#if item?.items}
					{#if item?.items?.length}
						<DocsSidebarNavItems items={item.items} />
					{/if}
				{/if}
			</div>
		{/each}
	</div>
{/if}
