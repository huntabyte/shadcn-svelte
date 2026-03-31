<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { getLocalTimeZone, today, type DateValue } from "@internationalized/date";

	let date = $state<DateValue | undefined>(today(getLocalTimeZone()));
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Upcoming Payments</Card.Title>
		<Card.Description>Select a date to view scheduled payments.</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Item.Root variant="outline" class="justify-center">
			<Calendar
				type="single"
				bind:value={date}
				class="w-full [--cell-size:--spacing(8)] md:[--cell-size:--spacing(10)]"
			/>
		</Item.Root>
		<Item.Group class="w-full">
			<Item.Root variant="muted">
				<Item.Content>
					<Item.Title>Netflix Subscription</Item.Title>
					<Item.Description>Apr 15, 2024</Item.Description>
				</Item.Content>
				<Badge variant="secondary">$19.99</Badge>
			</Item.Root>
			<Item.Root variant="muted">
				<Item.Content>
					<Item.Title>Rent Payment</Item.Title>
					<Item.Description>Apr 1, 2024</Item.Description>
				</Item.Content>
				<Badge variant="secondary">$2,400.00</Badge>
			</Item.Root>
			<Item.Root variant="muted">
				<Item.Content>
					<Item.Title>Auto Insurance</Item.Title>
					<Item.Description>Apr 22, 2024</Item.Description>
				</Item.Content>
				<Badge variant="secondary">$186.00</Badge>
			</Item.Root>
		</Item.Group>
	</Card.Content>
</Card.Root>
