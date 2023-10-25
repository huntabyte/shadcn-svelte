<script lang="ts">
	import {
		Render,
		Subscribe,
		createRender,
		createTable
	} from "svelte-headless-table";
	import { get, readable } from "svelte/store";
	import type { Task } from "../(data)/schemas";
	import {
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from "svelte-headless-table/plugins";
	import { Button } from "@/registry/default/ui/button";
	import * as Select from "@/registry/default/ui/select";
	import {
		ChevronRight,
		ChevronLeft,
		DoubleArrowRight,
		DoubleArrowLeft
	} from "radix-icons-svelte";
	import * as Table from "@/registry/new-york/ui/table";
	import DataTableCheckbox from "./data-table-checkbox.svelte";
	import DataTableTitleCell from "./data-table-title-cell.svelte";
	import DataTableStatusCell from "./data-table-status-cell.svelte";
	import DataTableRowActions from "./data-table-row-actions.svelte";
	import DataTablePriorityCell from "./data-table-priority-cell.svelte";
	import DataTableColumnHeader from "./data-table-column-header.svelte";
	import { Cell } from "@/registry/default/ui/table";
	import DataTableToolbar from "./data-table-toolbar.svelte";
	export let data: Task[];

	const table = createTable(readable(data), {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ["asc", "desc"]
		}),
		page: addPagination(),
		filter: addTableFilter(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.display({
			id: "select",
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected,
					"aria-label": "Select all"
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);
				return createRender(DataTableCheckbox, {
					checked: isSelected,
					"aria-label": "Select row",
					class: "translate-y-[2px]"
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: "id",
			header: () => {
				return "Task";
			},
			id: "task",
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: "title",
			header: "Title",
			id: "title",
			cell: ({ value, row }) => {
				if (row.isData()) {
					return createRender(DataTableTitleCell, {
						value,
						labelValue: row.original.label
					});
				}
				return value;
			}
		}),
		table.column({
			accessor: "status",
			header: "Status",
			id: "status",
			cell: ({ value }) => {
				return createRender(DataTableStatusCell, {
					value
				});
			}
		}),
		table.column({
			accessor: "priority",
			id: "priority",
			header: "Priority",
			cell: ({ value }) => {
				return createRender(DataTablePriorityCell, {
					value
				});
			}
		}),
		table.display({
			id: "actions",
			header: () => {
				return "";
			},
			cell: ({ row }) => {
				if (row.isData() && row.original) {
					return createRender(DataTableRowActions, {
						row: row.original
					});
				}
				return "";
			}
		})
	]);

	const tableModel = table.createViewModel(columns);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
		rows
	} = tableModel;

	const { selectedDataIds } = pluginStates.select;

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount, pageSize } =
		pluginStates.page;

	const { hiddenColumnIds } = pluginStates.hide;

	/** TODO: Fix type error Maby their is a better way to do this?? */
	const updatePageSize = (selected) => {
		pageSize.set(selected.value);
	};
</script>

<div class="space-y-4">
	<DataTableToolbar {hiddenColumnIds} {tableModel} />
	<div class="rounded-md border">
		<Table.Root>
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
									<Table.Head {...attrs}>
										{#if cell.id !== "select" && cell.id !== "actions"}
											<DataTableColumnHeader
												{props}
												title={cell.id}
											/>
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
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === "task"}
											<div class="w-[80px]">
												<Render of={cell.render()} />
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
	<div class="flex items-center justify-between px-2">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of{" "}
			{$rows.length} row(s) selected.
		</div>
		<div class="flex items-center space-x-6 lg:space-x-8">
			<div class="flex items-center space-x-2">
				<p class="text-sm font-medium">Rows per page</p>
				<Select.Root
					onSelectedChange={(selected) => updatePageSize(selected)}
					selected={{ value: 10, label: "10" }}
				>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="Select page size" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="10">10</Select.Item>
						<Select.Item value="20">20</Select.Item>
						<Select.Item value="30">30</Select.Item>
						<Select.Item value="40">40</Select.Item>
						<Select.Item value="50">50</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div
				class="flex w-[100px] items-center justify-center text-sm font-medium"
			>
				Page {$pageIndex + 1} of {$pageCount}
			</div>
			<div class="flex items-center space-x-2">
				<Button
					variant="outline"
					class="hidden h-8 w-8 p-0 lg:flex"
					on:click={() => ($pageIndex = 0)}
					disabled={!$hasPreviousPage}
				>
					<span class="sr-only">Go to first page</span>
					<DoubleArrowLeft size={15} />
				</Button>
				<Button
					variant="outline"
					class="p-0 w-8 h-8"
					on:click={() => ($pageIndex = $pageIndex - 1)}
					disabled={!$hasPreviousPage}
				>
					<span class="sr-only">Go to previous page</span>
					<ChevronLeft size={15} />
				</Button>
				<Button
					variant="outline"
					class="p-0 w-8 h-8"
					disabled={!$hasNextPage}
					on:click={() => ($pageIndex = $pageIndex + 1)}
				>
					<span class="sr-only">Go to next page</span>
					<ChevronRight size={15} />
				</Button>
				<Button
					variant="outline"
					class="hidden h-8 w-8 p-0 lg:flex"
					disabled={!$hasNextPage}
					on:click={() =>
						($pageIndex =
							Math.ceil($rows.length / $pageRows.length) - 1)}
				>
					<span class="sr-only">Go to last page</span>
					<DoubleArrowRight size={15} />
				</Button>
			</div>
		</div>
	</div>
</div>
