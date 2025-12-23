<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	let selectedValue = $state<string>("25");
	const selectedLabel = $derived(selectedValue);
</script>

<Example title="With Select">
	<div class="flex items-center justify-between gap-4">
		<Field.Field orientation="horizontal" class="w-fit">
			<Field.Label for="select-rows-per-page">Rows per page</Field.Label>
			<Select.Root type="single" bind:value={selectedValue}>
				<Select.Trigger class="w-20" id="select-rows-per-page">
					{selectedLabel}
				</Select.Trigger>
				<Select.Content align="start">
					<Select.Group>
						<Select.Item value="10">10</Select.Item>
						<Select.Item value="25">25</Select.Item>
						<Select.Item value="50">50</Select.Item>
						<Select.Item value="100">100</Select.Item>
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</Field.Field>
		<Pagination.Root class="mx-0 w-auto">
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.Previous href="#" />
				</Pagination.Item>
				<Pagination.Item>
					<Pagination.Next href="#" />
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</div>
</Example>
