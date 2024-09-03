<script lang="ts">
	import {
		type ColumnDef,
		type ColumnFiltersState,
		type RowSelectionState,
		type SortingState,
		type TableOptions,
		type VisibilityState,
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
	} from "@tanstack/svelte-table";
	import { writable } from "svelte/store";
	import type { Task } from "../../(data)/schema.js";
	import Pagination from "./pagination.svelte";
	import Toolbar from "./toolbar.svelte";
	import * as Table from "$lib/registry/new-york/ui/table/index.js";

	export let defaultColumns: ColumnDef<Task>[];
	export let data: Task[];

	let rowSelection: RowSelectionState = {};
	let columnFilters: ColumnFiltersState = [];
	let columnVisibility: VisibilityState = {};
	let sorting: SortingState = [];

	const options = writable<TableOptions<Task>>({
		data,
		columns: defaultColumns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
		},
		enableRowSelection: true,
		onRowSelectionChange: (updater) => {
			if (updater instanceof Function) {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
			options.update((old) => ({
				...old,
				state: {
					...old.state,
					rowSelection,
				},
			}));
		},
		onSortingChange: (updater) => {
			if (updater instanceof Function) {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
			options.update((old) => ({
				...old,
				state: {
					...old.state,
					sorting,
				},
			}));
		},
		onColumnFiltersChange: (updater) => {
			if (updater instanceof Function) {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
			options.update((old) => ({
				...old,
				state: {
					...old.state,
					columnFilters,
				},
			}));
		},
		onColumnVisibilityChange: (updater) => {
			if (updater instanceof Function) {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
			options.update((old) => ({
				...old,
				state: {
					...old.state,
					columnVisibility,
				},
			}));
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	const table = createSvelteTable(options);
</script>

<div class="space-y-4">
	<Toolbar {table} />
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each $table.getHeaderGroups() as headerGroup}
					<Table.Row>
						{#each headerGroup.headers as header}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#if $table.getRowModel().rows.length}
					{#each $table.getRowModel().rows as row}
						<Table.Row data-state={row.getIsSelected() && "selected"}>
							{#each row.getVisibleCells() as cell}
								{#if cell.column.columnDef.id === "task"}
									<Table.Cell class="w-[80px]">
										<svelte:component
											this={flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										/>
									</Table.Cell>
								{:else}
									<Table.Cell>
										<svelte:component
											this={flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										/>
									</Table.Cell>
								{/if}
							{/each}
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={defaultColumns.length} class="h-24 text-center">
							No results.
						</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
	<Pagination {table} />
</div>
