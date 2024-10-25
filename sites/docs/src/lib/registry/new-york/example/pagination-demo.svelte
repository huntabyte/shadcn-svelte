<script lang="ts">
	import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import { MediaQuery } from "runed";
	import * as Pagination from "$lib/registry/new-york/ui/pagination/index.js";

	const isDesktop = new MediaQuery("(min-width: 768px)");

	const count = 20;
	const perPage = $derived(isDesktop.matches ? 3 : 8);
	const siblingCount = $derived(isDesktop.matches ? 1 : 0);
</script>

<Pagination.Root {count} {perPage} {siblingCount}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton>
					<ChevronLeft class="size-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === "ellipsis"}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton>
					<span class="hidden sm:block">Next</span>
					<ChevronRight class="size-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
