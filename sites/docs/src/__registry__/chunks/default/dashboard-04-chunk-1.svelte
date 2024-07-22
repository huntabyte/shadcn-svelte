<script lang="ts">
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-04-chunk-1"
	data-x-chunk-description="A form to update the store name."
>
	<Card.Header>
		<Card.Title>Store Name</Card.Title>
		<Card.Description>
			Used to identify your store in the marketplace.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<Input placeholder="Store Name" />
		</form>
	</Card.Content>
	<Card.Footer class="border-t px-6 py-4">
		<Button>Save</Button>
	</Card.Footer>
</Card.Root>
