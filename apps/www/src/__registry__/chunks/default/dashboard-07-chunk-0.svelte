<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import { Label } from "$lib/registry/default/ui/label/index.js";
	import { Textarea } from "$lib/registry/default/ui/textarea/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-07-chunk-0"
	data-x-chunk-description="A card with a form to edit the product details"
>
	<Card.Header>
		<Card.Title>Product Details</Card.Title>
		<Card.Description>
			Lipsum dolor sit amet, consectetur adipiscing elit
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-6">
			<div class="grid gap-3">
				<Label for="name">Name</Label>
				<Input
					id="name"
					type="text"
					class="w-full"
					value="Gamer Gear Pro Controller"
				/>
			</div>
			<div class="grid gap-3">
				<Label for="description">Description</Label>
				<Textarea
					id="description"
					value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
					class="min-h-32"
				/>
			</div>
		</div>
	</Card.Content>
</Card.Root>
