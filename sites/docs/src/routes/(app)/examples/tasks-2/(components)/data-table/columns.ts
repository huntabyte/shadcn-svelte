import { type ColumnDef, renderComponent } from "@tanstack/svelte-table";
import type { Task } from "../../(data)/schema.js";
import { ColumnHeader, PriorityCell, RowActions, StatusCell, TitleCell } from "./index.js";
import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";

export const columns: ColumnDef<Task>[] = [
	{
		id: "select",
		header: ({ table }) => {
			return renderComponent(Checkbox, {
				checked:
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate"),
				"aria-label": "Select all",
				class: "translate-y-[2px]",
			});
		},
		cell: ({ row }) => {
			return renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				"aria-label": "Select row",
				class: "translate-y-[2px]",
			});
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		id: "task",
		header: ({ column }) => {
			return renderComponent(ColumnHeader, {
				column,
				title: "Task",
			});
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return renderComponent(ColumnHeader, {
				column,
				title: "Title",
			});
		},
		cell: ({ row }) => {
			return renderComponent(TitleCell, {
				value: row.original.title,
				labelValue: row.original.label,
			});
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return renderComponent(ColumnHeader, {
				column,
				title: "Status",
			});
		},
		cell: ({ row }) => {
			return renderComponent(StatusCell, {
				value: row.original.status,
			});
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "priority",
		header: ({ column }) => {
			return renderComponent(ColumnHeader, {
				column,
				title: "Priority",
			});
		},
		cell: ({ row }) => {
			return renderComponent(PriorityCell, {
				value: row.original.priority,
			});
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return renderComponent(RowActions, {
				row,
			});
		},
	},
];
