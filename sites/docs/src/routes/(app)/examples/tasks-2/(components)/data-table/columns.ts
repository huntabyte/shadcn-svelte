import { createColumnHelper, renderComponent } from "@tanstack/svelte-table";
import type { Task } from "../../(data)/schema.js";
import { ColumnHeader, PriorityCell, RowActions, StatusCell, TitleCell } from "./index.js";
import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";

const columnHelper = createColumnHelper<Task>();

export const defaultColumns = [
	columnHelper.display({
		id: "select",
		header: ({ table }) => {
			return renderComponent(Checkbox, {
				checked:
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate"),
				onCheckedChange: (checked) => table.toggleAllPageRowsSelected(!!checked),
				"aria-label": "Select all",
				class: "translate-y-[2px]",
			});
		},
		cell: ({ row }) => {
			return renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				"aria-label": "Select row",
				class: "translate-y-[2px]",
				onCheckedChange: (checked) => row.toggleSelected(!!checked),
			});
		},
		enableSorting: false,
		enableHiding: false,
	}),
	columnHelper.accessor("id", {
		id: "task",
		header: ({ column }) => {
			return renderComponent(ColumnHeader<Task>, {
				column,
				title: "Task",
			});
		},
		meta: {
			cellProps: {
				class: "w-[80px]",
			},
		},
		enableSorting: false,
		enableHiding: false,
	}),
	columnHelper.accessor("title", {
		header: ({ column }) => {
			return renderComponent(ColumnHeader<Task>, {
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
	}),
	columnHelper.accessor("status", {
		header: ({ column }) => {
			return renderComponent(ColumnHeader<Task>, {
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
	}),
	columnHelper.accessor("priority", {
		header: ({ column }) => {
			return renderComponent(ColumnHeader<Task>, {
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
	}),
	columnHelper.display({
		id: "actions",
		cell: ({ row }) => {
			return renderComponent(RowActions, {
				row,
			});
		},
	}),
];
