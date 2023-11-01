<script lang="ts">
	import { Input } from "@/registry/new-york/ui/input";
	import { DataTableFacetedFilter, DataTableViewOptions } from ".";
	import type { AnyPlugins } from "svelte-headless-table/lib/types/TablePlugin";
	import type { Task } from "../(data)/schemas";
	import type { TableViewModel } from "svelte-headless-table/lib/createViewModel";
	import Button from "@/registry/new-york/ui/button/button.svelte";
	import { Cross2 } from "radix-icons-svelte";
	import { statuses, priorities } from "../(data)/data";

	export let tableModel: TableViewModel<Task, AnyPlugins>;

	const { pluginStates } = tableModel;
	const { filterValue } = pluginStates.filter;

	const { filterValues } = pluginStates.colFilter;
</script>

<pre>$filterValues = {JSON.stringify($filterValues, null, 2)}</pre>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="text"
			bind:value={$filterValue}
		/>
		<DataTableFacetedFilter title="Status" options={statuses} />
		<DataTableFacetedFilter title="Priority" options={priorities} />
		<Button variant="ghost" class="h-8 px-2 lg:px-3">
			Reset
			<Cross2 class="ml-2 h-4 w-4" />
		</Button>
	</div>

	<DataTableViewOptions {tableModel} />
</div>
