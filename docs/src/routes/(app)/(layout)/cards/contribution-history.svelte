<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/registry/ui/card/index.js";
	import { Item, ItemContent, ItemDescription } from "$lib/registry/ui/item/index.js";
	const chartData = [
		{ month: "Dec", amount: 800 },
		{ month: "Jan", amount: 1100 },
		{ month: "Feb", amount: 900 },
		{ month: "Mar", amount: 1300 },
		{ month: "Apr", amount: 750 },
		{ month: "May", amount: 1400 },
	];
	const maxAmount = Math.max(...chartData.map((item) => item.amount));
</script>

<Card>
	<CardHeader>
		<CardTitle>Contribution History</CardTitle>
		<CardDescription>Last 6 months of activity</CardDescription>
	</CardHeader>
	<CardContent>
		<div
			class="flex h-[200px] w-full items-end gap-3"
			role="img"
			aria-label="Last 6 months of contribution activity"
		>
			{#each chartData as item (item.month)}
				<div class="flex h-full flex-1 flex-col justify-end gap-2">
					<div
						class="bg-chart-2 min-h-2 rounded-t-md"
						style={`height: ${(item.amount / maxAmount) * 100}%`}
					></div>
					<span class="text-muted-foreground text-center text-xs">
						{item.month}
					</span>
				</div>
			{/each}
		</div>
	</CardContent>
	<CardContent>
		<div class="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
			<Item variant="muted" class="flex-col items-stretch">
				<ItemContent class="gap-1">
					<ItemDescription
						class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
					>
						Upcoming
					</ItemDescription>
					<span class="cn-font-heading text-base font-semibold"> May 2024 </span>
					<span class="text-muted-foreground text-sm">Scheduled</span>
				</ItemContent>
			</Item>
			<Item variant="muted" class="hidden flex-col items-stretch xl:flex">
				<ItemContent class="gap-1">
					<ItemDescription
						class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
					>
						Savings Plan
					</ItemDescription>
					<span class="cn-font-heading text-base font-semibold"> Accelerated </span>
					<span class="text-muted-foreground text-sm">Recurring</span>
				</ItemContent>
			</Item>
		</div>
	</CardContent>
	<CardFooter>
		<Button class="w-full">View Full Report</Button>
	</CardFooter>
</Card>
