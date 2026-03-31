<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const HOLDINGS = [
		{
			name: "Vanguard VIG",
			shares: "450 Shares",
			amount: "$1,842.10",
			data: [
				{ q: "Q1", value: 380 },
				{ q: "Q2", value: 420 },
				{ q: "Q3", value: 390 },
				{ q: "Q4", value: 652 },
			],
		},
		{
			name: "S&P 500 VOO",
			shares: "112 Shares",
			amount: "$928.40",
			data: [
				{ q: "Q1", value: 180 },
				{ q: "Q2", value: 210 },
				{ q: "Q3", value: 320 },
				{ q: "Q4", value: 218 },
			],
		},
		{
			name: "Apple AAPL",
			shares: "85 Shares",
			amount: "$340.00",
			data: [
				{ q: "Q1", value: 60 },
				{ q: "Q2", value: 70 },
				{ q: "Q3", value: 120 },
				{ q: "Q4", value: 90 },
			],
		},
		{
			name: "Realty Income",
			shares: "320 Shares",
			amount: "$1,139.50",
			data: [
				{ q: "Q1", value: 240 },
				{ q: "Q2", value: 260 },
				{ q: "Q3", value: 280 },
				{ q: "Q4", value: 360 },
			],
		},
	];

	const miniChartConfig = {
		value: { label: "Dividend", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Q2 Dividend Income</Card.Title>
		<Card.Description>Quarterly dividend payouts across your portfolio holdings.</Card.Description>
		<Card.Action>
			<Button variant="ghost" size="icon-sm" class="bg-muted">
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
				/>
			</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<Item.Group>
			{#each HOLDINGS as holding (holding.name)}
				<Item.Root variant="muted">
					<Item.Content>
						<Item.Title>{holding.name}</Item.Title>
						<Item.Description>{holding.shares}</Item.Description>
					</Item.Content>
					<Chart.Container
						config={miniChartConfig}
						class="hidden h-8 w-24 md:block [&_[data-slot=chart]]:h-full"
					>
						<BarChart
							data={holding.data}
							x="q"
							xScale={scaleBand().padding(0.2)}
							axis={false}
							rule={false}
							series={[
								{
									key: "value",
									label: miniChartConfig.value.label,
									color: miniChartConfig.value.color,
								},
							]}
							props={{
								bars: { rounded: "top" },
							}}
						>
							{#snippet tooltip()}
								<Chart.Tooltip hideLabel />
							{/snippet}
						</BarChart>
					</Chart.Container>
					<span class="hidden text-sm font-semibold tabular-nums md:block">
						{holding.amount}
					</span>
				</Item.Root>
			{/each}
		</Item.Group>
	</Card.Content>
</Card.Root>
