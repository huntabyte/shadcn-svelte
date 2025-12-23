<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
</script>

<Example title="Simple">
	<Pagination.Root>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.Link href="#">1</Pagination.Link>
			</Pagination.Item>
			<Pagination.Item>
				<Pagination.Link href="#" isActive>2</Pagination.Link>
			</Pagination.Item>
			<Pagination.Item>
				<Pagination.Link href="#">3</Pagination.Link>
			</Pagination.Item>
			<Pagination.Item>
				<Pagination.Link href="#">4</Pagination.Link>
			</Pagination.Item>
			<Pagination.Item>
				<Pagination.Link href="#">5</Pagination.Link>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</Example>
