<script lang="ts">
	import TrendingUp from "lucide-svelte/icons/trending-up";
	import * as Chart from "$lib/registry/new-york/ui/chart/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radial Chart - Stacked</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container class="mx-auto aspect-square max-h-[250px]"></Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUp class="size-4" />
		</div>
		<div class="text-muted-foreground flex items-center gap-2 leading-none">
			January - June 2024
		</div>
	</Card.Footer>
</Card.Root>
