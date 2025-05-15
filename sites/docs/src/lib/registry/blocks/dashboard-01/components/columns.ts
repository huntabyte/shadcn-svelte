import type { ColumnDef } from "@tanstack/table-core";
import type { Schema } from "./schemas.js";
import { renderComponent, renderSnippet } from "$lib/registry/ui/data-table/render-helpers.js";
import DataTableDragHandle from "./data-table-drag-handle.svelte";
import DataTableCheckbox from "./data-table-checkbox.svelte";
import DataTableCellViewer from "./data-table-cell-viewer.svelte";
import DataTableType from "./data-table-type.svelte";
import DataTableStatus from "./data-table-status.svelte";
import { createRawSnippet } from "svelte";
import DataTableTarget from "./data-table-target.svelte";
import DataTableLimit from "./data-table-limit.svelte";
import DataTableReviewer from "./data-table-reviewer.svelte";
import DataTableActions from "./data-table-actions.svelte";

export const columns: ColumnDef<Schema>[] = [
	{
		id: "drag",
		header: () => null,
		cell: ({ row }) => renderComponent(DataTableDragHandle, { id: row.original.id }),
	},
	{
		id: "select",
		header: ({ table }) =>
			renderComponent(DataTableCheckbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate:
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				"aria-label": "Select all",
			}),
		cell: ({ row }) =>
			renderComponent(DataTableCheckbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				"aria-label": "Select row",
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "header",
		header: "Header",
		cell: ({ row }) => renderComponent(DataTableCellViewer, { item: row.original }),
		enableHiding: false,
	},
	{
		accessorKey: "type",
		header: "Section Type",
		cell: ({ row }) => renderComponent(DataTableType, { row }),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => renderComponent(DataTableStatus, { row }),
	},
	{
		accessorKey: "target",
		header: () =>
			renderSnippet(
				createRawSnippet(() => ({
					render: () => '<div class="w-full text-right">Target</div>',
				}))
			),
		cell: ({ row }) => renderComponent(DataTableTarget, { row }),
	},
	{
		accessorKey: "limit",
		header: () =>
			renderSnippet(
				createRawSnippet(() => ({
					render: () => '<div class="w-full text-right">Limit</div>',
				}))
			),
		cell: ({ row }) => renderComponent(DataTableLimit, { row }),
	},
	{
		accessorKey: "reviewer",
		header: "Reviewer",
		cell: ({ row }) => renderComponent(DataTableReviewer, { row }),
	},
	{
		id: "actions",
		cell: () => renderComponent(DataTableActions),
	},
];
