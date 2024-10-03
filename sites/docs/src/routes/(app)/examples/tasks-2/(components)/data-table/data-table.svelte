<script lang="ts" generics="T extends unknown | object | any[]">
	import {
		type ColumnDef,
		type TableOptions,
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
	} from "@tanstack/svelte-table";
	import { writable } from "svelte/store";
	import Pagination from "./data-table-pagination.svelte";
	import Toolbar from "./data-table-toolbar.svelte";
	import * as Table from "$lib/registry/new-york/ui/table/index.js";

	export let defaultColumns: ColumnDef<T>[];
	export let data: T[];

	const options = writable<TableOptions<T>>({
		data,
		columns: defaultColumns,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	const table = createSvelteTable(options);
</script>

<div class="space-y-4">
	<Toolbar {table} />
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each $table.getHeaderGroups() as headerGroup}
					<Table.Row>
						{#each headerGroup.headers as header}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#if $table.getRowModel().rows.length}
					{#each $table.getRowModel().rows as row}
						<Table.Row data-state={row.getIsSelected() && "selected"}>
							{#each row.getVisibleCells() as cell}
								{#if cell.column.columnDef.id === "task"}
									<Table.Cell>
										<div class="w-[80px]">
											<svelte:component
												this={flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											/>
										</div>
									</Table.Cell>
								{:else}
									<Table.Cell>
										<svelte:component
											this={flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										/>
									</Table.Cell>
								{/if}
							{/each}
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={defaultColumns.length} class="h-24 text-center">
							No results.
						</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
	<Pagination {table} />
</div>
