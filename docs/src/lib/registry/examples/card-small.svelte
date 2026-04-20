<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Card.Root size="sm" class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title>Small Card</Card.Title>
		<Card.Description>This card uses the small size variant.</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>
			The card component supports a size prop that can be set to &quot;sm&quot; for a more
			compact appearance.
		</p>
	</Card.Content>
	<Card.Footer>
		<Button variant="outline" size="sm" class="w-full">Action</Button>
	</Card.Footer>
</Card.Root>
