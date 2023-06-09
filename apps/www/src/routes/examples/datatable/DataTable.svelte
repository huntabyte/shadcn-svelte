<script lang="ts">
	import { createTable, Subscribe, Render } from "svelte-headless-table";
	import { addSortBy, addColumnOrder } from "svelte-headless-table/plugins";
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

	export let data: Payment[];

	const table = createTable(readable(data), {
		sort: addSortBy({ disableMultiSort: true }),
		colOrder: addColumnOrder()
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
		table.column({ header: "Email", accessor: "email" })
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { columnIdOrder } = pluginStates.colOrder;
	$columnIdOrder = ["id", "email", "amount", "status"];
</script>

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
			{#each $rows as row (row.id)}
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
