<script lang="ts">
	import {
		createTable,
		Subscribe,
		Render,
		createRender
	} from "svelte-headless-table";
	import {
		addSortBy,
		addColumnOrder,
		addPagination
	} from "svelte-headless-table/plugins";
	import type { Payment } from "./data";
	import { readable } from "svelte/store";
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from "$components/ui/table";
	import DeleteAction from "./DeleteAction.svelte";
	import { Button } from "$components/ui/button";

	export let data: Payment[];

	const table = createTable(readable(data), {
		sort: addSortBy({ disableMultiSort: true }),
		colOrder: addColumnOrder(),
		page: addPagination()
	});

	const columns = table.createColumns([
		table.column({ header: "ID", accessor: "id" }),
		table.column({ header: "Status", accessor: "status" }),
		table.column({
			header: "Amount",
			accessor: "amount",
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(value);
				return `${formatted}`;
			}
		}),
		table.column({ header: "Email", accessor: "email" }),
		table.column({
			header: () => "Actions",
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(DeleteAction, { id: item.value });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { columnIdOrder } = pluginStates.colOrder;
	$columnIdOrder = ["id", "email", "amount", "status"];

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<div>
	<div class="rounded-md border">
		<Table {...$tableAttrs}>
			<TableHeader>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<TableRow {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<TableHead
										{...attrs}
										on:click={props.sort.toggle}
									>
										<Render of={cell.render()} />
										{#if props.sort.order === "asc"}
											⬇️
										{:else if props.sort.order === "desc"}
											⬆️
										{/if}
									</TableHead>
								</Subscribe>
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableHeader>
			<TableBody {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<TableRow {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<TableCell {...attrs}>
										<Render of={cell.render()} />
									</TableCell>
								</Subscribe>
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
