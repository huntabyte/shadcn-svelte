<script lang="ts" module>
	import {
		columnFacetingFeature,
		columnFilteringFeature,
		columnVisibilityFeature,
		createFacetedRowModel,
		createFacetedUniqueValues,
		createFilteredRowModel,
		createPaginatedRowModel,
		createSortedRowModel,
		filterFn_includesString,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		tableFeatures,
	} from "@tanstack/svelte-table";

	export const features = tableFeatures({
		columnFilteringFeature,
		filteredRowModel: createFilteredRowModel(),
		filterFns: { includesString: filterFn_includesString },
		columnFacetingFeature,
		facetedRowModel: createFacetedRowModel(),
		facetedUniqueValues: createFacetedUniqueValues(),
		columnVisibilityFeature,
		rowPaginationFeature,
		paginatedRowModel: createPaginatedRowModel(),
		rowSelectionFeature,
		rowSortingFeature,
		sortedRowModel: createSortedRowModel(),
	});
</script>

<script lang="ts">
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import ChevronsLeftIcon from "@lucide/svelte/icons/chevrons-left";
	import ChevronsRightIcon from "@lucide/svelte/icons/chevrons-right";
	import {
		FlexRender,
		createTable,
		createTableState,
		renderComponent,
		renderSnippet,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type RowSelectionState,
		type SortingState,
		type ColumnVisibilityState,
		type Table as TableType,
	} from "@tanstack/svelte-table";
	import { createRawSnippet } from "svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import Checkbox from "$lib/registry/ui/checkbox/checkbox.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import ColumnHeader from "./data-table-column-header.svelte";
	import PriorityCell from "./data-table-priority-cell.svelte";
	import RowActions from "./data-table-row-actions.svelte";
	import StatusCell from "./data-table-status-cell.svelte";
	import TitleCell from "./data-table-title-cell.svelte";
	import DataTableToolbar from "./data-table-toolbar.svelte";
	import { type Task } from "../data/schemas.js";

	let { data }: { data: Task[] } = $props();

	const [rowSelection, setRowSelection] = createTableState<RowSelectionState>({});
	const [columnVisibility, setColumnVisibility] = createTableState<ColumnVisibilityState>({});
	const [columnFilters, setColumnFilters] = createTableState<ColumnFiltersState>([]);
	const [sorting, setSorting] = createTableState<SortingState>([]);
	const [pagination, setPagination] = createTableState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const columns: ColumnDef<typeof features, Task>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(value),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					"aria-label": "Select all",
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value: boolean) => row.toggleSelected(value),
					"aria-label": "Select row",
				}),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "id",
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: "Task",
				});
			},
			cell: ({ row }) => {
				const idSnippet = createRawSnippet<[{ id: string }]>((getId) => {
					const { id } = getId();
					return {
						render: () => `<div class="w-[80px]">${id}</div>`,
					};
				});

				return renderSnippet(idSnippet, {
					id: row.original.id,
				});
			},
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "title",
			header: ({ column }) => renderComponent(ColumnHeader, { column, title: "Title" }),
			cell: ({ row }) => {
				return renderComponent(TitleCell, {
					labelValue: row.original.label,
					value: row.original.title,
				});
			},
		},
		{
			accessorKey: "status",
			header: ({ column }) =>
				renderComponent(ColumnHeader, {
					column,
					title: "Status",
				}),
			cell: ({ row }) => {
				return renderComponent(StatusCell, {
					value: row.original.status,
				});
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id));
			},
		},
		{
			accessorKey: "priority",
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					title: "Priority",
					column,
				});
			},
			cell: ({ row }) => {
				return renderComponent(PriorityCell, {
					value: row.original.priority,
				});
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id));
			},
		},
		{
			id: "actions",
			cell: ({ row }) => renderComponent(RowActions, { row }),
		},
	];

	const table = createTable({
		features,
		get data() {
			return data;
		},
		state: {
			get sorting() {
				return sorting();
			},
			get columnVisibility() {
				return columnVisibility();
			},
			get rowSelection() {
				return rowSelection();
			},
			get columnFilters() {
				return columnFilters();
			},
			get pagination() {
				return pagination();
			},
		},
		columns,
		enableRowSelection: true,
		autoResetPageIndex: false,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
	});
</script>

{#snippet Pagination({ table }: { table: TableType<typeof features, Task> })}
	<div class="flex items-center justify-between px-2">
		<div class="flex-1 text-sm text-muted-foreground">
			{table.getFilteredSelectedRowModel().rows.length} of
			{table.getFilteredRowModel().rows.length} row(s) selected.
		</div>
		<div class="flex items-center space-x-6 lg:space-x-8">
			<div class="flex items-center space-x-2">
				<p class="text-sm font-medium">Rows per page</p>
				<Select.Root
					allowDeselect={false}
					type="single"
					value={`${table.atoms.pagination.get().pageSize}`}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<Select.Trigger class="h-8 w-[70px]">
						{String(table.atoms.pagination.get().pageSize)}
					</Select.Trigger>
					<Select.Content side="top">
						{#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
							<Select.Item value={`${pageSize}`}>
								{pageSize}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex w-[100px] items-center justify-center text-sm font-medium">
				Page {table.atoms.pagination.get().pageIndex + 1} of
				{table.getPageCount()}
			</div>
			<div class="flex items-center space-x-2">
				<Button
					variant="outline"
					class="hidden size-8 p-0 lg:flex"
					onclick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					<span class="sr-only">Go to first page</span>
					<ChevronsLeftIcon />
				</Button>
				<Button
					variant="outline"
					class="size-8 p-0"
					onclick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<span class="sr-only">Go to previous page</span>
					<ChevronLeftIcon />
				</Button>
				<Button
					variant="outline"
					class="size-8 p-0"
					onclick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<span class="sr-only">Go to next page</span>
					<ChevronRightIcon />
				</Button>
				<Button
					variant="outline"
					class="hidden size-8 p-0 lg:flex"
					onclick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					<span class="sr-only">Go to last page</span>
					<ChevronsRightIcon />
				</Button>
			</div>
		</div>
	</div>
{/snippet}

<div class="space-y-4">
	<DataTableToolbar {table} />
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<FlexRender {header} />
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && "selected"}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender {cell} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	{@render Pagination({ table })}
</div>
