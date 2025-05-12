<script lang="ts">
	import type { DocsConfig } from "$lib/config/docs.js";
	import DocsNavItems from "./docs-nav-items.svelte";

	let { config }: { config: DocsConfig } = $props();
</script>

{#if config.sidebarNav.length}
	<div class="flex flex-col gap-6">
		{#each config.sidebarNav as item, index (index)}
			<div class="flex flex-col gap-1">
				<h4 class="rounded-md px-2 py-1 text-sm font-medium">
					{item.title}
					{#if item.label}
						<span
							class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-normal leading-none text-[#000000] no-underline group-hover:no-underline"
						>
							{item.label}
						</span>
					{/if}
				</h4>
				{#if item.items?.length}
					<DocsNavItems items={item.items} />
				{/if}
			</div>
		{/each}
	</div>
{/if}
