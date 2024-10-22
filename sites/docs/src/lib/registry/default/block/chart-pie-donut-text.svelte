<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as Chart from "$lib/registry/default/ui/chart/index.js";
	import TrendingUp from "lucide-svelte/icons/trending-up";
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center">
		<Card.Title>Pie Chart - Donut with Text</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container class="mx-auto aspect-square max-h-[250px]"></Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUp class="size-4" />
		</div>
		<div class="text-muted-foreground leading-none">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
