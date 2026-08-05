<script lang="ts" module>
	import {
		columnFilteringFeature,
		columnVisibilityFeature,
		createFilteredRowModel,
		createPaginatedRowModel,
		createSortedRowModel,
		filterFn_includesString,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		tableFeatures,
	} from "@tanstack/svelte-table";

	export type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};

	export const features = tableFeatures({
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
</script>

<script lang="ts">
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
	} from "@tanstack/svelte-table";
	import { createRawSnippet } from "svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import ActionsCell from "./payments-actions-cell.svelte";
	import EmailHeader from "./payments-email-header.svelte";

	const data: Payment[] = [
		{
			id: "m5gr84i9",
			amount: 316,
			status: "success",
			email: "ken99@example.com",
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "success",
			email: "Abe45@example.com",
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "processing",
			email: "Monserrat44@example.com",
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "failed",
			email: "carmella@example.com",
		},
		{
			id: "k9f2m3n4",
			amount: 450,
			status: "pending",
			email: "jason78@example.com",
		},
		{
			id: "p5q6r7s8",
			amount: 1280,
			status: "success",
			email: "sarah23@example.com",
		},
	];

	const columns: ColumnDef<typeof features, Payment>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (v: boolean) => table.toggleAllPageRowsSelected(!!v),
					"aria-label": "Select all",
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (v: boolean) => row.toggleSelected(!!v),
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
				return renderSnippet(statusSnippet, { status: row.original.status });
			},
		},
		{
			accessorKey: "email",
			header: ({ column }) => renderComponent(EmailHeader, { column }),
			cell: ({ row }) => {
				const emailSnippet = createRawSnippet<[{ email: string }]>((getEmail) => {
					const { email } = getEmail();
					return {
						render: () => `<div class="lowercase">${email}</div>`,
					};
				});
				return renderSnippet(emailSnippet, { email: row.original.email });
			},
		},
		{
			accessorKey: "amount",
			header: () =>
				renderSnippet(
					createRawSnippet(() => ({
						render: () => `<div class="text-end">Amount</div>`,
					}))
				),
			cell: ({ row }) => {
				const amountSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
					const { amount } = getAmount();
					const formatted = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(amount);
					return {
						render: () => `<div class="text-end font-medium">${formatted}</div>`,
					};
				});
				return renderSnippet(amountSnippet, { amount: row.original.amount });
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => renderComponent(ActionsCell, { row }),
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

	const headerGroups = $derived(table.getHeaderGroups());
	const rows = $derived(table.getRowModel().rows);
	const selectedRowCount = $derived(table.getFilteredSelectedRowModel().rows.length);
	const filteredRowCount = $derived(table.getFilteredRowModel().rows.length);
	const canPreviousPage = $derived(table.getCanPreviousPage());
	const canNextPage = $derived(table.getCanNextPage());
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl">Payments</Card.Title>
		<Card.Description>Manage your payments.</Card.Description>
		<Card.Action>
			<Button variant="secondary" size="sm" class="shadow-none">Add Payment</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="rounded-md border">
			<Table.Root>
				<Table.Header>
					{#each headerGroups as headerGroup (headerGroup.id)}
						<Table.Row>
							{#each headerGroup.headers as header (header.id)}
								<Table.Head
									class="data-[name=actions]:w-10 data-[name=amount]:w-24 data-[name=select]:w-10 data-[name=status]:w-24 [&:has([role=checkbox])]:ps-3"
									data-name={header.id}
								>
									{#if !header.isPlaceholder}
										<FlexRender {header} />
									{/if}
								</Table.Head>
							{/each}
						</Table.Row>
					{/each}
				</Table.Header>
				<Table.Body>
					{#if rows.length}
						{#each rows as row (row.id)}
							<Table.Row data-state={row.getIsSelected() && "selected"}>
								{#each row.getVisibleCells() as cell (cell.id)}
									<Table.Cell
										class="data-[name=actions]:w-10 data-[name=amount]:w-24 data-[name=select]:w-10 data-[name=status]:w-24 [&:has([role=checkbox])]:ps-3"
										data-name={cell.column.id}
									>
										<FlexRender {cell} />
									</Table.Cell>
								{/each}
							</Table.Row>
						{/each}
					{:else}
						<Table.Row>
							<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
						</Table.Row>
					{/if}
				</Table.Body>
			</Table.Root>
		</div>
		<div class="flex items-center justify-end gap-2">
			<div class="flex-1 text-sm text-muted-foreground">
				{selectedRowCount} of {filteredRowCount} row(s) selected.
			</div>
			<div class="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					onclick={() => table.previousPage()}
					disabled={!canPreviousPage}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onclick={() => table.nextPage()}
					disabled={!canNextPage}
				>
					Next
				</Button>
			</div>
		</div>
	</Card.Content>
</Card.Root>
