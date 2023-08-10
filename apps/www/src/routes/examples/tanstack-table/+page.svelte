<script lang="ts">
	import * as Table from "@/registry/new-york/ui/table";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
	import { Input } from "@/registry/new-york/ui/input";
	import { Button } from "@/registry/new-york/ui/button";
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	import {
		createSvelteTable,
		type ColumnDef,
		type SortingState,
		type TableOptions,
		type OnChangeFn,
		type VisibilityState,
		getCoreRowModel,
		type ColumnFiltersState,
		type RowSelectionState,
		flexRender
	} from "@tanstack/svelte-table";
	import { writable } from "svelte/store";
	import { ChevronDown } from "radix-icons-svelte";
	import ActionsDropdownMenu from "./actions-dropdown-menu.svelte";
	const data: Payment[] = [
		{
			id: "m5gr84i9",
			amount: 316,
			status: "success",
			email: "ken99@yahoo.com"
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "success",
			email: "Abe45@gmail.com"
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "processing",
			email: "Monserrat44@gmail.com"
		},
		{
			id: "5kma53ae",
			amount: 874,
			status: "success",
			email: "Silas22@gmail.com"
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "failed",
			email: "carmella@hotmail.com"
		}
	];
	type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};

	const columns: ColumnDef<Payment>[] = [
		{
			id: "select",
			header: ({ table }) =>
				flexRender(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					onCheckedChange: (value: boolean) => {
						table.toggleAllPageRowsSelected(!!value);
					}
				}),
			cell: ({ row }) =>
				flexRender(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value: boolean) => {
						row.toggleSelected(!!value);
					}
				}),
			enableHiding: false,
			enableSorting: false
		},
		{
			accessorKey: "status",
			header: () => "status"
		},
		{
			accessorKey: "email",
			header: () => "Email"
		},
		{
			accessorKey: "amount",
			header: () => "Amount",
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"));

				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(amount);

				return formatted;
			}
		},
		{
			id: "actions",
			enableHiding: false,
			header: () => "Actions",
			cell: ({ row }) => flexRender(ActionsDropdownMenu, { row })
		}
	];

	let columnVisibility: VisibilityState = {};
	let sorting: SortingState = [];
	let columnFilters: ColumnFiltersState = [];
	let rowSelection: RowSelectionState = {};

	const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility);
		} else {
			columnVisibility = updater;
		}
		options.update((prev) => ({
			...prev,
			state: {
				...prev.state,
				columnVisibility
			}
		}));
	};

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((prev) => ({
			...prev,
			state: {
				...prev.state,
				sorting
			}
		}));
	};

	const setColumnFilters: OnChangeFn<ColumnFiltersState> = (updater) => {
		if (updater instanceof Function) {
			columnFilters = updater(columnFilters);
		} else {
			columnFilters = updater;
		}
		options.update((prev) => ({
			...prev,
			state: {
				...prev.state,
				columnFilters
			}
		}));
	};

	const setRowSelection: OnChangeFn<RowSelectionState> = (updater) => {
		if (updater instanceof Function) {
			rowSelection = updater(rowSelection);
		} else {
			rowSelection = updater;
		}
		options.update((prev) => ({
			...prev,
			state: {
				...prev.state,
				rowSelection
			}
		}));
	};

	const options = writable<TableOptions<Payment>>({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
			columnVisibility,
			columnFilters,
			rowSelection
		}
	});

	const rerender = () => {
		options.update((prev) => ({
			...prev,
			data
		}));
	};
	let filterValue: "";

	function handleFilterChange(value: string) {
		$table.getColumn("email")?.setFilterValue(value);
	}
	$: handleFilterChange(filterValue);

	const table = createSvelteTable(options);
</script>

<div class="w-full">
	<div class="flex items-center py-4">
		<Input
			placeholder="Filter emails..."
			class="max-w-sm"
			bind:value={filterValue}
		/>
		<DropdownMenu.Root positioning={{ placement: "bottom-end" }}>
			<DropdownMenu.Trigger asChild let:trigger>
				<Button variant="outline" builders={[trigger]} class="ml-auto">
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each $table
					.getAllColumns()
					.filter((column) => column.getCanHide()) as column}
					<DropdownMenu.CheckboxItem
						class="capitalize"
						checked={column.getIsVisible()}
						onCheckedChange={(value) =>
							column.toggleVisibility(!!value)}
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
				{#each $table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header}
							<Table.Head>
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
		</Table.Root>
	</div>
</div>
