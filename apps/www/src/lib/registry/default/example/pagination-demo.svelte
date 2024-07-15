<script lang="ts">
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import { MediaQuery } from "runed";
	import * as Pagination from "$lib/registry/default/ui/pagination/index.js";

	const isDesktop = new MediaQuery("(min-width: 768px)");

	let count = 20;
	$: perPage = isDesktop.matches ? 3 : 8;
	$: siblingCount = isDesktop.matches ? 1 : 0;
</script>

<Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage>
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
</Pagination.Root>
