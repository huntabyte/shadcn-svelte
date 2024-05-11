<script lang="ts">
	import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import { mediaQuery } from "svelte-legos";
	import * as Pagination from "$lib/registry/new-york/ui/pagination/index.js";

	const isDesktop = mediaQuery("(min-width: 768px)");

	let count = 20;
	$: perPage = $isDesktop ? 3 : 8;
	$: siblingCount = $isDesktop ? 1 : 0;
</script>

<Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton>
				<ChevronLeft class="h-4 w-4" />
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
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
