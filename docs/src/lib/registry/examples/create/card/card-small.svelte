<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
</script>

<Example title="Small Size">
	<Card.Root size="sm" class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title>Small Card</Card.Title>
			<Card.Description>This card uses the small size variant.</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>
				The card component supports a size prop that can be set to `sm` for a more compact
				appearance.
			</p>
		</Card.Content>
		<Card.Footer>
			<Button.Root variant="outline" size="sm" class="w-full">Action</Button.Root>
		</Card.Footer>
	</Card.Root>
</Example>
