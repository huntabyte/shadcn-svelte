<script lang="ts" module>
	export type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};
</script>

<script lang="ts">
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import {
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type Column,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type Row,
		type RowSelectionState,
		type SortingState,
		type VisibilityState,
	} from "@tanstack/table-core";
	import { renderComponent, renderSnippet } from "$lib/registry/ui/data-table/render-helpers.js";
	import { createRawSnippet } from "svelte";
	import { createSvelteTable } from "$lib/registry/ui/data-table/data-table.svelte.js";
	import { FlexRender } from "$lib/registry/ui/data-table/index.js";

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

	const columns: ColumnDef<Payment>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected(),
					onCheckedChange: (v: boolean) => table.toggleAllPageRowsSelected(v),
					"aria-label": "Select all",
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (v: boolean) => row.toggleSelected(v),
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
			header: ({ column }) => renderSnippet(EmailHeader, { column }),
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
			cell: ({ row }) => renderSnippet(ActionsCell, { row }),
		},
	];

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === "function") {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === "function") {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === "function") {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === "function") {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === "function") {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
	});
</script>

{#snippet ActionsCell({ row }: { row: Row<Payment> })}
	{@const payment = row.original}

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="ghost" class="size-8 p-0" {...props}>
					<span class="sr-only">Open menu</span>
					<EllipsisIcon />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(payment.id)}>
				Copy payment ID
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>View customer</DropdownMenu.Item>
			<DropdownMenu.Item>View payment details</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

{#snippet EmailHeader({ column }: { column: Column<Payment> })}
	<Button variant="ghost" onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
		Email
		<ArrowUpDownIcon />
	</Button>
{/snippet}

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
					{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
						<Table.Row>
							{#each headerGroup.headers as header (header.id)}
								<Table.Head
									class="data-[name=actions]:w-10 data-[name=amount]:w-24 data-[name=select]:w-10 data-[name=status]:w-24 [&:has([role=checkbox])]:ps-3"
									data-name={header.id}
								>
									{#if !header.isPlaceholder}
										<FlexRender
											context={header.getContext()}
											content={header.column.columnDef.header}
										/>
									{/if}
								</Table.Head>
							{/each}
						</Table.Row>
					{/each}
				</Table.Header>
				<Table.Body>
					{#if table.getRowModel().rows?.length}
						{#each table.getRowModel().rows as row (row.id)}
							<Table.Row data-state={row.getIsSelected() && "selected"}>
								{#each row.getVisibleCells() as cell (cell.id)}
									<Table.Cell
										class="data-[name=actions]:w-10 data-[name=amount]:w-24 data-[name=select]:w-10 data-[name=status]:w-24 [&:has([role=checkbox])]:ps-3"
										data-name={cell.column.id}
									>
										<FlexRender
											context={cell.getContext()}
											content={cell.column.columnDef.cell}
										/>
									</Table.Cell>
								{/each}
							</Table.Row>
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
		</div>
		<div class="flex items-center justify-end gap-2">
			<div class="text-muted-foreground flex-1 text-sm">
				{table.getFilteredSelectedRowModel().rows.length} of
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div class="flex gap-2">
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
	</Card.Content>
</Card.Root>
