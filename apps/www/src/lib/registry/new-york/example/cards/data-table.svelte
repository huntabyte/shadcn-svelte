<script lang="ts">
	import {
		createTable,
		Subscribe,
		Render,
		createRender
	} from "svelte-headless-table";
	import {
		addSortBy,
		addPagination,
		addTableFilter,
		addSelectedRows,
		addHiddenColumns
	} from "svelte-headless-table/plugins";
	import { readable } from "svelte/store";
	import * as Table from "@/registry/new-york/ui/table";
	import Actions from "../data-table/data-table-actions.svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
	import { cn } from "$lib/utils";
	import { Input } from "@/registry/new-york/ui/input";
	import DataTableCheckbox from "../data-table/data-table-checkbox.svelte";
	import { ArrowUpDown, ChevronDown } from "lucide-svelte";
	import * as Card from "@/registry/new-york/ui/card";

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
			email: "ken99@yahoo.com"
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "Success",
			email: "Abe45@gmail.com"
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "Processing",
			email: "Monserrat44@gmail.com"
		},
		{
			id: "5kma53ae",
			amount: 874,
			status: "Success",
			email: "Silas22@gmail.com"
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "Failed",
			email: "carmella@hotmail.com"
		}
	];

	const table = createTable(readable(data), {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			accessor: "id",
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: "Status",
			accessor: "status",
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: "Email",
			accessor: "email",
			cell: ({ value }) => value.toLowerCase()
		}),
		table.column({
			header: "Amount",
			accessor: "amount",
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(value);
				return formatted;
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: "",
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(Actions, { id: item.value });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		flatColumns,
		pluginStates,
		rows
	} = table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;

	const hideableCols = ["status", "email", "amount"];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Payments</Card.Title>
		<Card.Description>Manage your payments.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="mb-4 flex items-center gap-4">
			<Input
				class="max-w-sm"
				placeholder="Filter emails..."
				type="text"
				bind:value={$filterValue}
			/>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						variant="outline"
						class="ml-auto"
						builders={[builder]}
					>
						Columns <ChevronDown class="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each flatColumns as col}
						{#if hideableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem
								bind:checked={hideForId[col.id]}
							>
								{col.header}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="rounded-md border">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow}
						<Subscribe rowAttrs={headerRow.attrs()}>
							<Table.Row>
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe
										attrs={cell.attrs()}
										let:attrs
										props={cell.props()}
										let:props
									>
										<Table.Head
											{...attrs}
											class={cn(
												"[&:has([role=checkbox])]:pl-3"
											)}
										>
											{#if cell.id === "amount"}
												<div
													class="text-right font-medium"
												>
													<Render
														of={cell.render()}
													/>
												</div>
											{:else if cell.id === "email"}
												<Button
													variant="ghost"
													on:click={props.sort.toggle}
												>
													<Render
														of={cell.render()}
													/>
													<ArrowUpDown
														class={cn(
															$sortKeys[0]?.id ===
																cell.id &&
																"text-foreground",
															"ml-2 h-4 w-4"
														)}
													/>
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Head>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row
								{...rowAttrs}
								data-state={$selectedDataIds[row.id] &&
									"selected"}
							>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell
											class="[&:has([role=checkbox])]:pl-3"
											{...attrs}
										>
											{#if cell.id === "amount"}
												<div
													class="text-right font-medium"
												>
													<Render
														of={cell.render()}
													/>
												</div>
											{:else if cell.id === "status"}
												<div class="capitalize">
													<Render
														of={cell.render()}
													/>
												</div>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
		<div class="flex items-center justify-end space-x-2 py-4">
			<div class="flex-1 text-sm text-muted-foreground">
				{Object.keys($selectedDataIds).length} of{" "}
				{$rows.length} row(s) selected.
			</div>
			<Button
				variant="outline"
				size="sm"
				on:click={() => ($pageIndex = $pageIndex - 1)}
				disabled={!$hasPreviousPage}>Previous</Button
			>
			<Button
				variant="outline"
				size="sm"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
			>
		</div>
	</Card.Content>
</Card.Root>
