import { createColumnHelper } from "@tanstack/table-core";
import type { Task } from "../(data)/schemas.js";
import DataTableCell from "./data-table-cell.svelte";
import {
	DataTableCheckbox,
	DataTableColumnHeader,
	DataTablePriorityCell,
	DataTableRowActions,
	DataTableStatusCell,
	DataTableTitleCell,
} from "./index.js";
import { renderComponent } from "$lib/registry/new-york/ui/data-table/index.js";

const col = createColumnHelper<Task>();

export const columns = [
	col.display({
		id: "select",
		header: ({ table }) =>
			renderComponent(DataTableCheckbox, {
				checked: table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				"aria-label": "Select all",
				class: "translate-y-[2px]",
			}),
		cell: ({ row }) =>
			renderComponent(DataTableCheckbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				"aria-label": "Select row",
				class: "translate-y-[2px]",
			}),
		enableSorting: false,
		enableHiding: false,
	}),
	col.accessor("id", {
		header: ({ column }) => {
			return renderComponent(DataTableColumnHeader, {
				column,
				title: "Task",
			});
		},
		cell: () =>
			renderComponent(DataTableCell, {
				class: "w-[80px]",
			}),
		enableSorting: false,
		enableHiding: false,
	}),
	col.accessor("title", {
		header: ({ column }) => renderComponent(DataTableColumnHeader, { column, title: "Title" }),
		cell: ({ row }) => {
			return renderComponent(DataTableTitleCell, {
				labelValue: row.original.label,
				value: row.original.title,
			});
		},
	}),
	col.accessor("status", {
		header: ({ column }) =>
			renderComponent(DataTableColumnHeader, {
				column,
				title: "Status",
			}),
		cell: ({ row }) => {
			return renderComponent(DataTableStatusCell, {
				value: row.original.status,
			});
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	}),
	col.accessor("priority", {
		header: ({ column }) => {
			return renderComponent(DataTableColumnHeader, {
				title: "Priority",
				column,
			});
		},
		cell: ({ row }) => {
			return renderComponent(DataTablePriorityCell, {
				value: row.original.priority,
			});
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	}),
	col.display({
		id: "actions",
		cell: ({ row }) => renderComponent(DataTableRowActions, { row }),
	}),
];
