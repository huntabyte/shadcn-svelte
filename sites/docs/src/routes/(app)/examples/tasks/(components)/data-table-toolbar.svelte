<script lang="ts">
	import type { TableViewModel } from "svelte-headless-table";
	import Cross2 from "svelte-radix/Cross2.svelte";
	import type { Writable } from "svelte/store";
	import type { Table } from "@tanstack/table-core";
	import { priorities, statuses } from "../(data)/data.js";
	import type { Task } from "../(data)/schemas.js";
	import { DataTableFacetedFilter, DataTableViewOptions } from "./index.js";
	import Button from "$lib/registry/new-york/ui/button/button.svelte";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";

	let { table, data }: { table: Table<Task>; data: Task[] } = $props();

	const counts = data.reduce<{
		status: { [index: string]: number };
		priority: { [index: string]: number };
	}>(
		(acc, { status, priority }) => {
			acc.status[status] = (acc.status[status] || 0) + 1;
			acc.priority[priority] = (acc.priority[priority] || 0) + 1;
			return acc;
		},
		{
			status: {},
			priority: {},
		}
	);

	const { pluginStates } = tableModel;
	const {
		filterValue,
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues,
	}: {
		filterValues: Writable<{
			status: string[];
			priority: string[];
		}>;
	} = pluginStates.colFilter;

	const showReset = $derived(
		Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0)
	);

	if ($filterValues.status === undefined) {
		$filterValues.status = [];
	}
	if ($filterValues.priority === undefined) {
		$filterValues.priority = [];
	}
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
			onchange={(e) => {
				table.getColumn("title")?.setFilterValue(e.currentTarget.value);
			}}
			class="h-8 w-[150px] lg:w-[250px]"
		/>
		{#if table.getColumn("status")}
			<DataTableFacetedFilter
				column={table.getColumn("status")}
				title="Status"
				options={statuses}
			/>
		{/if}
		{#if table.getColumn("priority")}
			<DataTableFacetedFilter
				column={table.getColumn("priority")}
				title="Priority"
				options={priorities}
			/>
		{/if}
		{#if isFiltered}
			<Button
				variant="ghost"
				onclick={() => table.resetColumnFilters()}
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>
	<DataTableViewOptions {table} />
</div>
