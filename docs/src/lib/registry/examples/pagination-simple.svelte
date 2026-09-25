<script lang="ts">
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
</script>

<Pagination.Root count={50} perPage={10} page={2}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			{#each pages as page (page.key)}
				{#if page.type !== "ellipsis"}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
