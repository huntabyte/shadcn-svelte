import { type ColumnDef, createColumnHelper } from "@tanstack/table-core";
import type { Task } from "../(data)/schemas.js";
import DataTableCell from "./data-table-cell.svelte";
import { DataTableCheckbox, DataTableColumnHeader } from "./index.js";
import { renderComponent } from "$lib/registry/new-york/ui/data-table/index.js";

const col = createColumnHelper<Task>();

export const columns: ColumnDef<Task>[] = [
	{
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
	},
	{
		accessorKey: "id",
		header: ({ column }) => {
			return renderComponent(DataTableColumnHeader, {
				column,
				title: "Task",
			});
		},
		cell: ({ row }) =>
			renderComponent(DataTableCell, {
				class: "w-[80px]",
			}),
		enableSorting: false,
		enableHiding: false,
	},
	// {
	//   accessorKey: "title",
	//   header: ({ column }) => (
	// 	<DataTableColumnHeader column={column} title="Title" />
	//   ),
	//   cell: ({ row }) => {
	// 	const label = labels.find((label) => label.value === row.original.label)

	// 	return (
	// 	  <div className="flex space-x-2">
	// 		{label && <Badge variant="outline">{label.label}</Badge>}
	// 		<span className="max-w-[500px] truncate font-medium">
	// 		  {row.getValue("title")}
	// 		</span>
	// 	  </div>
	// 	)
	//   },
	// },
	// {
	//   accessorKey: "status",
	//   header: ({ column }) => (
	// 	<DataTableColumnHeader column={column} title="Status" />
	//   ),
	//   cell: ({ row }) => {
	// 	const status = statuses.find(
	// 	  (status) => status.value === row.getValue("status")
	// 	)

	// 	if (!status) {
	// 	  return null
	// 	}

	// 	return (
	// 	  <div className="flex w-[100px] items-center">
	// 		{status.icon && (
	// 		  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
	// 		)}
	// 		<span>{status.label}</span>
	// 	  </div>
	// 	)
	//   },
	//   filterFn: (row, id, value) => {
	// 	return value.includes(row.getValue(id))
	//   },
	// },
	// {
	//   accessorKey: "priority",
	//   header: ({ column }) => (
	// 	<DataTableColumnHeader column={column} title="Priority" />
	//   ),
	//   cell: ({ row }) => {
	// 	const priority = priorities.find(
	// 	  (priority) => priority.value === row.getValue("priority")
	// 	)

	// 	if (!priority) {
	// 	  return null
	// 	}

	// 	return (
	// 	  <div className="flex items-center">
	// 		{priority.icon && (
	// 		  <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
	// 		)}
	// 		<span>{priority.label}</span>
	// 	  </div>
	// 	)
	//   },
	//   filterFn: (row, id, value) => {
	// 	return value.includes(row.getValue(id))
	//   },
	// },
	// {
	//   id: "actions",
	//   cell: ({ row }) => <DataTableRowActions row={row} />,
	// },
];
