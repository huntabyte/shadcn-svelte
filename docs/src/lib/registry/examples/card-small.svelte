<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Card.Root size="sm" class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Upgrade to Pro</Card.Title>
		<Card.Description>Get access to all features and priority support.</Card.Description>
	</Card.Header>
	<Card.Footer>
		<Button size="sm" class="w-full">Upgrade</Button>
	</Card.Footer>
</Card.Root>
