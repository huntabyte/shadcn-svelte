<script lang="ts">
	import { Button } from "@/registry/new-york/ui/button";
	import { Input } from "@/registry/new-york/ui/input";
	import { MixerHorizontal } from "radix-icons-svelte";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
	import { DataTableFacetedFilter, DataTableViewOptions } from ".";
	import type { AnyPlugins } from "svelte-headless-table/lib/types/TablePlugin";
	import type { Task } from "../(data)/schemas";
	import type { TableViewModel } from "svelte-headless-table/lib/createViewModel";

	export let tableModel: TableViewModel<Task, AnyPlugins>;

	const { pluginStates, flatColumns } = tableModel;
	const { filterValue } = pluginStates.filter;
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="text"
			bind:value={$filterValue}
		/>
	</div>

	<DataTableFacetedFilter
		column={tableModel.getColumn("priority")}
		title="Status"
		options={statuses}
	/>
	<DataTableFacetedFilter
		column={tableModel.getColumn("status")}
		title="Status"
		options={statuses}
	/>

	<DataTableViewOptions {tableModel} />
</div>
