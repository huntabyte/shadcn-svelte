<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";

	const INVOICE_ITEMS = [
		{ item: "Design System License", qty: 1, unitPrice: 499 },
		{ item: "Priority Support", qty: 12, unitPrice: 99 },
		{ item: "Custom Components", qty: 3, unitPrice: 250 },
	];

	const subtotal = INVOICE_ITEMS.reduce((sum, row) => sum + row.qty * row.unitPrice, 0);
	const tax = 0;
	const totalDue = subtotal + tax;

	function formatCurrency(value: number) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 2,
		}).format(value);
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Invoice #INV-2847</Card.Title>
		<Card.Description>Due March 30, 2026</Card.Description>
		<Card.Action>
			<Badge variant="secondary">Pending</Badge>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Item</Table.Head>
					<Table.Head class="text-right">Qty</Table.Head>
					<Table.Head class="text-right">Rate</Table.Head>
					<Table.Head class="text-right">Amount</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each INVOICE_ITEMS as row, index (index)}
					<Table.Row>
						<Table.Cell class="text-sm">{row.item}</Table.Cell>
						<Table.Cell class="text-right tabular-nums">{row.qty}</Table.Cell>
						<Table.Cell class="text-right tabular-nums">
							{formatCurrency(row.unitPrice)}
						</Table.Cell>
						<Table.Cell class="text-right tabular-nums">
							{formatCurrency(row.qty * row.unitPrice)}
						</Table.Cell>
					</Table.Row>
				{/each}
				<Table.Row>
					<Table.Cell colspan={3} class="text-right">Subtotal</Table.Cell>
					<Table.Cell class="text-right tabular-nums">
						{formatCurrency(subtotal)}
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell colspan={3} class="text-right">Tax</Table.Cell>
					<Table.Cell class="text-right tabular-nums">$0.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell colspan={3} class="text-right">Total Due</Table.Cell>
					<Table.Cell class="text-right tabular-nums">
						{formatCurrency(totalDue)}
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<Button variant="outline" size="sm">Download PDF</Button>
		<Button size="sm" class="ml-auto">Pay Now</Button>
	</Card.Footer>
</Card.Root>
