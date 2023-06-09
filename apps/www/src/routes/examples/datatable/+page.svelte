<script lang="ts">
	import { createTable, Subscribe, Render } from "svelte-headless-table";
	import { paymentData } from "./data";
	import { readable } from "svelte/store";
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from "$components/ui/table";

	const data = readable(paymentData);

	const table = createTable(data);

	const columns = table.createColumns([
		table.column({ header: "ID", accessor: "id" }),
		table.column({ header: "Status", accessor: "status" }),
		table.column({ header: "Amount", accessor: "amount" }),
		table.column({ header: "Email", accessor: "email" })
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs } =
		table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table>
		<TableHeader>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<TableRow {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<TableHead {...attrs}>
									<Render of={cell.render()} />
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
