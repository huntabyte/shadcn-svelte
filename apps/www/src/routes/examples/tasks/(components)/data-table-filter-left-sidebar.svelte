<script lang="ts">
	import Input from "@/registry/new-york/ui/input/input.svelte";
	import type { TableViewModel } from "svelte-headless-table/lib/createViewModel";
	import type { AnyPlugins } from "svelte-headless-table/lib/types/TablePlugin";
	import type { Writable } from "svelte/store";
	import { DataTableFacetedFilter } from ".";
	import { priorities, statuses } from "../(data)/data";
	import type { Task } from "../(data)/schemas";

	export let tableModel: TableViewModel<Task, AnyPlugins>;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			status: string[];
			priority: string[];
		}>;
	} = pluginStates.colFilter;
</script>

<aside class="relative col-span-2 border-r border-b p-2">
	<div class="sticky top-12">
		<div class="flex flex-col space-y-2">
			<span class="text-sm font-medium">Filters</span>
			<Input
				placeholder="Filter tasks..."
				class="h-8 w-full"
				type="text"
				bind:value={$filterValue}
			/>

			<DataTableFacetedFilter
				bind:filterValues={$filterValues.status}
				title="Status"
				view="list"
				options={statuses}
			/>

			<DataTableFacetedFilter
				bind:filterValues={$filterValues.priority}
				title="Priority"
				view="list"
				options={priorities}
			/>

			<!-- {#if showReset}
				<Button
					on:click={() => {
						$filterValues.status = [];
						$filterValues.priority = [];
					}}
					variant="ghost"
					class="h-8 px-2 lg:px-3"
				>
					Reset
					<Cross2 class="ml-2 h-4 w-4" />
				</Button>
			{/if} -->
		</div>
	</div>
</aside>
