<script lang="ts">
	import { get, readable } from "svelte/store";
	import { Render, Subscribe, createRender, createTable } from "svelte-headless-table";
	import {
		addColumnFilters,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter,
	} from "svelte-headless-table/plugins";
	import type { Task } from "../(data)/schemas.js";
	import {
		DataTableCheckbox,
		DataTableColumnHeader,
		DataTablePagination,
		DataTablePriorityCell,
		DataTableRowActions,
		DataTableStatusCell,
		DataTableTitleCell,
		DataTableToolbar,
	} from "./index.js";

	import * as Table from "$lib/registry/new-york/ui/table/index.js";

	export let data: Task[];

	const table = createTable(readable(data), {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ["asc", "desc"],
		}),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => {
				return value.toLowerCase().includes(filterValue.toLowerCase());
			},
		}),
		colFilter: addColumnFilters(),
		hide: addHiddenColumns(),
	});

	const columns = table.createColumns([
		table.display({
			id: "select",
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected,
					"aria-label": "Select all",
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);
				return createRender(DataTableCheckbox, {
					checked: isSelected,
					"aria-label": "Select row",
					class: "translate-y-[2px]",
				});
			},
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
		table.column({
			accessor: "id",
			header: () => {
				return "Task";
			},
			id: "task",
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
		table.column({
			accessor: "title",
			header: "Title",
			id: "title",
			cell: ({ value, row }) => {
				if (row.isData()) {
					return createRender(DataTableTitleCell, {
						value,
						labelValue: row.original.label,
					});
				}
				return value;
			},
		}),
		table.column({
			accessor: "status",
			header: "Status",
			id: "status",
			cell: ({ value }) => {
				return createRender(DataTableStatusCell, {
					value,
				});
			},
			plugins: {
				colFilter: {
					fn: ({ filterValue, value }) => {
						if (filterValue.length === 0) return true;
						if (!Array.isArray(filterValue) || typeof value !== "string") return true;
						return filterValue.some((filter) => {
							return value.includes(filter);
						});
					},
					initialFilterValue: [],
					render: ({ filterValue }) => {
						return get(filterValue);
					},
				},
			},
		}),
		table.column({
			accessor: "priority",
			id: "priority",
			header: "Priority",
			cell: ({ value }) => {
				return createRender(DataTablePriorityCell, {
					value,
				});
			},
			plugins: {
				colFilter: {
					fn: ({ filterValue, value }) => {
						if (filterValue.length === 0) return true;
						if (!Array.isArray(filterValue) || typeof value !== "string") return true;

						return filterValue.some((filter) => {
							return value.includes(filter);
						});
					},
					initialFilterValue: [],
					render: ({ filterValue }) => {
						return get(filterValue);
					},
				},
			},
		}),
		table.display({
			id: "actions",
			header: () => {
				return "";
			},
			cell: ({ row }) => {
				if (row.isData() && row.original) {
					return createRender(DataTableRowActions, {
						row: row.original,
					});
				}
				return "";
			},
		}),
	]);

	const tableModel = table.createViewModel(columns);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;
</script>

<div class="space-y-4">
	<DataTableToolbar {tableModel} {data} />
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
									<Table.Head {...attrs}>
										{#if cell.id !== "select" && cell.id !== "actions"}
											<DataTableColumnHeader
												{props}
												{tableModel}
												cellId={cell.id}
											>
												<Render of={cell.render()} /></DataTableColumnHeader
											>
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
				{#if $pageRows.length}
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
	<DataTablePagination {tableModel} />
</div>
