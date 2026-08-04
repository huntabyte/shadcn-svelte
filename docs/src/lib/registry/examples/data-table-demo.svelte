<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import {
		FlexRender,
		columnFilteringFeature,
		columnVisibilityFeature,
		createFilteredRowModel,
		createPaginatedRowModel,
		createSortedRowModel,
		createTable,
		createTableState,
		filterFn_includesString,
		renderComponent,
		renderSnippet,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		tableFeatures,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type RowSelectionState,
		type SortingState,
		type ColumnVisibilityState,
	} from "@tanstack/svelte-table";
	import { createRawSnippet } from "svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import DataTableActions from "./data-table/data-table-actions.svelte";
	import DataTableCheckbox from "./data-table/data-table-checkbox.svelte";
	import DataTableEmailButton from "./data-table/data-table-email-button.svelte";

	type Payment = {
		id: string;
		amount: number;
		status: "Pending" | "Processing" | "Success" | "Failed";
		email: string;
	};

	const data: Payment[] = [
		{
			id: "m5gr84i9",
			amount: 316,
			status: "Success",
			email: "ken99@yahoo.com",
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "Success",
			email: "Abe45@gmail.com",
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "Processing",
			email: "Monserrat44@gmail.com",
		},
		{
			id: "5kma53ae",
			amount: 874,
			status: "Success",
			email: "Silas22@gmail.com",
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "Failed",
			email: "carmella@hotmail.com",
		},
	];

	const features = tableFeatures({
		columnFilteringFeature,
		filteredRowModel: createFilteredRowModel(),
		filterFns: { includesString: filterFn_includesString },
		columnVisibilityFeature,
		rowPaginationFeature,
		paginatedRowModel: createPaginatedRowModel(),
		rowSelectionFeature,
		rowSortingFeature,
		sortedRowModel: createSortedRowModel(),
	});

	const columns: ColumnDef<typeof features, Payment>[] = [
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
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const statusSnippet = createRawSnippet<[{ status: string }]>((getStatus) => {
					const { status } = getStatus();
					return {
						render: () => `<div class="capitalize">${status}</div>`,
					};
				});
				return renderSnippet(statusSnippet, {
					status: row.original.status,
				});
			},
		},
		{
			accessorKey: "email",
			header: ({ column }) =>
				renderComponent(DataTableEmailButton, {
					onclick: column.getToggleSortingHandler(),
				}),
			cell: ({ row }) => {
				const emailSnippet = createRawSnippet<[{ email: string }]>((getEmail) => {
					const { email } = getEmail();
					return {
						render: () => `<div class="lowercase">${email}</div>`,
					};
				});

				return renderSnippet(emailSnippet, {
					email: row.original.email,
				});
			},
		},
		{
			accessorKey: "amount",
			header: () => {
				const amountHeaderSnippet = createRawSnippet(() => {
					return {
						render: () => `<div class="text-end">Amount</div>`,
					};
				});
				return renderSnippet(amountHeaderSnippet);
			},
			cell: ({ row }) => {
				const formatter = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				});

				const amountCellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
					const { amount } = getAmount();
					const formatted = formatter.format(amount);
					return {
						render: () => `<div class="text-end font-medium">${formatted}</div>`,
					};
				});
				return renderSnippet(amountCellSnippet, {
					amount: row.original.amount,
				});
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id }),
		},
	];

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
		autoResetPageIndex: false,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
	});
</script>

<div class="-mb-8 w-full">
	<div class="flex items-center py-4">
		<Input
			placeholder="Filter emails..."
			value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
			oninput={(e) => table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
			onchange={(e) => {
				table.getColumn("email")?.setFilterValue(e.currentTarget.value);
			}}
			class="max-w-sm"
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="ms-auto">
						Columns <ChevronDownIcon class="ms-2 size-4" />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				{#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column)}
					<DropdownMenu.CheckboxItem
						class="capitalize"
						bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
					>
						{column.id}
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head class="[&:has([role=checkbox])]:ps-3">
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
							<Table.Cell class="[&:has([role=checkbox])]:ps-3">
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
	<div class="flex items-center justify-end space-x-2 pt-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{table.getFilteredSelectedRowModel().rows.length} of
			{table.getFilteredRowModel().rows.length} row(s) selected.
		</div>
		<div class="space-x-2">
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				Previous
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				Next
			</Button>
		</div>
	</div>
</div>
