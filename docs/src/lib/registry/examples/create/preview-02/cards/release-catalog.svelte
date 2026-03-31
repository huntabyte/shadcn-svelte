<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const HOLDINGS = [
		{
			ticker: "VOO",
			name: "Vanguard S&P 500 ETF",
			type: "ETF",
			added: "Jan 2021",
			shares: "112",
			value: "$48,230.40",
		},
		{
			ticker: "VIG",
			name: "Vanguard Dividend Appreciation",
			type: "ETF",
			added: "Mar 2022",
			shares: "450",
			value: "$26,033.79",
		},
		{
			ticker: "AAPL",
			name: "Apple Inc.",
			type: "Stock",
			added: "Nov 2020",
			shares: "85",
			value: "$18,488.90",
		},
		{
			ticker: "O",
			name: "Realty Income Corp",
			type: "REIT",
			added: "Jun 2023",
			shares: "320",
			value: "$15,136.59",
		},
	];

	let filters = $state<string[]>(["etfs"]);
</script>

<Card.Root>
	<Card.Header>
		<div class="flex items-center justify-between gap-3">
			<InputGroup.Root class="max-w-sm">
				<InputGroup.Addon>
					<IconPlaceholder
						lucide="SearchIcon"
						tabler="IconSearch"
						hugeicons="Search01Icon"
						phosphor="MagnifyingGlassIcon"
						remixicon="RiSearchLine"
					/>
				</InputGroup.Addon>
				<InputGroup.Input placeholder="Search holdings or tickers..." />
			</InputGroup.Root>
			<ToggleGroup.Root type="multiple" bind:value={filters} variant="outline" spacing={1}>
				<ToggleGroup.Item value="stocks">Stocks</ToggleGroup.Item>
				<ToggleGroup.Item value="etfs">ETFs</ToggleGroup.Item>
				<ToggleGroup.Item value="reits">REITs</ToggleGroup.Item>
			</ToggleGroup.Root>
		</div>
	</Card.Header>
	<Card.Content>
		<Item.Group>
			{#each HOLDINGS as holding (holding.ticker)}
				<Item.Root variant="muted">
					<Item.Media>
						<div class="flex size-12 items-center justify-center rounded-lg border text-sm font-semibold">
							{holding.ticker}
						</div>
					</Item.Media>
					<Item.Content>
						<Item.Title>{holding.name}</Item.Title>
						<Item.Description class="text-xs tracking-wider uppercase">
							{holding.shares} Shares · {holding.added}
						</Item.Description>
					</Item.Content>
					<div class="flex shrink-0 items-center gap-6">
						<Badge variant="outline">{holding.type}</Badge>
						<div class="flex flex-col items-end gap-0.5">
							<span class="text-muted-foreground text-xs tracking-wider uppercase">Value</span>
							<span class="font-medium tabular-nums">{holding.value}</span>
						</div>
					</div>
				</Item.Root>
			{/each}
		</Item.Group>
	</Card.Content>
</Card.Root>
