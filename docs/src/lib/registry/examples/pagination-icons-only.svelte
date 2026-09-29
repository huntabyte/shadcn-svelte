<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const rowsPerPage = ["10", "25", "50", "100"];

	let perPage = $state("25");
</script>

<div class="flex items-center justify-between gap-4">
	<Field.Field orientation="horizontal" class="w-fit">
		<Field.Label for="select-rows-per-page">Rows per page</Field.Label>
		<Select.Root type="single" bind:value={perPage}>
			<Select.Trigger class="w-20" id="select-rows-per-page">
				<Select.Value />
			</Select.Trigger>
			<Select.Content align="start">
				<Select.Group>
					{#each rowsPerPage as rows (rows)}
						<Select.Item value={rows} label={rows}>{rows}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</Field.Field>
	<Pagination.Root count={100} perPage={Number(perPage)} class="mx-0 w-auto">
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
