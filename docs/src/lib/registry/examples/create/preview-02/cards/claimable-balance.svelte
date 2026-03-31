<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Description>Claimable Balance</Card.Description>
		<Card.Title class="text-5xl tabular-nums">$0.00</Card.Title>
		<Badge variant="outline">
			<span class="size-2 rounded-full bg-yellow-500"></span>
			Pending Setup
		</Badge>
	</Card.Header>
	<Card.Content class="flex flex-1 flex-col justify-end">
		<Item.Root variant="muted" class="flex-col items-stretch">
			<Item.Content class="gap-3">
				<div class="flex items-center justify-between">
					<span class="text-muted-foreground text-sm">Net Royalties</span>
					<span class="text-sm font-medium tabular-nums">$0.00</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-muted-foreground text-sm">Processing Fee</span>
					<span class="text-sm font-medium tabular-nums">-$0.00</span>
				</div>
				<Separator />
				<div class="flex items-center justify-between">
					<span class="text-muted-foreground text-sm">Total Ready to Claim</span>
					<span class="text-sm font-semibold tabular-nums">$0.00 USD</span>
				</div>
			</Item.Content>
		</Item.Root>
	</Card.Content>
	<Card.Footer>
		<Card.Description>
			Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on
			the 15th of each month.
		</Card.Description>
	</Card.Footer>
</Card.Root>
