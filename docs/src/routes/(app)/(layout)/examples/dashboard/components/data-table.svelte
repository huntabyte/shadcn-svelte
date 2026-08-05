<script lang="ts" module>
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

	export const columns: ColumnDef<typeof features, Schema>[] = [
		{
			id: "drag",
			header: () => null,
			cell: () => null,
		},
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": "Select all",
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
					"aria-label": "Select row",
				}),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "header",
			header: "Header",
			cell: ({ row }) => renderComponent(DataTableCellViewer, { item: row.original }),
			enableHiding: false,
		},
		{
			accessorKey: "type",
			header: "Section Type",
			cell: ({ row }) => renderComponent(DataTableType, { row }),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => renderComponent(DataTableStatus, { row }),
		},
		{
			accessorKey: "target",
			header: () => renderComponent(DataTableHeaderTarget, {}),
			cell: ({ row }) => renderComponent(DataTableTarget, { row }),
		},
		{
			accessorKey: "limit",
			header: () => renderComponent(DataTableHeaderLimit, {}),
			cell: ({ row }) => renderComponent(DataTableLimit, { row }),
		},
		{
			accessorKey: "reviewer",
			header: "Reviewer",
			cell: ({ row }) => renderComponent(DataTableReviewer, { row }),
		},
		{
			id: "actions",
			cell: () => renderComponent(DataTableActions, {}),
		},
	];
</script>

<script lang="ts">
	import ChevronDownIcon from "@tabler/icons-svelte/icons/chevron-down";
	import ChevronLeftIcon from "@tabler/icons-svelte/icons/chevron-left";
	import ChevronRightIcon from "@tabler/icons-svelte/icons/chevron-right";
	import ChevronsLeftIcon from "@tabler/icons-svelte/icons/chevrons-left";
	import ChevronsRightIcon from "@tabler/icons-svelte/icons/chevrons-right";
	import LayoutColumnsIcon from "@tabler/icons-svelte/icons/layout-columns";
	import PlusIcon from "@tabler/icons-svelte/icons/plus";
	import { DragDropProvider } from "@dnd-kit-svelte/svelte";
	import { useSortable } from "@dnd-kit-svelte/svelte/sortable";
	import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
	import { move } from "@dnd-kit/helpers";
	import {
		FlexRender,
		columnFacetingFeature,
		columnFilteringFeature,
		columnVisibilityFeature,
		createFacetedRowModel,
		createFacetedUniqueValues,
		createFilteredRowModel,
		createPaginatedRowModel,
		createSortedRowModel,
		createTable,
		createTableState,
		filterFn_includesString,
		renderComponent,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		tableFeatures,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type Row,
		type RowSelectionState,
		type SortingState,
		type ColumnVisibilityState,
	} from "@tanstack/svelte-table";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import DataTableActions from "./data-table-actions.svelte";
	import DataTableCellViewer from "./data-table-cell-viewer.svelte";
	import DataTableCheckbox from "./data-table-checkbox.svelte";
	import DataTableDragHandle from "./data-table-drag-handle.svelte";
	import DataTableHeaderLimit from "./data-table-header-limit.svelte";
	import DataTableHeaderTarget from "./data-table-header-target.svelte";
	import DataTableLimit from "./data-table-limit.svelte";
	import DataTableReviewer from "./data-table-reviewer.svelte";
	import DataTableStatus from "./data-table-status.svelte";
	import DataTableTarget from "./data-table-target.svelte";
	import DataTableType from "./data-table-type.svelte";
	import type { Schema } from "./schemas.js";

	let { data }: { data: Schema[] } = $props();
	const [pagination, setPagination] = createTableState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sorting, setSorting] = createTableState<SortingState>([]);
	const [columnFilters, setColumnFilters] = createTableState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = createTableState<RowSelectionState>({});
	const [columnVisibility, setColumnVisibility] = createTableState<ColumnVisibilityState>({});

	const table = createTable({
		features,
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination();
			},
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
		},
		getRowId: (row) => row.id.toString(),
		enableRowSelection: true,
		autoResetPageIndex: false,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
	});

	const paginationState = $derived(table.atoms.pagination.get());
	const hideableColumns = $derived(
		table
			.getAllColumns()
			.filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
	);
	const headerGroups = $derived(table.getHeaderGroups());
	const rows = $derived(table.getRowModel().rows);
	const selectedRowCount = $derived(table.getFilteredSelectedRowModel().rows.length);
	const filteredRowCount = $derived(table.getFilteredRowModel().rows.length);
	const pageCount = $derived(table.getPageCount());
	const canPreviousPage = $derived(table.getCanPreviousPage());
	const canNextPage = $derived(table.getCanNextPage());

	let views = [
		{
			id: "outline",
			label: "Outline",
			badge: 0,
		},
		{
			id: "past-performance",
			label: "Past Performance",
			badge: 3,
		},
		{
			id: "key-personnel",
			label: "Key Personnel",
			badge: 2,
		},
		{
			id: "focus-documents",
			label: "Focus Documents",
			badge: 0,
		},
	];

	let view = $state("outline");
	let viewLabel = $derived(views.find((v) => view === v.id)?.label ?? "Select a view");
</script>

<Tabs.Root value="outline" class="w-full flex-col justify-start gap-6">
	<div class="flex items-center justify-between px-4 lg:px-6">
		<Label for="view-selector" class="sr-only">View</Label>
		<Select.Root type="single" bind:value={view}>
			<Select.Trigger class="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
				{viewLabel}
			</Select.Trigger>
			<Select.Content>
				{#each views as view (view.id)}
					<Select.Item value={view.id}>{view.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<Tabs.List
			class="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex"
		>
			{#each views as view (view.id)}
				<Tabs.Trigger value={view.id}>
					{view.label}
					{#if view.badge > 0}
						<Badge variant="secondary">{view.badge}</Badge>
					{/if}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		<div class="flex items-center gap-2">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" size="sm" {...props}>
							<LayoutColumnsIcon />
							<span class="hidden lg:inline">Customize Columns</span>
							<span class="lg:hidden">Columns</span>
							<ChevronDownIcon />
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end" class="w-56">
					{#each hideableColumns as column (column.id)}
						<DropdownMenu.CheckboxItem
							class="capitalize"
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}
						>
							{column.id}
						</DropdownMenu.CheckboxItem>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Button variant="outline" size="sm">
				<PlusIcon />
				<span class="hidden lg:inline">Add Section</span>
			</Button>
		</div>
	</div>
	<Tabs.Content value="outline" class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
		<div class="overflow-hidden rounded-lg border">
			<DragDropProvider
				modifiers={[
					// @ts-expect-error @dnd-kit/abstract types are botched atm
					RestrictToVerticalAxis,
				]}
				onDragEnd={(e) => (data = move(data, e))}
			>
				<Table.Root>
					<Table.Header class="sticky top-0 z-10 bg-muted">
						{#each headerGroups as headerGroup (headerGroup.id)}
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
					<Table.Body class="**:data-[slot=table-cell]:first:w-8">
						{#if rows.length}
							{#each rows as row (row.id)}
								{@render DraggableRow({ row })}
							{/each}
						{:else}
							<Table.Row>
								<Table.Cell colspan={columns.length} class="h-24 text-center">
									No results.
								</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>
			</DragDropProvider>
		</div>
		<div class="flex items-center justify-between px-4">
			<div class="hidden flex-1 text-sm text-muted-foreground lg:flex">
				{selectedRowCount} of {filteredRowCount} row(s) selected.
			</div>
			<div class="flex w-full items-center gap-8 lg:w-fit">
				<div class="hidden items-center gap-2 lg:flex">
					<Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
					<Select.Root
						type="single"
						bind:value={() => `${paginationState.pageSize}`, (v) => table.setPageSize(Number(v))}
					>
						<Select.Trigger size="sm" class="w-20" id="rows-per-page">
							{paginationState.pageSize}
						</Select.Trigger>
						<Select.Content side="top">
							{#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
								<Select.Item value={pageSize.toString()}>
									{pageSize}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex w-fit items-center justify-center text-sm font-medium">
					Page {paginationState.pageIndex + 1} of {pageCount}
				</div>
				<div class="ms-auto flex items-center gap-2 lg:ms-0">
					<Button
						variant="outline"
						class="hidden h-8 w-8 p-0 lg:flex"
						onclick={() => table.setPageIndex(0)}
						disabled={!canPreviousPage}
					>
						<span class="sr-only">Go to first page</span>
						<ChevronsLeftIcon />
					</Button>
					<Button
						variant="outline"
						class="size-8"
						size="icon"
						onclick={() => table.previousPage()}
						disabled={!canPreviousPage}
					>
						<span class="sr-only">Go to previous page</span>
						<ChevronLeftIcon />
					</Button>
					<Button
						variant="outline"
						class="size-8"
						size="icon"
						onclick={() => table.nextPage()}
						disabled={!canNextPage}
					>
						<span class="sr-only">Go to next page</span>
						<ChevronRightIcon />
					</Button>
					<Button
						variant="outline"
						class="hidden size-8 lg:flex"
						size="icon"
						onclick={() => table.setPageIndex(pageCount - 1)}
						disabled={!canNextPage}
					>
						<span class="sr-only">Go to last page</span>
						<ChevronsRightIcon />
					</Button>
				</div>
			</div>
		</div>
	</Tabs.Content>
	<Tabs.Content value="past-performance" class="flex flex-col px-4 lg:px-6">
		<div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
	</Tabs.Content>
	<Tabs.Content value="key-personnel" class="flex flex-col px-4 lg:px-6">
		<div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
	</Tabs.Content>
	<Tabs.Content value="focus-documents" class="flex flex-col px-4 lg:px-6">
		<div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
	</Tabs.Content>
</Tabs.Root>

{#snippet DraggableRow({ row }: { row: Row<typeof features, Schema> })}
	{@const { ref, isDragging, handleRef } = useSortable({
		id: row.original.id,
		index: () => row.index,
	})}

	<Table.Row
		data-state={row.getIsSelected() && "selected"}
		data-dragging={isDragging.current}
		class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
		{@attach ref}
	>
		{#each row.getVisibleCells() as cell (cell.id)}
			<Table.Cell>
				{#if cell.column.id === "drag"}
					<DataTableDragHandle attach={handleRef} />
				{:else}
					<FlexRender {cell} />
				{/if}
			</Table.Cell>
		{/each}
	</Table.Row>
{/snippet}
