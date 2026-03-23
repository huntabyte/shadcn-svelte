<script lang="ts">
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
</script>

<Pagination.Root count={100} perPage={10}>
	{#snippet children()}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.Previous />
			</Pagination.Item>
			<Pagination.Item>
				<Pagination.Next />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
