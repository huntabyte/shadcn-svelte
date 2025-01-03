<script lang="ts">
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
</script>

<Card.Root
	class="sm:col-span-2"
	data-x-chunk-name="dashboard-05-chunk-0"
	data-x-chunk-description="A card for an orders dashboard with a description and a button to create a new order."
>
	<Card.Header class="pb-3">
		<Card.Title>Your Orders</Card.Title>
		<Card.Description class="max-w-lg text-balance leading-relaxed">
			Introducing Our Dynamic Orders Dashboard for Seamless Management and
			Insightful Analysis.
		</Card.Description>
	</Card.Header>
	<Card.Footer>
		<Button>Create New Order</Button>
	</Card.Footer>
</Card.Root>
