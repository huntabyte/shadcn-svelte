<script lang="ts">
	import { Button } from "@/registry/default/ui/button";
	import * as Table from "@/registry/new-york/ui/table";
	import {
		Render,
		Subscribe,
		createRender,
		createTable
	} from "svelte-headless-table";
	import {
		addColumnFilters,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from "svelte-headless-table/plugins";
	import { derived, get, readable, writable } from "svelte/store";
	import {
		DataTableCheckbox,
		DataTableColumnHeader,
		DataTableFilterLeftSidebar,
		DataTableFilterRightSidebar,
		DataTablePagination,
		DataTablePriorityCell,
		DataTableRowActions,
		DataTableStatusCell,
		DataTableTitleCell,
		DataTableToolbar
	} from ".";
	import type { Task } from "../(data)/schemas";

	export let data: Task[];

	const table = createTable(readable(data), {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ["asc", "desc"]
		}),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => {
				return value.toLowerCase().includes(filterValue.toLowerCase());
			}
		}),
		colFilter: addColumnFilters(),
		hide: addHiddenColumns(),
		custom: ({ tableState }) => {
			const taskIdOnEdition = writable(null);

			const taskOnEdition = derived(
				[tableState.data, taskIdOnEdition],
				([$data, $taskId]) => {
					const task = $data.find((task) => task.id === $taskId);

					return task;
				}
			);

			const leftSidebarVisible = writable(false);
			const rightSidebarVisible = derived(
				[tableState.data, taskIdOnEdition],
				([$data, $taskId]) => {
					const task = $data.find((task) => task.id === $taskId);

					return !!task;
				}
			);

			const pluginState = {
				taskIdOnEdition,
				taskOnEdition,
				sidebar: {
					left: {
						visible: leftSidebarVisible
					},
					right: {
						visible: rightSidebarVisible
					},
					anyVisible: derived(
						[leftSidebarVisible, rightSidebarVisible],
						([$leftVisible, $rightVisible]) => {
							return $leftVisible || $rightVisible;
						}
					)
				}
			};
			return {
				pluginState
			};
		}
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
			},
			plugins: {
				colFilter: {
					fn: ({ filterValue, value }) => {
						console.log("status", filterValue, value);
						if (filterValue.length === 0) return true;
						if (
							!Array.isArray(filterValue) ||
							typeof value !== "string"
						)
							return true;
						return filterValue.some((filter) => {
							return value.includes(filter);
						});
					},
					initialFilterValue: [],
					render: ({ filterValue }) => {
						return get(filterValue);
					}
				}
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
			},
			plugins: {
				colFilter: {
					fn: ({ filterValue, value }) => {
						console.log("priority", filterValue, value);
						if (filterValue.length === 0) return true;
						if (
							!Array.isArray(filterValue) ||
							typeof value !== "string"
						)
							return true;

						return filterValue.some((filter) => {
							return value.includes(filter);
						});
					},
					initialFilterValue: [],
					render: ({ filterValue }) => {
						return get(filterValue);
					}
				}
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
		pluginStates: {
			custom: { sidebar, taskIdOnEdition }
		}
	} = tableModel;

	$: leftSidebarVisible = sidebar.left.visible;
	$: rightSidebarVisible = sidebar.right.visible;
	$: anySidebarVisible = sidebar.anyVisible;
	$: cols =
		6 +
		(!$anySidebarVisible
			? 0
			: ($leftSidebarVisible ? 2 : 0) + ($rightSidebarVisible ? 3 : 0));

	/* eslint-disable @typescript-eslint/no-explicit-any */
	function taskCellClicked(row: any) {
		const cells = row.cellForId;
		taskIdOnEdition.set(cells.task.value);
	}
</script>

<div class="rounded-md border">
	<DataTableToolbar {tableModel} />
	<div class="grid grid-cols-{cols}">
		{#if $leftSidebarVisible}
			<DataTableFilterLeftSidebar {tableModel} />
		{/if}
		<div class="col-span-6 border-b">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow (headerRow.id)}
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
						<Subscribe
							rowAttrs={row.attrs()}
							let:rowAttrs
							rowProps={row.props()}
							let:rowProps
						>
							<Table.Row
								{...rowAttrs}
								class={rowProps.select.selected
									? "bg-muted"
									: ""}
							>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											{#if cell.id === "task"}
												<div class="w-[80px]">
													<Button
														variant="link"
														size="sm"
														class="underline"
														on:click={() =>
															taskCellClicked(
																row
															)}
													>
														<Render
															of={cell.render()}
														/>
													</Button>
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
		{#if $rightSidebarVisible}
			<DataTableFilterRightSidebar {tableModel} />
		{/if}
	</div>
	<DataTablePagination {tableModel} />
</div>
