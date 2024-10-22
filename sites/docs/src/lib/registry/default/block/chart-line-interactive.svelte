<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as Chart from "$lib/registry/default/ui/chart/index.js";
	import TrendingUp from "lucide-svelte/icons/trending-up";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Line Chart - Interactive</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container></Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Showing total visitors for the last 6 months
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
