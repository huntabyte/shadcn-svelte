<script lang="ts">
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-02-chunk-0"
	data-x-chunk-description="A card with a call to action"
>
	<Card.Header class="p-2 pt-0 md:p-4">
		<Card.Title>Upgrade to Pro</Card.Title>
		<Card.Description>
			Unlock all features and get unlimited access to our support team.
		</Card.Description>
	</Card.Header>
	<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
		<Button size="sm" class="w-full">Upgrade</Button>
	</Card.Content>
</Card.Root>
