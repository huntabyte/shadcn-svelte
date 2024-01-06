<script lang="ts">
	import * as Pagination from "@/registry/default/ui/pagination";

	let count = 1000;
	let perPage = 30;
</script>

<Pagination.Root {count} {perPage} let:pages let:currentPage>
	<Pagination.Content>
		<Pagination.Item isActive={true}>
			<Pagination.PrevButton />
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === "ellipsis"}
				<Pagination.Item isActive={true}>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item isActive={currentPage == page.value}>
					<Pagination.Link
						{page}
						isActive={currentPage == page.value}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item isActive={true}>
			<Pagination.NextButton />
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
