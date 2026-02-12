<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
</script>

<Example title="Default Size">
	<Card.Root size="default" class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title>Default Card</Card.Title>
			<Card.Description>This card uses the default size variant.</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>
				The card component supports a size prop that defaults to `default` for standard
				spacing and sizing.
			</p>
		</Card.Content>
		<Card.Footer>
			<Button.Root variant="outline" class="w-full">Action</Button.Root>
		</Card.Footer>
	</Card.Root>
</Example>
