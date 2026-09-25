<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	let rowsPerPage = $state("25");
</script>

<div class="flex items-center justify-between gap-4">
	<Field.Field orientation="horizontal" class="w-fit">
		<Field.Label for="select-rows-per-page">Rows per page</Field.Label>
		<Select.Root type="single" bind:value={rowsPerPage}>
			<Select.Trigger class="w-20" id="select-rows-per-page">
				{rowsPerPage}
			</Select.Trigger>
			<Select.Content align="start">
				<Select.Group>
					<Select.Item value="10" label="10">10</Select.Item>
					<Select.Item value="25" label="25">25</Select.Item>
					<Select.Item value="50" label="50">50</Select.Item>
					<Select.Item value="100" label="100">100</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</Field.Field>
	<Pagination.Root count={100} perPage={Number(rowsPerPage)} class="mx-0 w-auto">
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.Previous />
			</Pagination.Item>
			<Pagination.Item>
				<Pagination.Next />
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</div>
