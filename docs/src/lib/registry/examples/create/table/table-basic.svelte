<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Table from "$lib/registry/ui/table/index.js";

	const invoices = [
		{
			invoice: "INV001",
			paymentStatus: "Paid",
			totalAmount: "$250.00",
			paymentMethod: "Credit Card",
		},
		{
			invoice: "INV002",
			paymentStatus: "Pending",
			totalAmount: "$150.00",
			paymentMethod: "PayPal",
		},
		{
			invoice: "INV003",
			paymentStatus: "Unpaid",
			totalAmount: "$350.00",
			paymentMethod: "Bank Transfer",
		},
	];
</script>

<Example title="Basic">
	<Table.Root>
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Invoice</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Method</Table.Head>
				<Table.Head class="text-right">Amount</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each invoices as invoice (invoice.invoice)}
				<Table.Row>
					<Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
					<Table.Cell>{invoice.paymentStatus}</Table.Cell>
					<Table.Cell>{invoice.paymentMethod}</Table.Cell>
					<Table.Cell class="text-right">{invoice.totalAmount}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Example>
