<script lang="ts">
	import { createTable, Render, Subscribe } from "svelte-headless-table";
	import { readable } from "svelte/store";
	import * as Table from "@/registry/new-york/ui/table";

	type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};

	const data: Payment[] = [
		{
			id: "m5gr84i9",
			amount: 316,
			status: "success",
			email: "ken99@yahoo.com"
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "success",
			email: "Abe45@gmail.com"
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "processing",
			email: "Monserrat44@gmail.com"
		},
		{
			id: "5kma53ae",
			amount: 874,
			status: "success",
			email: "Silas22@gmail.com"
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "failed",
			email: "carmella@hotmail.com"
		}
	];

	const table = createTable(readable(data));

	const columns = table.createColumns([
		table.column({
			accessor: "id",
			header: "ID"
		}),
		table.column({
			accessor: "status",
			header: "Status"
		}),
		table.column({
			accessor: "email",
			header: "Email"
		}),
		table.column({
			accessor: "amount",
			header: "Amount"
		}),
		table.column({
			accessor: ({ id }) => id,
			header: ""
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
		table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
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
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
