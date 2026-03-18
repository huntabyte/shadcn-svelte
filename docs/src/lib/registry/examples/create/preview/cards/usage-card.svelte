<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import CircularGauge from "../../vercel/circular-gauge.svelte";

	const items = [
		{ name: "Edge Requests", value: "$1.83K", percentage: 67.34 },
		{ name: "Fast Data Transfer", percentage: 52.18, value: "$952.51" },
		{ name: "Monitoring data points", percentage: 89.42, value: "$901.20" },
		{ name: "Web Analytics Events", percentage: 45.67, value: "$603.71" },
		{ name: "ISR Writes", percentage: 26.23, value: "524.52K / 2M" },
		{ name: "Function Duration", percentage: 5.11, value: "5.11 GB Hrs / 1K GB Hrs" },
	];
</script>

<Card.Root class="w-full max-w-sm gap-4">
	<Card.Header>
		<Card.Title class="px-1 text-sm">5 days remaining in cycle</Card.Title>
	</Card.Header>
	<Card.Content>
		<Item.Group class="gap-0">
			{#each items as item (item.name)}
				<Item.Root size="xs" class="px-0 group-hover/item-group:bg-transparent">
					{#snippet child({ props })}
						<a href="#/" {...props}>
							<Item.Media variant="icon" class="text-primary">
								<CircularGauge percentage={item.percentage} />
							</Item.Media>
							<Item.Content class="inline-block truncate">
								<Item.Title class="inline">{item.name}</Item.Title>
							</Item.Content>
							<Item.Actions>
								<span
									class="text-muted-foreground font-mono text-xs font-medium tabular-nums"
								>
									{item.value}
								</span>
							</Item.Actions>
						</a>
					{/snippet}
				</Item.Root>
			{/each}
		</Item.Group>
	</Card.Content>
</Card.Root>
