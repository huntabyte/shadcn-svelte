<script lang="ts">
	import { tick } from "svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { AreaChart } from "layerchart";
	import { curveNatural } from "d3-shape";
	import { scaleBand } from "d3-scale";

	const TICKERS = ["VOO", "VIG", "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"] as const;

	const CHART_DATA: Record<string, { month: string; price: number }[]> = {
		VOO: [
			{ month: "Jan", price: 412 },
			{ month: "Feb", price: 438 },
			{ month: "Mar", price: 395 },
			{ month: "Apr", price: 450 },
			{ month: "May", price: 420 },
			{ month: "Jun", price: 462 },
		],
		AAPL: [
			{ month: "Jan", price: 185 },
			{ month: "Feb", price: 210 },
			{ month: "Mar", price: 172 },
			{ month: "Apr", price: 198 },
			{ month: "May", price: 178 },
			{ month: "Jun", price: 215 },
		],
	};

	const DEFAULT_DATA = [
		{ month: "Jan", price: 100 },
		{ month: "Feb", price: 118 },
		{ month: "Mar", price: 95 },
		{ month: "Apr", price: 125 },
		{ month: "May", price: 108 },
		{ month: "Jun", price: 130 },
	];

	const chartConfig = {
		price: { label: "Price", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

	let ticker = $state<(typeof TICKERS)[number]>("VOO");
	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement | null>(null);

	const data = $derived(CHART_DATA[ticker] ?? DEFAULT_DATA);

	function closeAndFocus() {
		open = false;
		tick().then(() => triggerRef?.focus());
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Stock Performance</Card.Title>
		<Card.Description>6-month price history.</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Field.Group>
			<Field.Field>
				<Field.Label for="ticker-select">Ticker</Field.Label>
				<Popover.Root bind:open>
					<Popover.Trigger bind:ref={triggerRef}>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="outline"
								id="ticker-select"
								class="w-full justify-between font-normal bg-muted"
								role="combobox"
								aria-expanded={open}
							>
								{ticker}
								<IconPlaceholder
									lucide="ChevronDownIcon"
									tabler="IconChevronDown"
									hugeicons="ArrowDown01Icon"
									phosphor="CaretDownIcon"
									remixicon="RiArrowDownSLine"
									class="text-muted-foreground size-4 opacity-50"
								/>
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-[var(--bits-popover-anchor-width)] p-0" align="start">
						<Command.Root>
							<Command.Input placeholder="Search ticker..." />
							<Command.List>
								<Command.Empty>No tickers found.</Command.Empty>
								<Command.Group>
									{#each TICKERS as t (t)}
										<Command.Item
											value={t}
											onSelect={() => {
												ticker = t;
												closeAndFocus();
											}}
										>
											{t}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
			</Field.Field>
		</Field.Group>
		<Separator />
		<Chart.Container config={chartConfig} class="h-[200px] w-full">
			<AreaChart
				data={data}
				x="month"
				xScale={scaleBand()}
				axis="x"
				series={[
					{
						key: "price",
						label: chartConfig.price.label,
						color: chartConfig.price.color,
					},
				]}
				props={{
					area: {
						curve: curveNatural,
						"fill-opacity": 0.25,
						motion: "tween",
					},
					xAxis: {
						format: (d: string) => d.slice(0, 3),
						tickLength: 0,
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="line" hideLabel />
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
