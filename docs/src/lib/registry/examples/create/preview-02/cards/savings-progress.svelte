<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { PieChart, Text } from "layerchart";

	const chartData = [
		{ name: "saved", value: 24000, color: "var(--color-saved)" },
		{ name: "remaining", value: 6000, color: "var(--color-remaining)" },
	];

	const chartConfig = {
		saved: { label: "Saved", color: "var(--chart-2)" },
		remaining: { label: "Remaining", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Content>
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[220px]">
			<PieChart
				data={chartData}
				key="name"
				value="value"
				c="color"
				innerRadius={0.8}
				padding={28}
			>
				{#snippet aboveMarks()}
					<Text
						value="$24,000"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-foreground text-2xl! font-bold"
						dy={-8}
					/>
					<Text
						value="80% of $30,000"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-muted-foreground! text-muted-foreground"
						dy={14}
					/>
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</PieChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-0">
		<div class="flex w-full items-center justify-between py-3">
			<span class="text-muted-foreground text-sm">Projected Finish</span>
			<span class="text-sm font-semibold">October 2024</span>
		</div>
		<Separator />
		<div class="flex w-full items-center justify-between py-3">
			<span class="text-muted-foreground text-sm">Monthly Average</span>
			<span class="text-sm font-semibold tabular-nums">$1,250</span>
		</div>
		<Separator />
		<div class="flex w-full items-center justify-between py-3">
			<span class="text-muted-foreground text-sm">Top Contributor</span>
			<span class="text-sm font-semibold">Auto-Transfer</span>
		</div>
	</Card.Footer>
</Card.Root>
