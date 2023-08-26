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
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from "svelte-headless-table/plugins";
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
			header: () => "Priority",
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
		flatColumns,
		pluginStates
	} = tableModel;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hidableCols = ["title", "status", "priority", "actions"];
</script>

<div class="space-y-4">
	<DataTableToolbar />
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
											<DataTableColumnHeader {props} title={cell.id} />
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
</div>
