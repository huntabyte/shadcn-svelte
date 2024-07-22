<script lang="ts">
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import { Progress } from "$lib/registry/new-york/ui/progress/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-2"
	data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar."
>
	<Card.Header class="pb-2">
		<Card.Description>This Month</Card.Description>
		<Card.Title class="text-3xl">$5,329</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="text-muted-foreground text-xs">+10% from last month</div>
	</Card.Content>
	<Card.Footer>
		<Progress value={12} aria-label="12% increase" />
	</Card.Footer>
</Card.Root>
