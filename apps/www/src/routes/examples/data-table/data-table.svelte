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
	import type { Payment } from "./data";
	import { readable } from "svelte/store";
	import * as Table from "@/registry/new-york/ui/table";
	import DeleteAction from "./delete-action.svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import { CaretSort, ChevronDown, DotsHorizontal } from "radix-icons-svelte";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
	import { cn } from "$lib/utils";
	import { Input } from "@/registry/new-york/ui/input";
	import DataTableCheckbox from "./data-table-checkbox.svelte";

	export let data: Payment[];

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
				const { allRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allRowsSelected
				});
			},
			accessor: ({ id }) => id,
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, { checked: isSelected });
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
			plugins: { sort: { disable: true } }
		}),
		table.column({ header: "Email", accessor: "email" }),
		table.column({
			header: "Amount",
			accessor: "amount",
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(value);
				return `${formatted}`;
			},
			plugins: {
				filter: {
					exclude: true
				},
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			header: "Actions",
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(DeleteAction, { id: item.value });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
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
		pluginStates
	} = table.createViewModel(columns);

	$: console.log("headerRows", headerRows);
	$: console.log("flatColumns", flatColumns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => {
		return c.id;
	});
	let hideForId = Object.fromEntries(ids.map((id) => [id, false]));
	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => hide)
		.map(([id]) => id);

	$: isVisible = (id: string) => !$hiddenColumnIds.includes(id);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds, allRowsSelected } = pluginStates.select;

	const hideableCols = ["Status", "Email", "Amount"];
	$: console.log(ids);
</script>

<div class="w-full">
	<div class="mb-4 flex items-center gap-4">
		<Input
			class="max-w-sm"
			placeholder="Filter emails..."
			type="text"
			bind:value={$filterValue}
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:trigger>
				<Button variant="outline" class="ml-auto" builders={[trigger]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{@const isHidable = col.accessorKey !== undefined}
					{#if isHidable}
						<DropdownMenu.CheckboxItem>
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
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
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
										{#if props.sort.disabled}
											<Render of={cell.render()} />
										{:else}
											<Button
												variant="ghost"
												on:click={props.sort.toggle}
											>
												<Render of={cell.render()} />
												<CaretSort
													class={cn(
														$sortKeys[0]?.id ===
															cell.id &&
															"text-foreground",
														"ml-2 h-4 w-4"
													)}
												/>
											</Button>
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
							data-state={$selectedDataIds[row.id] && "selected"}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell
										class="[&:has([role=checkbox])]:pl-3"
										{...attrs}
									>
										<Render of={cell.render()} />
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
</div>
