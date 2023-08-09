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
		addSelectedRows
	} from "svelte-headless-table/plugins";
	import type { Payment } from "./data";
	import { get, readable } from "svelte/store";
	import * as Table from "@/registry/new-york/ui/table";
	import DeleteAction from "./delete-action.svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import { ArrowUpDown } from "lucide-svelte";
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
		select: addSelectedRows()
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
			header: "ID",
			accessor: "id",
			plugins: {
				filter: {
					exclude: true
				}
			}
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
				}
			}
		}),
		table.column({ header: "Status", accessor: "status" }),
		table.column({
			header: () => "Actions",
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

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds, allRowsSelected } = pluginStates.select;
	$: console.log($selectedDataIds);
</script>

<div>
	<div class="flex items-center py-4">
		<Input
			class="max-w-sm"
			placeholder="filter emails..."
			type="text"
			bind:value={$filterValue}
		/>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
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
											!props.sort.disabled && "pl-1"
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
												<ArrowUpDown
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
									<Table.Cell {...attrs}>
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
