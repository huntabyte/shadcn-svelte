<script lang="ts">
	import {
		Render,
		Subscribe,
		createRender,
		createTable
	} from "svelte-headless-table";
	import { readable } from "svelte/store";
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
			header: "Task",
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
			cell: ({ value }) => {
				return createRender(DataTableTitleCell, {
					value
				});
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
			header: (cell) => {
				const propStore = cell.props();
				return createRender(DataTableColumnHeader, {
					props: propStore,
					title: "Priority"
				});
			},
			cell: ({ value }) => {
				return createRender(DataTablePriorityCell, {
					value
				});
			}
		}),
		table.display({
			id: "actions",
			header: () => {
				return "Actions";
			},
			cell: () => {
				return "actions";
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

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hidableCols = ["title", "status", "priority", "actions"];
</script>

<div class="space-y-4">
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
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
		</Table.Root>
	</div>
</div>
