<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import { Progress } from "$lib/registry/default/ui/progress/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-1"
	data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
>
	<Card.Header class="pb-2">
		<Card.Description>This Week</Card.Description>
		<Card.Title class="text-4xl">$1329</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="text-muted-foreground text-xs">+25% from last week</div>
	</Card.Content>
	<Card.Footer>
		<Progress value={25} aria-label="25% increase" />
	</Card.Footer>
</Card.Root>
