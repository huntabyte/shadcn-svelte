<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import { Progress } from "$lib/registry/default/ui/progress/index.js";
</script>

<Card.Root data-x-chunk="dashboard-05-chunk-2">
	<Card.Header class="pb-2">
		<Card.Description>This Month</Card.Description>
		<Card.Title class="text-4xl">$5,329</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="text-xs text-muted-foreground">+10% from last month</div>
	</Card.Content>
	<Card.Footer>
		<Progress value={12} aria-label="12% increase" />
	</Card.Footer>
</Card.Root>
