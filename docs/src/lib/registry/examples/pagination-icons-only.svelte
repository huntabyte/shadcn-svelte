<script lang="ts">
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
</script>

<Pagination.Root count={100} perPage={10}>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton />
		</Pagination.Item>
		<Pagination.Item>
			<Pagination.NextButton />
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
